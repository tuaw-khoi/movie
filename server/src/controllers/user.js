const db = require("../models");
var jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const bcrypt = require("bcrypt");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs !",
      });
    }
    const user = await db.User.findOne({
      where: { username: username },
    });

    if (!user) {
      return res.status(400).json({
        err: 1,
        msg: "User not found !",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const userWithoutPassword = { ...user.toJSON() };
      delete userWithoutPassword.password;
      let role = null;
      if (user.role === 1) {
        role = "admin";
      }
      const token = jwt.sign(
        {
          id: user.id,
          username: user.username,
          role: role,
        },
        "secret",
        { expiresIn: "24h" }
      );
      return res.status(200).json({ token, user: userWithoutPassword });
    } else {
      return res.status(401).json({
        err: 1,
        msg: "Incorrect password !",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      err: 1,
      msg: "Internal server error",
    });
  }
};
const register = async (req, res) => {
  try {
    const { fullName, email, password, username, role } = req.body;

    const existingUsername = await db.User.findOne({
      where: { username },
    });
    const existingEmail = await db.User.findOne({ where: { email } });
    if (existingUsername || existingEmail) {
      return res.status(400).json({
        success: false,
        message: "Username or email already exists",
      });
    }

    // Tiến hành tạo tài khoản mới
    const pass = hashPassword(password);
    const newUser = await db.User.create({
      full_name: fullName,
      email,
      password: pass,
      username,
      role,
    });
    const userWithoutPassword = { ...newUser.toJSON() };
    delete userWithoutPassword.password;

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
      data: userWithoutPassword,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getAll = async (req, res) => {
  try {
    const users = await db.User.findAll();

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all users",
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
const deleteUser = async (req, res) => {
  try {
    const { UserIds } = req.query;
    if (!UserIds) {
      return res.status(400).json({
        err: 1,
        msg: "User not found !",
      });
    }

    await db.User.destroy({
      where: {
        id: UserIds,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};
const updateUser = async (req, res) => {
  try {
    const { UserId: id, username, email, full_name, role } = req.body;
    const user = await db.User.findByPk(id);
    if (!user) {
      return res.status(400).json({
        err: 1,
        msg: "User not found !",
      });
    }
    await user.update({
      username: username || user.username,
      email: email || user.email,
      full_name: full_name || user.full_name,
      role: role || user.role,
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
const refreshLogin = async (req, res) => {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    const jwtObject = jwt.verify(token, "secret");
    const username = jwtObject.username;
    const user = await db.User.findOne({ where: { username: username } });
    if (!user) {
      return res
        .status(200)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({
      user: user,
    });
  } catch (exception) {
    return { success: false, message: "Invalid token." };
  }
};
const updatePassword = async (req, res) => {
  try {
    const { userId, oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Old password and new password are required.",
      });
    }
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is incorrect.",
      });
    }

    const hashedPassword = hashPassword(newPassword);

    await user.update({
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
module.exports = {
  login,
  register,
  getAll,
  deleteUser,
  updateUser,
  refreshLogin,
  updatePassword,
};
