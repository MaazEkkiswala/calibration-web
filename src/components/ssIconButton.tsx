import { IconLoader2 } from '@tabler/icons-react'
import { ComponentProps } from 'react'

import { Button } from './ui/button'

interface ISsIconButton extends ComponentProps<'button'> {
  icon: any
  onClick: () => void

  isLoading?: boolean
  isDisabled?: boolean
}

export default function SsIconButton({ icon, onClick, isLoading = false, isDisabled = false }: ISsIconButton) {
  return (
    <Button onClick={onClick} disabled={isDisabled} variant='outline' size='icon' className='w-8 h-8'>
      {
        isLoading
          ? <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
          : icon
      }
    </Button>
  );
}
