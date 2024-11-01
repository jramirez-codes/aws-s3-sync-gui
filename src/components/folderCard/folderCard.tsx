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
import { TrashIcon } from "@radix-ui/react-icons";
import React from "react";
export function FolderCard(props: {
  s3Link: S3Link,
  idx: number,
  onSyncData: Function,
  onDelete: Function,
  onOpenInfo: Function
}) {
  const [isHovering, setIsHovering] = React.useState<boolean>(false)

  return (
    <div className="inline h-[100%] relative" onMouseEnter={() => { setIsHovering(true) }} onMouseLeave={() => { setIsHovering(false) }}>
      {isHovering && (
        <Button onClick={()=>{props.onDelete(props.idx)}} variant={"ghost"} className="rounded-xl absolute top-0 right-0" >
          <TrashIcon />
        </Button>
      )}
      <Card className="h-[100%]">
        <CardHeader>
          <CardTitle>{props.s3Link.title}</CardTitle>
          <CardDescription>{props.s3Link.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={() => { props.onSyncData(props.idx) }} variant={"outline"} className="rounded m-1 w-[100%]">
            Sync Data
          </Button>
          <Button onClick={() => { props.onOpenInfo(props.idx) }} variant={"outline"} className="rounded m-1 w-[100%]">
            Open Info
          </Button>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </div>
  );
}
