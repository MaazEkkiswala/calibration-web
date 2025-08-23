import { IconFileUnknown } from '@tabler/icons-react';

import { Card, CardContent } from './ui/card';
import { Label } from './ui/label';

interface ISsEmptyListCard {
  label: string
}

export default function SsEmptyListCard({ label }: ISsEmptyListCard) {
  return (
    <Card className='p-0'>
      <CardContent className='p-0'>
        <div className='flex flex-row items-center px-3 py-3 space-x-2'>
          <IconFileUnknown className='text-gray-700' />

          <Label className='text-sm mt-0.5 font-robot text-gray-700'>{label}</Label>
        </div>
      </CardContent>
    </Card>
  );
}