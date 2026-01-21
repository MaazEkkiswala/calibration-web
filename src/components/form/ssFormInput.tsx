import { ComponentProps } from "react";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import SsFormLabel from "./ssFormLabel";

interface ISsFormInput extends ComponentProps<"input"> {
  name: string;
  control: any;
  required?: boolean;
  label?: string | null;
  placeholder?: string;
}

export default function SsFormInput({
  control,
  name,
  label = null,
  placeholder = "",
  required = false,
}: ISsFormInput) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <SsFormLabel label={label} required={required} />
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl className="w-full">
              <Input placeholder={placeholder} {...field} required={required} />
            </FormControl>
            <FormMessage className="text-xs" />
          </FormItem>
        )}
      />
    </div>
  );
}
