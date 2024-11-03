import { DownloadIcon, PlusIcon, ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { NewDirectoryForm } from "./ui/newDirectoryForm";
import { S3Link } from "../../types/s3Link";
import React from "react";
export function Topbar(props: {
  setS3Links: React.Dispatch<React.SetStateAction<S3Link[]>>;
  onPullAllDirectories: Function;
  isPullingAllDirectories: boolean;
}) {
  return (
    <div className="flex justify-between m-2">
      <h1 className="text-xl font-bold mt-1">AWS S3 Sync GUI</h1>
      <div className="flex-wrap">
        <NewDirectoryForm setS3Links={(e) => props.setS3Links(e)}>
          <Button className="rounded m-1" variant={"outline"}>
            <PlusIcon />
            Add New Directory
          </Button>
        </NewDirectoryForm>
        <Button
          disabled={props.isPullingAllDirectories}
          onClick={() => {
            props.onPullAllDirectories();
          }}
          className="rounded m-1"
          variant={"outline"}
        >
          {props.isPullingAllDirectories ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <DownloadIcon />
          )}
          Pull All Directories
        </Button>
      </div>
    </div>
  );
}
