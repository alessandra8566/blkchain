import {
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
  UseControllerProps,
} from "react-hook-form";
import { BaseFormProps, CustomFormSelectProps } from "./utils";
import { cn } from "@/utils/shadcn";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { useId } from "react";

export const FormCheckboxGroup = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>
>({
  labelDisplay = "inline",
  ...props
}: UseControllerProps<TFieldValues, TName> &
  BaseFormProps & { checkboxGroupProps?: CustomFormSelectProps }) => {
  const compId = useId();
  return (
    <Controller
      {...props}
      render={({ field, fieldState }) => {
        const { error } = fieldState;
        const errmsg = error ? String(error?.message) : undefined;
        return (
          <div
            className={cn(props?.className, {
              "flex items-center": labelDisplay === "inline",
            })}
          >
            {props.label && (
              <Label
                className={cn(
                  "w-20 shrink-0 font-normal",
                  typeof props.label === "object" && props.label.className
                )}
              >
                {typeof props.label === "object"
                  ? props.label.name
                  : props.label}
              </Label>
            )}
            <div
              className={cn(
                "flex flex-wrap items-center gap-2",
                props.checkboxGroupProps?.className
              )}
            >
              {props.checkboxGroupProps?.items.map(({ value, text }) => (
                <div
                  key={value}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <Checkbox
                    id={value + compId}
                    checked={field.value?.includes(value)}
                    disabled={props.checkboxGroupProps?.disabled}
                    onCheckedChange={(checked: boolean) => {
                      if (props.checkboxGroupProps?.onCheckedChange) {
                        props.checkboxGroupProps.onCheckedChange(
                          checked,
                          value
                        );
                      }
                      return checked
                        ? field.onChange([...field.value, value] as PathValue<
                            TFieldValues,
                            TName
                          >)
                        : field.onChange(
                            field.value.filter((v: string) => v !== value)
                          );
                    }}
                  />
                  <Label htmlFor={value + compId} className="cursor-pointer">
                    {text}
                  </Label>
                </div>
              ))}
            </div>
            {errmsg && <span className="text-xs text-red-600">{errmsg}</span>}
          </div>
        );
      }}
    />
  );
};
