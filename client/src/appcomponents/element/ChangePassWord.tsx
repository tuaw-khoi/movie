"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useUser from "@/hooks/useUser";
import { useEffect, useState } from "react";
import { TUser } from "@/types/user";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
const formSchema = z.object({
  oldpassword: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  password: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
  newpassword: z.string().min(2, {
    message: "password must be at least 2 characters.",
  }),
});
const ChangePassWord = () => {
  const { refreshLogin, changePassword } = useUser();
  const [user, setUser] = useState<TUser | null>(null);
  const formChangePassword = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldpassword: "",
      password: "",
      newpassword: "",
    },
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await refreshLogin();
      setUser(userData);
    };
    fetchUserData();
  }, [formChangePassword]);
  const onSubmit = async (data: any) => {
    await changePassword.mutate({
      userId: user?.id || "",
      oldPassword: data.oldpassword,
      newPassword: data.password,
    });
    formChangePassword.setValue("oldpassword", "");
    formChangePassword.setValue("password", "");
    formChangePassword.setValue("newpassword", "");
    setTimeout(() => alert("Đổi mật khẩu thành công"), 2000);
  };
  return (
    <Form {...formChangePassword}>
      <form
        onSubmit={formChangePassword.handleSubmit(onSubmit)}
        className="space-y-8 max-w-[800px]"
      >
        <Card>
          <CardHeader>
            <CardTitle>Đổi Mật Khẩu</CardTitle>
            <CardDescription>
              Cập nhật mật khẩu mới tại đây, nhấn nút cập nhật
            </CardDescription>
          </CardHeader>
          {changePassword.isError ? (
            <Alert variant="destructive" className="rounded-xl ">
              <AlertCircle className="h-4 w-4 " />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {changePassword.error.response.data.msg}
              </AlertDescription>
            </Alert>
          ) : null}
          <CardContent className="space-y-2">
            <FormField
              control={formChangePassword.control}
              name="oldpassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mật khẩu hiện tại</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Mật khẩu hiện tại"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formChangePassword.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mật khẩu mới</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Mật khẩu mới"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={formChangePassword.control}
              name="newpassword"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Nhập mật khẩu lần nữa</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Nhập mật khẩu lần nữa"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="bg-blue-400 hover:bg-blue-700 rounded-[4px]">
              Cập Nhật
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default ChangePassWord;
