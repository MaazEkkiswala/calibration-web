import { Label } from "../ui/label";

interface ISsFormLabel {
  label?: string | null;
  required?: boolean;
}

export default function SsFormLabel({
  label = null,
  required = false,
}: ISsFormLabel) {
  if (!label) {
    return;
  }

  return (
    <Label className="font-robot text-xs text-gray-700">
      {label}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </Label>
  );
}
