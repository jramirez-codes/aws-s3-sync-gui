import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function FolderCard() {
  return (
    <div className="inline">
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"outline"} className="rounded m-1 w-[100%]">
            Hello World
          </Button>
          <Button variant={"outline"} className="rounded m-1 w-[100%]">
            Hello World
          </Button>
        </CardContent>
        {/* <CardFooter>
        <p>Card Footer</p>
      </CardFooter> */}
      </Card>
    </div>
  );
}
