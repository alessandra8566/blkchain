import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import Dialog, { DialogBody, DialogFooter } from "./basic-dialog"
import { cn } from "@/utils/shadcn"
/**
 *  onConfirmClick: 點選確定按鈕的事件
 *  cancelText?: 取消按鈕上的文字
 *  confirmText?: 確定按鈕上的文字
 *  onCancelClick?:點選取消按鈕的事件
 */
export type ConfirmDialogProps = {
  open: boolean
  setOpen: (value: boolean) => void
  title: string
  children: React.ReactNode
  className?: string
  onConfirmClick: () => void
  cancelText?: string
  confirmText?: string
  onCancelClick?: () => void
}

export const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  open,
  setOpen,
  children,
  className,
  title,
  onConfirmClick,
  cancelText,
  confirmText,
  onCancelClick,
}) => {
  const { t } = useTranslation("common")

  const onCancel = () => {
    setOpen(false)
    onCancelClick?.()
  }

  return (
    <Dialog open={open} setOpen={setOpen} header={true} title={title} closeButton={true}>
      <DialogBody className={cn("bg-[#F4FBFC]", className)}>{children}</DialogBody>
      <DialogFooter className="bg-[#F4FBFC]" board={true}>
        <Button className="w-24" variant="outline" onClick={onCancel}>
          {cancelText ?? t("cancel")}
        </Button>
        <Button className="w-24" onClick={onConfirmClick}>
          {confirmText ?? t("confirm")}
        </Button>
      </DialogFooter>
    </Dialog>
  )
}

export default ConfirmDialog
