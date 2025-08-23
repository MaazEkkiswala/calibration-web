import { Label } from '../ui/label';

interface ISsFormErrorMessage {
  message?: string | null | undefined
}

export default function SsFormErrorMessage({ message = null }: ISsFormErrorMessage) {
  if (!message) {
    return;
  }

  return <Label className='text-xs text-error-500'>{message}</Label>
}
