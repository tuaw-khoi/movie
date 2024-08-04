import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tgenre } from "@/types/genre";
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
import useGenres from "@/hooks/useGenre";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
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
const GenreForm = ({ id, name, tab, closeForm }: Props) => {
  const [addform, setAddForm] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name || "",
    },
  });
  const { updateGenre, addGenre, deleteGenre } = useGenres();
  const onSubmit = async (name: any) => {
    if (tab === "add") {
      addGenre.mutate(name);
      setAddForm(false);
      form.setValue("name", "");
    } else if (tab === "edit" && id) {
      await updateGenre(id, name);
      closeForm?.();
    }
  };
  const handleDeleteGenre = () => {
    if (id) {
      deleteGenre.mutate(id);
      closeForm?.();
    }
  };
  const openAddForm = () => {
    setAddForm(true);
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
                        <FormLabel>Thể Loại</FormLabel>
                        <FormControl>
                          <Input placeholder="Thể Loại" {...field} />
                        </FormControl>
                        <FormDescription>
                          Điền thể loại bạn muốn tạo
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
        ""
      )}
      {tab === "edit" ? (
        <Dialog>
          <DialogTrigger className="text-sm font-medium py-3 rounded-sm bg-white text-black w-full hover:bg-slate-100">
            Sửa
          </DialogTrigger>
          <Button
            onClick={handleDeleteGenre}
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
      ) : (
        ""
      )}
    </div>
  );
};

export default GenreForm;
