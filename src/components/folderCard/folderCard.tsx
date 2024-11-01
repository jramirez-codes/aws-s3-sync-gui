import {
  Card,
  CardContent,
  CardDescription,
  // CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { S3Link } from "../../types/s3Link";
import { InfoCircledIcon, DownloadIcon, TrashIcon, UploadIcon } from "@radix-ui/react-icons";
import { ReloadIcon } from "@radix-ui/react-icons"
import React from "react";

export function FolderCard(props: {
  s3Link: S3Link,
  idx: number,
  isFetching: boolean,
  isUploading: boolean,
  isDownloading: boolean,
  onDownload: Function,
  onUpload: Function,
  onDelete: Function,
  onOpenInfo: Function
}) {
  const [isHovering, setIsHovering] = React.useState<boolean>(false)

  return (
    <div className="inline h-[100%] relative" onMouseEnter={() => { setIsHovering(true) }} onMouseLeave={() => { setIsHovering(false) }}>
      {isHovering && (
        <div className="absolute top-0 right-0">
          <Button onClick={() => { props.onDelete(props.idx) }} variant={"ghost"} className="rounded-xl block" disabled={props.isFetching}>
            <TrashIcon />
          </Button>
          <Button onClick={() => { props.onOpenInfo(props.idx) }} variant={"ghost"} className="rounded-xl block">
            <InfoCircledIcon />
          </Button>
        </div>
      )}
      <Card className="h-[100%]">
        <CardHeader>
          <CardTitle>{props.s3Link.title}</CardTitle>
          <CardDescription>{props.s3Link.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { props.onUpload(props.idx) }} variant={"outline"} className="rounded m-1 w-[100%]" disabled={props.isFetching}>
            {props.isUploading? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ):(
              <UploadIcon />
            )}
            Upload Data
          </Button>
          <Button onClick={() => { props.onDownload(props.idx) }} variant={"outline"} className="rounded m-1 w-[100%]" disabled={props.isFetching}>
            {props.isDownloading? (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            ):(
              <DownloadIcon />
            )}
            Sync Data
          </Button>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </div>
  );
}
