import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";

export function Topbar() {
  return (
    <div className="flex justify-between m-2">
      <h1 className="text-xl font-bold mt-1">AWS S3 Sync GUI</h1>
      <div className="flex">
        <Button className="rounded m-1" variant={"outline"}>
          <PlusIcon />
          Add New Directory
        </Button>
        <Button className="rounded m-1" variant={"outline"}>
          <DownloadIcon />
          Pull All Directories
        </Button>
      </div>
    </div>
  );
}
