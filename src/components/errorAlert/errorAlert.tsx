import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { SingleErrorMessage } from "@/types/singleErrorMessage"
import { FileWarningIcon } from "lucide-react"
import React from "react"

export function ErrorAlert(props: { errorMessages: SingleErrorMessage[], setErrorMessages: React.Dispatch<React.SetStateAction<SingleErrorMessage[]>> }) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      props.setErrorMessages([]);
    }, 2000);

    // Clear the timeout if the component is unmounted
    return () => clearTimeout(timer);
  }, [props.errorMessages])

  return (
    <div className="fixed top-1 right-1 space-y-1.5">
      {props.errorMessages.map((obj, idx) => {
        return (
          <Alert
            onClick={() => { props.setErrorMessages([]) }}
            key={obj.description + idx}
            className="rounded border-2 border-indigo-200 border-x-indigo-500 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300"
          >
            <FileWarningIcon className="h-4 w-4" />
            <AlertTitle>{obj.title}</AlertTitle>
            <AlertDescription>
              {obj.description}
            </AlertDescription>
          </Alert>
        )
      })}
    </div>
  )
}
