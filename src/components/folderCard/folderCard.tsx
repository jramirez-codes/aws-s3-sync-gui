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

export function FolderCard(props: {s3Link: S3Link}) {
  console.log(props.s3Link)
  return (
    <div className="inline">
      <Card>
        <CardHeader>
          <CardTitle>{props.s3Link.title}</CardTitle>
          <CardDescription>{props.s3Link.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"outline"} className="rounded m-1 w-[100%]">
            Sync Data
          </Button>
          <Button variant={"outline"} className="rounded m-1 w-[100%]">
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
