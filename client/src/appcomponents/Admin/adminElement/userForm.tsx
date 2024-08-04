import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUsers from "@/hooks/useUser"; // Giả sử bạn có một hook useUser để quản lý người dùng
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email format.",
  }),
  full_name: z.string().min(0, {
    message: "Full name must be at least 2 characters.",
  }),
  role: z.string(),
});
const formSchemaRegister = z
  .object({
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." })
      .refine((value) => {
        const hasDigit = /\d/.test(value);
        if (!hasDigit) {
          throw new Error("Password must contain at least one digit (0-9).");
        }
        return value;
      }),
    password2: z
      .string()
      .min(6, { message: "Password must be at least 6 characters." }),
    fullName: z.string().min(2, {
      message: "Full name must be at least 2 characters.",
    }),
  })
  .refine(
    (values) => {
      return values.password === values.password2;
    },
    {
      message: "Passwords must match!",
      path: ["password2"],
    }
  );

type Props = {
  tab: string;
  id?: string;
  email?: string;
  full_name?: string;
  role?: string;
};

const UserForm = ({ id, email, full_name, role, tab }: Props) => {
  const [userForm, setUserForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: email || "",
      full_name: full_name || "",
      role: role || "0",
    },
  });
  const formRegister = useForm({
    resolver: zodResolver(formSchemaRegister),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      password2: "",
    },
  });

  const { updateUser, register, deleteUser } = useUsers();

  const onSubmit = async (userData: any) => {
    if (tab === "add") {
      register.mutate(userData);
      console.log(userData);
      form.setValue("email", "");
      form.setValue("full_name", "");
      form.setValue("role", "0");
      setUserForm(false);
    } else if (tab === "edit" && id) {
      await updateUser(userData, id);
      form.setValue("email", "");
      form.setValue("full_name", "");
      form.setValue("role", "0");
      alert("update success");
      setUserForm(false);
    }
  };
  const onSubmitRegister = (formData: any) => {
    register.mutate(formData);
    formRegister.setValue("username", "");
    formRegister.setValue("password", "");
    formRegister.setValue("email", "");
    formRegister.setValue("fullName", "");
    formRegister.setValue("password2", "");
    alert("register success");
    setUserForm(false);
  };
  const handleOpenUserForm = () => {
    setUserForm(true);
  };
  const handleDeleteUser = () => {
    if (id) {
      alert("bạn có chắc chắn muốn xóa không");
      deleteUser.mutate(id);
    }
  };

  return (
    <div>
      {tab === "add" ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={handleOpenUserForm} variant="outline">
              Thêm
            </Button>
          </DialogTrigger>
          {userForm ? (
            <DialogContent className="sm:max-w-[425px]">
              <Form {...formRegister}>
                <form
                  onSubmit={formRegister.handleSubmit(onSubmitRegister)}
                  className="space-y-"
                >
                  <FormField
                    control={formRegister.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Họ Và Tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Họ Và Tên" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Tên Đăng Nhập</FormLabel>
                        <FormControl>
                          <Input placeholder="Tên Đăng Nhập" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Mật Khẩu</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Mật Khẩu"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={formRegister.control}
                    name="password2"
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormLabel>Mật Khẩu Lần 2</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Mật Khẩu lần 2"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    className="bg-amber-400 mt-3 hover:bg-amber-700"
                    type="submit"
                  >
                    Đăng Ký
                  </Button>
                </form>
              </Form>
            </DialogContent>
          ) : (
            ""
          )}
        </Dialog>
      ) : (
        ""
      )}
      {tab === "edit" ? (
        <Dialog>
          <DialogTrigger
            onClick={handleOpenUserForm}
            className="text-sm font-medium py-3 rounded-sm bg-white text-black w-full hover:bg-slate-100"
          >
            Sửa
          </DialogTrigger>
          <Button
            onClick={handleDeleteUser}
            className="font-medium bg-white text-black w-full hover:bg-slate-100"
          >
            Xóa
          </Button>
          {userForm ? (
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="Email" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="full_name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Họ và Tên</FormLabel>
                        <FormControl>
                          <Input placeholder="Họ và Tên" {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phân Quyền</FormLabel>
                        <FormControl>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Người Dùng</SelectItem>
                              <SelectItem value="1">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Sửa</Button>
                </form>
              </Form>
            </DialogContent>
          ) : (
            ""
          )}
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserForm;
