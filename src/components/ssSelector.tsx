import { get, map } from 'lodash'

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import SsFormErrorMessage from './form/ssFormErrorMessage'
import { Label } from './ui/label'
import { Skeleton } from './ui/skeleton'

interface ISsSelector {
  placeholder: string,
  optionLabel: string,
  options: any[],

  selectorClass?: string,
  defaultValue?: string | null,
  displayLabel?: string,
  returnValue?: string,
  isLoading?: boolean,
  label?: null | string
  errorMessage?: null | string,
  isDisabled?: boolean

  onValueChange?(value: string): any,
}

export function SsSelector({
  placeholder,
  selectorClass,
  optionLabel,
  options,

  isLoading = false,
  defaultValue = '',
  displayLabel = 'label',
  returnValue = 'value',
  label = null,
  errorMessage = null,
  isDisabled = false,

  onValueChange
}: ISsSelector) {
  const renderView = () => {
    if (isLoading) {
      return <Skeleton className='w-full h-10' />;
    }

    return (
      <Select disabled={isDisabled} onValueChange={onValueChange} defaultValue={defaultValue || ''}>
        <SelectTrigger className={selectorClass}>
          <SelectValue placeholder={<Label className='text-gray-400 text-sm font-robot'>{placeholder}</Label>} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{optionLabel}</SelectLabel>
            {
              map(options, (option: any, pIndex: number) => (
                <SelectItem key={pIndex} value={get(option, returnValue) as any}>{get(option, displayLabel)}</SelectItem>
              ))
            }
          </SelectGroup>
        </SelectContent>
      </Select>
    );
  };

  return (
    <div className='flex flex-col space-y-1 w-full'>
      {
        label
          ? <Label className='font-robot text-xs text-gray-700'>{label}</Label>
          : null
      }
      {renderView()}

      <SsFormErrorMessage message={errorMessage} />
    </div>
  )
}