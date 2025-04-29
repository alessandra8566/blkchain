import React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import { cn } from "@/utils/shadcn"

const AlertDialogOverlay = React.forwardRef<
  React.ElementRef<typeof AlertDialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof AlertDialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    className={cn(
      "fixed inset-0 z-overlay bg-background/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
    ref={ref}
  />
))
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

type DialogProps = {
  open: boolean
  setOpen: (value: boolean) => void
  children: React.ReactNode
  backdropClose?: boolean
  className?: string
  topLayer?: boolean
} & (HasHeaderProps | NoHeaderProps)

type HasHeaderProps = {
  header: true
  title: string
  closeButton?: boolean
}

type NoHeaderProps = {
  header: false
}

const Dialog: React.FC<DialogProps> = (props) => {
  const { open, setOpen, children, className, header, backdropClose = false } = props

  function backdropCloseHandler() {
    if (!backdropClose) return
    setOpen(false)
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogOverlay onClick={backdropCloseHandler} />
      <AlertDialogContent className={cn("z-dialog w-96 gap-0 overflow-hidden p-0", className)}>
        {header && (
          <AlertDialogHeader className="relative flex h-14 items-center justify-center bg-primary text-white">
            <AlertDialogTitle className="text-center">{props?.title}</AlertDialogTitle>
            <X
              className={cn("absolute right-3 !m-0 cursor-pointer text-white", {
                hidden: !props?.closeButton,
              })}
              onClick={() => setOpen(false)}
            />
          </AlertDialogHeader>
        )}
        {children}
      </AlertDialogContent>
    </AlertDialog>
  )
}

type DialogBodyProps = {
  children: React.ReactNode
  className?: string
}

export const DialogBody: React.FC<DialogBodyProps> = ({ children, className }) => (
  <div className={cn("relative w-full p-5 leading-none", className)}>{children}</div>
)

type DialogFooterProps = {
  children: React.ReactNode
  board?: boolean
  className?: string
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className, board = false }) => (
  <AlertDialogFooter className={cn("h-16", className)}>
    {board && <Separator className="absolute top-0" />}
    {children}
  </AlertDialogFooter>
)

export default Dialog
