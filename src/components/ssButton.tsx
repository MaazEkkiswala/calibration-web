import { IconLoader2 } from '@tabler/icons-react';
import { ComponentProps } from 'react';

import { Button } from './ui/button';

import AppUtils from '@/helper/appUtils';

interface ISsButton extends ComponentProps<'button'> {
  isLoading?: boolean,
  label: string,
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
  startIcon?: any,
  endIcon?: any,
  className?: string,
  isDisabled?: boolean
};

export default function SsButton({ label, isLoading = false, variant = 'default', className = '', startIcon = null, endIcon = null, isDisabled = false, ...props }: ISsButton) {
  return (
    <Button
      disabled={isDisabled || isLoading}
      variant={variant}
      className={
        AppUtils.classNames(
          'text-sm font-medium flex items-center gap-1',
          className
        )
      }
      {...props}
    >
      {
        isLoading
          ? <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
          : startIcon
      }
      {label}
      {endIcon}
    </Button>
  );
}