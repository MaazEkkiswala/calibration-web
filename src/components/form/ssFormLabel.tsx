import { Label } from '../ui/label';

interface ISsFormLabel {
  label?: string | null
}

export default function SsFormLabel({ label = null }: ISsFormLabel) {
  if (!label) {
    return;
  }

  return <Label className='font-robot text-xs text-gray-700'>{label}</Label>;
}