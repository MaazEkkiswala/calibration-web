import AppUtils from '@/helper/appUtils';

import { Badge } from './ui/badge';

interface ISsBadge {
  label: string
  className?: string
  variant: 'info' | 'success' | 'warning' | 'error' | 'default'

}

export default function SsBadge({ label, variant = 'default', className = '' }: ISsBadge) {
  const getVariantClass = () => {
    switch (variant) {
      case 'info':
        return 'text-violet-500 bg-violet-100';
      case 'error':
        return 'text-red-500 bg-red-100';
      case 'success':
        return 'text-emerald-500 bg-emerald-100';
      case 'warning':
        return 'text-yellow-500 bg-yellow-100';
      default:
        return 'text-gray-500 bg-gray-100';
    }
  };

  return (
    <Badge className={AppUtils.classNames(
      'px-2 py-0.5 rounded text-[10px] font-semibold',
      className,
      getVariantClass()
    )}>
      {label}
    </Badge>
  );
}