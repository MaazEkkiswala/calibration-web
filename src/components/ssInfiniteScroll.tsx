import AppUtils from '@/helper/appUtils';
import { IconLoader2 } from '@tabler/icons-react';
import { isEmpty, map, size } from 'lodash';
import { ReactNode } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';

interface ISsInfiniteScroll {
  data: any[]
  totalRecords: number
  renderEmptyContent: ReactNode

  height?: any
  className?: string

  renderItem: (item: any, index: number) => ReactNode
  onNext: () => void
}

export default function SsInfiniteScroll({ data, onNext, renderItem, totalRecords, renderEmptyContent, height = null, className = '' }: ISsInfiniteScroll) {
  const renderList = (): ReactNode => {
    if (isEmpty(data)) {
      return renderEmptyContent;
    }

    return map(data, (item: any, index: number) => renderItem(item, index));
  };

  const renderLoader = () => {
    if (isEmpty(data)) {
      return;
    }

    return (
      <div className='flex flex-row w-full justify-center items-center py-2'>
        <IconLoader2 className='animate-spin w-8 h-8 text-violet-400' />
      </div>
    );
  };

  return (
    <InfiniteScroll
      height={height || window.screen.height * 0.75}
      className={AppUtils.classNames('overflow-y-auto flex flex-col mt-1 px-4', className)}
      dataLength={totalRecords}
      hasMore={size(data) !== totalRecords}
      loader={renderLoader()}
      next={onNext}
    >
      {renderList()}
    </InfiniteScroll>
  );
}
