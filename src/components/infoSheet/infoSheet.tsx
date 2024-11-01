import { S3Link } from "@/types/s3Link";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  // AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function InfoSheet(props: { s3Link: S3Link | null, setSelectedS3Link: React.Dispatch<React.SetStateAction<S3Link | null>>}) {

  if(props.s3Link !== null) {
    return (
      <AlertDialog open={true}>
        <AlertDialogContent style={{borderRadius:5}}>
          <AlertDialogHeader>
            <AlertDialogTitle>{props.s3Link.title}</AlertDialogTitle>
            <AlertDialogDescription>
              <p className="m-3">
                Description: <span className="border-solid border-2 border-sky-500 rounded p-1">{props.s3Link.description}</span>
              </p>
              <p className="m-3">
                Local Path: <span className="border-solid border-2 border-sky-500 rounded p-1">{props.s3Link.filePath}</span>
              </p>
              <p className="m-3">
                S3 Path: <span className="border-solid border-2 border-sky-500 rounded p-1">{props.s3Link.s3Path}</span>
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={()=>{props.setSelectedS3Link(null)}} className="rounded">Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
}