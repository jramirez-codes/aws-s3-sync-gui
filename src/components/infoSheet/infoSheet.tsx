import { S3Link } from "@/types/s3Link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function InfoSheet(props: {
  s3Link: S3Link | null;
  setSelectedS3Link: React.Dispatch<React.SetStateAction<S3Link | null>>;
}) {
  if (props.s3Link !== null) {
    return (
      <>
        <div
          onClick={() => {
            props.setSelectedS3Link(null);
          }}
          className="bg-black h-[100vh] w-[100vw] fixed top-0 left-0 opacity-70"
        />
        <div className="fixed top-[50vh] left-[50vw]">
          <div className="flex items-center justify-center">
            <Card className="w-[350px] mt-[-75%] ml-[-100%]">
              <CardHeader>
                <CardTitle>{props.s3Link.title}</CardTitle>
                <CardDescription>Information</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-2">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="title"
                      placeholder="Title"
                      className="rounded"
                      defaultValue={props.s3Link.title}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Folder Path</Label>
                    <Input
                      id="folderPath"
                      placeholder="Folder Path"
                      className="rounded"
                      defaultValue={props.s3Link.s3Path}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">S3 Path</Label>
                    <Input
                      id="s3Path"
                      className="rounded"
                      placeholder="s3://something/"
                      defaultValue={props.s3Link.filePath}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Title</Label>
                    <Input
                      id="folderPath"
                      className="rounded"
                      placeholder="folderPath"
                      defaultValue={props.s3Link.filePath}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Button variant={"outline"} className="rounded mt-4">
                      Save
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
