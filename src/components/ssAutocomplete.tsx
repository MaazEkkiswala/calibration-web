import {
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { Command as CommandPrimitive } from 'cmdk';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';

import { Skeleton } from '@/components/ui/skeleton';

import { cn } from '@/lib/utils';
import { isEmpty } from 'lodash';
import { Check } from 'lucide-react';
import SsFormErrorMessage from './form/ssFormErrorMessage';

export type Option = Record<'value' | 'label', string> & Record<string, string>;

type AutoCompleteProps = {
  options: Option[];
  emptyMessage: string;

  value?: Option;
  isLoading?: boolean;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
  errorMessage?: string | null

  onValueChange: (value: Option) => void;
};

export const AutoComplete = ({
  options,
  placeholder,
  emptyMessage,
  value,

  disabled = false,
  isLoading = false,
  className = '',
  errorMessage = null,

  onValueChange
}: AutoCompleteProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [isOpen, setOpen] = useState(false);
  const [selected, setSelected] = useState<Option>(value as Option);
  const [inputValue, setInputValue] = useState<string>(value?.label || '');

  useEffect(() => {
    if (isEmpty(inputValue) && !isEmpty(value)) {
      const _emptyValue: any = {};

      setSelected(_emptyValue);
      onValueChange(_emptyValue);
    }
  }, [inputValue]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (!input) {
        return;
      }

      if (!isOpen) {
        setOpen(true);
      }

      if (event.key === 'Enter' && input.value !== '') {
        const optionToSelect = options.find(
          (option) => option.label === input.value
        );
        if (optionToSelect) {
          setSelected(optionToSelect);
          onValueChange?.(optionToSelect);
        }
      }

      if (event.key === 'Escape') {
        input.blur();
      }
    },
    [isOpen, options, onValueChange]
  );

  const handleBlur = useCallback(() => {
    setOpen(false);
    setInputValue(selected?.label);
  }, [selected]);

  const handleSelectOption = useCallback(
    (selectedOption: Option) => {
      setInputValue(selectedOption.label);

      setSelected(selectedOption);
      onValueChange?.(selectedOption);

      setTimeout(() => {
        inputRef?.current?.blur();
      }, 0);
    },
    [onValueChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div className='flex flex-col space-y-1'>
        <div className={`border rounded-md ${className}`}>
          <CommandInput
            ref={inputRef}
            value={inputValue}
            onValueChange={isLoading ? undefined : setInputValue}
            onBlur={handleBlur}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            disabled={disabled}
          />
        </div>

        <SsFormErrorMessage message={errorMessage} />
      </div>
      <div className='relative mt-1'>
        <div
          className={cn(
            'animate-in fade-in-0 zoom-in-95 absolute top-0 z-10 w-full rounded-xl bg-white dark:bg-gray-800 outline-none',
            isOpen ? 'block' : 'hidden', className
          )}
        >
          <CommandList className='rounded-lg ring-1 ring-slate-200 dark:ring-gray-700'>
            {isLoading ? (
              <CommandPrimitive.Loading>
                <div className='p-1'>
                  <Skeleton className='h-8 w-full' />
                </div>
              </CommandPrimitive.Loading>
            ) : null}
            {options.length > 0 && !isLoading ? (
              <CommandGroup>
                {options.map((option) => {
                  const isSelected = selected?.value === option.value;
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.label}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        event.stopPropagation();
                      }}
                      onSelect={() => handleSelectOption(option)}
                      className={cn(
                        'flex w-full items-center gap-2 dark:text-white',
                        !isSelected ? 'pl-8' : null
                      )}
                    >
                      {isSelected ? <Check className='w-4' /> : null}
                      {option.label}
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            ) : null}
            {!isLoading ? (
              <CommandPrimitive.Empty className='select-none rounded-sm px-2 py-3 text-center text-sm dark:text-gray-400'>
                {emptyMessage}
              </CommandPrimitive.Empty>
            ) : null}
          </CommandList>
        </div>
      </div>
    </CommandPrimitive>
  );
};
