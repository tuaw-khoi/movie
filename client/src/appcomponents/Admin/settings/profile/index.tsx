import { Separator } from "@/components/ui/separator";
import ManagementMovie from "./managementMovie";

export default function SettingsProfile() {
  return (
    <div className="space-y-6 w-full xl:w-[800px]">
      <div>
        <h3 className="text-lg font-medium">Bạn có thể quản lý phim tại đây</h3>
        {/* <p className="text-sm text-muted-foreground">
          Hoàn tất các thông tin để tạo phim
        </p> */}
      </div>
      <Separator className="my-4" />
      <ManagementMovie />
    </div>
  );
}
