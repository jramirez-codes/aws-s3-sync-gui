import { DownloadIcon, PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { NewDirectoryForm } from "./ui/newDirectoryForm";
import { S3Link } from "../../types/s3Link";
import React from "react";
export function Topbar(props:{setS3Links: React.Dispatch<React.SetStateAction<S3Link[]>>}) {
  return (
    <div className="flex justify-between m-2">
      <h1 className="text-xl font-bold mt-1">AWS S3 Sync GUI</h1>
      <div className="flex">
        <NewDirectoryForm setS3Links={(e)=>props.setS3Links(e)}>
          <Button className="rounded m-1" variant={"outline"}>
            <PlusIcon />
            Add New Directory
          </Button>
        </NewDirectoryForm>
        <Button className="rounded m-1" variant={"outline"}>
          <DownloadIcon />
          Pull All Directories
        </Button>
      </div>
    </div>
  );
}
