import Dialog, { DialogBody } from "./basic-dialog"
import { Loader2 } from "lucide-react"
import { useEffect, useState, useRef } from "react"
import ErrorIcon from "@/assets/icons/dialog/error.svg"
import SuccessIcon from "@/assets/icons/dialog/success.svg"
import { useLoadingDialogState } from "@/stores/dialog"

export type LoadingDialogProps = {
  isLoading: boolean
  message?: string
  respondState?: "success" | "error"
  respondMessage?: string
}

const LoadingDialog = () => {
  const { isLoading, message, respondState, respondMessage } = useLoadingDialogState((state) => state.openState)
  const [isOpen, setIsOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    if (!respondState) {
      setIsOpen(isLoading)
    } else {
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        setIsOpen(false)
        clearTimeout(timer.current)
      }, 3000)
    }
  }, [isLoading, respondState])

  return (
    <Dialog open={isOpen} setOpen={setIsOpen} header={false}>
      <DialogBody className="flex flex-col items-center">
        {isLoading && <Loader2 className="h-10 w-10 animate-spin text-primary" />}
        {respondState && !isLoading && <img src={respondState === "success" ? SuccessIcon : ErrorIcon}></img>}
        {message && <h2 className="p-2 text-primary">{message}</h2>}
        {!isLoading && respondMessage && <span className="p-3">{respondMessage}</span>}
      </DialogBody>
    </Dialog>
  )
}

export default LoadingDialog
