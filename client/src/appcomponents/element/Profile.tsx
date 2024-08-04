import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/custom/button";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { TUser } from "@/types/user";
import Cookies from "js-cookie";
const profileFormSchema = z.object({
  full_name: z
    .string()
    .min(2, {
      message: "Username must be at least 2 characters.",
    })
    .max(30, {
      message: "Username must not be longer than 30 characters.",
    }),
  email: z
    .string({
      required_error: "Please select an email to display.",
    })
    .email(),
});

type ProfileFormValues = z.infer<typeof profileFormSchema>;
export const ProfileForm = () => {
  const { refreshLogin, updateUser } = useUser();
  const [user, setUser] = useState<TUser | null>(null);
  const userJson = Cookies.get("user");
  const data = JSON.parse(userJson || "");
  const form: any = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      full_name: data?.full_name || "",
      email: data?.email || "",
    },
    mode: "onChange",
  });
  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await refreshLogin();
      setUser(userData);
      form.setValue("full_name", userData?.full_name || "");
      form.setValue("email", userData?.email || "");
    };
    fetchUserData();
  }, []);

  function onSubmit(data: ProfileFormValues) {
    if (!user) {
      alert("Không thể cập nhật thông tin khi chưa đăng nhập.");
      return;
    }

    const userUpdate = {
      ...user,
      email: data.email ? data.email : user.email,
      full_name: data.full_name ? data.full_name : user.fullName,
    };
    updateUser(userUpdate, user.id);
    setTimeout(() => alert("Cập nhật thành công"), 2000);
  }

  return (
    <Form key={user?.id} {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="full_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Họ Và Tên</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Bạn có thể chỉnh sửa họ và tên.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>Cập nhật email tại đây!</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="w-full"></div>
        <Button type="submit">Cập nhật thông tin</Button>
      </form>
    </Form>
  );
};
