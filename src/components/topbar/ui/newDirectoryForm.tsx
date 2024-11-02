import {
  Drawer,
  // DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import React, { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { open } from "@tauri-apps/plugin-dialog";
import { load } from "@tauri-apps/plugin-store";
import { S3Link } from "../../../types/s3Link";

export function NewDirectoryForm(props: {
  children: ReactNode;
  setS3Links: React.Dispatch<React.SetStateAction<S3Link[]>>;
}) {
  const [title, setTitle] = React.useState<string>("");
  const [description, setDescription] = React.useState<string>("");
  const [filePath, setFilePath] = React.useState<string>("");
  const [s3Path, setS3Path] = React.useState<string>("");

  return (
    <Drawer>
      <DrawerTrigger>{props.children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center">
            Do you want to link a new directory?
          </DrawerTitle>
          <DrawerDescription className="text-center">
            Add a folder path, and the corresponding s3 folder path.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex justify-evenly">
          <div className="w-[50vw]">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">Title</Label>
              <Input
                id="title"
                className="rounded"
                placeholder="Friendly Name"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mt-3">
              <Label htmlFor="email">Description</Label>
              <Input
                id="Description"
                className="rounded"
                placeholder="Description"
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mt-3">
              <Label htmlFor="email">Folder Path</Label>
              <Input
                id="filepath"
                className="rounded"
                placeholder="Folder Path"
                value={filePath}
                onClick={() => {
                  const asyncFunc = async () => {
                    // Fetch File Path
                    const selected = await open({ directory: true });
                    // Update Front End State
                    setFilePath(selected ? selected : "");
                  };
                  asyncFunc();
                }}
              />
            </div>
            <div className="grid w-full items-center gap-1.5 mt-3">
              <Label htmlFor="email">S3 Bucket Path</Label>
              <Input
                id="s3Path"
                className="rounded"
                placeholder="s3://something/"
                value={s3Path}
                onChange={(e) => {
                  setS3Path(e.target.value);
                }}
              />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <DrawerTrigger>
            <Button
              className="rounded"
              onClick={() => {
                const asyncFunc = async () => {
                  const store = await load("store.json", { autoSave: false });

                  let s3Links: S3Link[] = [];
                  if (await store.has("s3Links")) {
                    let storeData = await store.get<S3Link[]>("s3Links");
                    s3Links = storeData ? storeData : [];
                  }

                  s3Links.push({
                    title,
                    description,
                    filePath,
                    s3Path,
                  });

                  await store.set("s3Links", s3Links);
                  await store.save();

                  props.setS3Links(s3Links);
                };
                asyncFunc();
              }}
            >
              Save
            </Button>
          </DrawerTrigger>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
