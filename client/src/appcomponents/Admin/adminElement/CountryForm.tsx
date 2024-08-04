import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
("use client");

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
import { zodResolver } from "@hookform/resolvers/zod";
import useCountrys from "@/hooks/useCountry";
import { useState } from "react";
import { Tcountry } from "@/types/country";
const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
});
type Props = {
  tab: string;
  id?: string;
  name?: string;
  closeForm?: () => void;
};
const CountryForm = ({ id, name, tab, closeForm }: Props) => {
  const [addform, setAddForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
    },
  });
  console.log(addform);
  const { deleteCountry, addCountry, updateCountry } = useCountrys();
  const onSubmit = async (name: any) => {
    if (tab === "add") {
      addCountry.mutate(name);
      setAddForm(false);
      form.setValue("name", "");
    } else if (tab === "edit" && id) {
      await updateCountry(id, name);
      closeForm?.();
    }
  };
  const handleDeleteCountry = () => {
    if (id) {
      deleteCountry.mutate(id);
      closeForm?.();
    }
  };
  const openAddForm = async () => {
    await setAddForm(true);
  };
  return (
    <div>
      {tab === "add" ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button onClick={openAddForm} variant="outline">
              Thêm
            </Button>
          </DialogTrigger>

          {addform ? (
            <DialogContent className="sm:max-w-[425px]">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quốc Gia</FormLabel>
                        <FormControl>
                          <Input placeholder="Quốc Gia" {...field} />
                        </FormControl>
                        <FormDescription>
                          Điền Quốc Gia bạn muốn tạo
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit">Thêm</Button>
                </form>
              </Form>
            </DialogContent>
          ) : (
            ""
          )}
        </Dialog>
      ) : (
        <Dialog>
          <DialogTrigger className="text-sm font-medium py-3 rounded-sm bg-white text-black w-full hover:bg-slate-100">
            Sửa
          </DialogTrigger>
          <Button
            onClick={handleDeleteCountry}
            className="font-medium bg-white text-black w-full hover:bg-slate-100"
          >
            Xóa
          </Button>

          <DialogContent className="sm:max-w-[425px]">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thể Loại</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit">Sửa</Button>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default CountryForm;
