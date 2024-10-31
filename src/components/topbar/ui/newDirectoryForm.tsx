import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function NewDirectoryForm(props: { children: ReactNode }) {
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
        <div className="flex justify-center">
          <div className="w-[50vw]">
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="email">Title</Label>
              <Input id="title" placeholder="Friendly Name" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label htmlFor="email">Folder Path</Label>
              <Input id="filepath" placeholder="File Path" />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-3">
              <Label htmlFor="email">S3 Bucket Path</Label>
              <Input id="s3Path" placeholder="s3://something/" />
            </div>
          </div>
        </div>
        <DrawerFooter>
          <Button>Submit</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}