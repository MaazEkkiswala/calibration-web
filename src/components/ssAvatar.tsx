import AppUtils from '@/helper/appUtils';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

interface ISsAvatar {
  fallbackLabel: string,

  src?: any,
  alt?: string
  className?: string
}

export default function SsAvatar({ fallbackLabel, alt = '', src = '', className = '' }: ISsAvatar) {
  return (
    <Avatar className={AppUtils.classNames('border', className)}>
      <AvatarImage src={src} alt={alt} />
      <AvatarFallback>{fallbackLabel}</AvatarFallback>
    </Avatar>
  );
}
