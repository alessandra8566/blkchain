import { Controller, FieldPath, FieldValues, PathValue, UseControllerProps } from "react-hook-form"
import { BaseFormProps, CustomFormCheckboxProps } from "./utils"
import { cn } from "@/utils/shadcn"
import { Label } from "../ui/label"
import { Checkbox } from "../ui/checkbox"
import { useId } from "react"

export const FormCheckbox = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> & BaseFormProps & { checkboxProps?: CustomFormCheckboxProps }) => {
  const compId = useId()
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => {
        const { error } = fieldState
        const errmsg = error ? String(error?.message) : undefined
        return (
          <div
            className={cn(props?.className, {
              "flex items-center": labelDisplay === "inline",
            })}
          >
            {props.label && (
              <Label
                className={cn("w-20 shrink-0 font-normal", typeof props.label === "object" && props.label.className)}
              >
                {typeof props.label === "object" ? props.label.name : props.label}
              </Label>
            )}
            <Checkbox
              {...props.checkboxProps}
              id={props?.checkboxProps?.id ?? `checkbox-${compId}`}
              className={cn(props.checkboxProps?.className)}
              checked={field.value}
              onCheckedChange={(checked: boolean) => {
                props.checkboxProps?.onCheckedChange && props.checkboxProps.onCheckedChange(checked)
                field.onChange(checked as PathValue<TFieldValues, TName>)
              }}
              hidden={props.checkboxProps?.hidden ?? false}
            />
            {props.checkboxProps?.label && (
              <Label
                htmlFor={props?.checkboxProps?.id ?? `checkbox-${compId}`}
                className={cn(
                  "ml-2 cursor-pointer text-sm font-normal",
                  typeof props.checkboxProps.label === "object" && props.checkboxProps.label.className
                )}
              >
                {typeof props.checkboxProps.label === "object"
                  ? props.checkboxProps.label.name
                  : props.checkboxProps.label}
              </Label>
            )}
            {errmsg && <span className="text-xs text-red-600">{errmsg}</span>}
          </div>
        )
      }}
    />
  )
}
