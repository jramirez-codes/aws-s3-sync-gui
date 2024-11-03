import { S3Link } from "@/types/s3Link";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DeleteCard(props: {
  s3Link: S3Link | null;
  setSelectedS3Link: React.Dispatch<React.SetStateAction<S3Link | null>>;
  onS3LinkDelete: Function;
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
                <CardTitle>
                  Are you sure you want to delte this s3 link:{" "}
                  {props.s3Link.title}?
                </CardTitle>
                <CardDescription>
                  Once changes are deleted, they cannot be undone.
                </CardDescription>
              </CardHeader>
              <CardContent className="justify-between flex">
                <Button
                  variant={"outline"}
                  className="rounded"
                  onClick={() => {
                    props.setSelectedS3Link(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant={"destructive"}
                  className="rounded"
                  onClick={() => {
                    props.onS3LinkDelete();
                  }}
                >
                  Delete
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </>
    );
  }
}
