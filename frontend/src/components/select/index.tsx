import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/utils/shadcn"
import { LucideIcon } from "lucide-react"
import { forwardRef, useMemo } from "react"
import { Label } from "../ui/label"

export interface SelectValueItem {
  text: string
  value: string
  url?: string
}

export type CustomSelectProps = {
  value: string
  placeholder?: string
  items: SelectValueItem[]
  onValueChange?: (value: string) => void
  disabled?: boolean
  className?: string
  label?: string
  id?: string
  topLayer?: boolean
  Icon?: LucideIcon
}

const CustomSelect = forwardRef<HTMLButtonElement, CustomSelectProps>(
  ({ value, placeholder, onValueChange, items, disabled, className, label, id, Icon, ...props }, ref) => {
    const uuid = useMemo(() => {
      return self.crypto.randomUUID()
    }, [])

    return (
      <>
        {label && (
          <Label className="mb-1 pr-3 text-sm text-[#303030]" htmlFor={id ?? uuid}>
            {label}
          </Label>
        )}
        <Select onValueChange={onValueChange} disabled={disabled} value={value} {...props}>
          <SelectTrigger ref={ref} id={id ?? uuid} className={cn("relative bg-white", className)}>
            <SelectValue placeholder={placeholder} />
            {Icon && <Icon size={20} className="absolute left-2" />}
          </SelectTrigger>
          <SelectContent className="z-select">
            {items.map((x) => (
              <SelectItem key={x.value} value={x.value} className="cursor-pointer">
                <div className="flex items-center gap-2">
                  {x.url && (
                    <img
                      className="mr-2 h-7 w-auto"
                      src={x.url}
                      alt={x.text}
                    />
                  )}
                  {x.text}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </>
    )
  }
)

CustomSelect.displayName = "CustomSelect"

export { CustomSelect }
