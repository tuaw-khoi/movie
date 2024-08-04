import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import Users from "./Users";
const formSchema = z.object({
  searchmovie: z.string().min(0, {}),
});
const MobileNav = () => {
  const navigate = useNavigate();
  const form = useForm({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      searchmovie: "",
    },
  });
  const onSubmit = async (data: any) => {
    const search = data?.searchmovie;
    console.log(search);
    navigate(`/search/${search || ""}`);
  };
  return (
    <div>
      <div className="  flex space-x-5 justify-between sm:justify-end md:hidden mt-5 mx-6 ">
        <div className=" flex  items-center space-x-2 sm:hidden">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-x-2 flex"
            >
              <FormField
                control={form.control}
                name="searchmovie"
                render={({ field }) => (
                  <FormItem className="">
                    <FormControl>
                      <Input
                        className="w-[150px] text-black"
                        type="text"
                        placeholder="Tên Phim"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className="bg-yellow-500 hover:bg-[#408bea]"
                type="submit"
              >
                Tìm Kiếm
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <Users />
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
