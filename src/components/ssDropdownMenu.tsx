import { map } from 'lodash'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { IconChevronDown, IconLoader2 } from '@tabler/icons-react'

import { Button } from './ui/button'
import { Label } from './ui/label'

interface IDropdownOption {
  label: string
  value: string

  isDisabled?: any
  icon?: any
}

type IDropdownProps = {
  menuOptions: any[]
  label: string

  isLoading?: boolean
  isDisabledOptionMenu?: boolean

  onMenuOptionClick: (option: string) => void
}

export default function Dropdown({
  label,
  menuOptions,

  isDisabledOptionMenu = false,
  isLoading = false,

  onMenuOptionClick
}: IDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button disabled={isDisabledOptionMenu || isLoading} variant='outline' className='text-sm font-medium flex items-center gap-1'>
          {
            isLoading
              ? <IconLoader2 className='mr-2 h-4 w-4 animate-spin' />
              : null
          }
          {label}
          <IconChevronDown className='w-4 h-4 text-gray-600' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          <Label className='text-xs text-gray-900 font-robot'>{label}</Label>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {
          map(menuOptions, (option: IDropdownOption, index: number) => (
            <DropdownMenuItem
              disabled={option.isDisabled}
              onClick={() => onMenuOptionClick(option.value)}
              key={index}
              className='flex flex-row items-center space-x-2'
            >
              {option.icon}
              <span>{option.label}</span>
            </DropdownMenuItem>
          ))
        }
      </DropdownMenuContent>
    </DropdownMenu>
  )
}