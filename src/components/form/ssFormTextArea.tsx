import { FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Textarea } from "../ui/textarea"
import SsFormLabel from "./ssFormLabel"

interface ISsFormTextArea {
  control: any,
  label?: string | null,
  placeholder?: string,
  name: string,
}

export default function SsFormTextArea({ control, name, placeholder, label }: ISsFormTextArea) {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <SsFormLabel label={label} />
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Textarea
                placeholder={placeholder}
                className="resize-none"
                {...field}
              />
            </FormControl>
            <FormMessage className='text-xs' />
          </FormItem>
        )}
      />
    </div>
  )
}