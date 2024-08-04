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
import { AlertCircle, Terminal } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import useAuthenStore from "@/midlewares/authenStore";
const formSchema = z
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

const FormLogin = () => {
  const { register } = useUser();
  const { authentication } = useAuthenStore();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      fullName: "",
      password2: "",
    },
  });
  const { fullName, password2, ...formData } = form.getValues();
  const onSubmit = (formData: any) => {
    register.mutate(formData);
    form.setValue("username", "");
    form.setValue("password", "");
    form.setValue("email", "");
    form.setValue("fullName", "");
    form.setValue("password2", "");
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[300px] sm:max-w-[550px] "
      >
        <Card>
          <CardHeader>
            <CardTitle>Đăng Ký</CardTitle>
            <CardDescription>Nếu chưa có tài khoản hãy đăng ký</CardDescription>
            {register.isError ? (
              <Alert variant="destructive" className="rounded-xl ">
                <AlertCircle className="h-4 w-4 " />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {register.error.response.data.msg}
                </AlertDescription>
              </Alert>
            ) : null}
            {authentication === "register" ? (
              <Alert className="absolute top-[30%] left-[10%] z-50 bg-white w-[500px] rounded-xl">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Heads up!</AlertTitle>
                <AlertDescription>register</AlertDescription>
              </Alert>
            ) : null}
          </CardHeader>

          <CardContent className="mt-[-15px] sm:mt-[0] sm:space-y-2">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Họ Và Tên</FormLabel>
                  <FormControl>
                    <Input
                      className="h-7 sm:h-10"
                      placeholder="Họ Và Tên"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      className="h-7 sm:h-10"
                      placeholder="Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Tên Đăng Nhập</FormLabel>
                  <FormControl>
                    <Input
                      className="h-7 sm:h-10"
                      placeholder="Tên Đăng Nhập"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mật Khẩu</FormLabel>
                  <FormControl>
                    <Input
                      className="h-7 sm:h-10"
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
              control={form.control}
              name="password2"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Mật Khẩu Lần 2</FormLabel>
                  <FormControl>
                    <Input
                      className="h-7 sm:h-10"
                      type="password"
                      placeholder="Mật Khẩu lần 2"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button className="bg-amber-400 hover:bg-amber-700" type="submit">
              Đăng Ký
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default FormLogin;
