import { Label } from "@radix-ui/react-label"
import { Controller, FieldPath, FieldValues, PathValue, UseControllerProps } from "react-hook-form"
import { BaseFormProps, CustomFormCheckboxProps } from "./utils"
import { cn } from "@/utils/shadcn"
import { useId } from "react"
import { Switch } from "../ui/switch"

const FormSwitch = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { switchProps?: CustomFormCheckboxProps }) => {
  const compId = useId()
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => {
        const { error } = fieldState
        const errorMsg = error ? String(error?.message) : undefined
        return (
          <div
            className={cn(props?.className, {
              "flex items-center": labelDisplay === "inline",
            })}
          >
            {props.label && (
              <Label
                htmlFor={`input-${compId}`}
                className={cn("w-20 shrink-0", typeof props.label === "object" && props.label.className)}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <Switch
              {...props.switchProps}
              id={props?.switchProps?.id ?? `switch-${compId}`}
              className={cn(props.switchProps?.className)}
              checked={field.value}
              onCheckedChange={(checked: boolean) => {
                props.switchProps?.onCheckedChange && props.switchProps.onCheckedChange(checked)
                field.onChange(checked as PathValue<TFieldValues, TName>)
              }}
              hidden={props.switchProps?.hidden ?? false}
            />
            {props.switchProps?.label && (
              <Label
                htmlFor={props?.switchProps?.id ?? `checkbox-${compId}`}
                className={cn(
                  "ml-2 cursor-pointer text-sm font-normal",
                  typeof props.switchProps.label === "object" && props.switchProps.label.className
                )}
              >
                {typeof props.switchProps.label === "object" ? props.switchProps.label.name : props.switchProps.label}
              </Label>
            )}
            {errorMsg && <span className="text-xs text-red-600">{errorMsg}</span>}
          </div>
        )
      }}
    />
  )
}

export { FormSwitch }
