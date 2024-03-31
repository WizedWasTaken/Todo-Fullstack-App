'use client';

import { DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu';
import { MixerHorizontalIcon } from '@radix-ui/react-icons';
import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui-library/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui-library/dropdown-menu';
import { ShadCNInput } from '@/components/ui-library/ShadCN-input';

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  return (
    <div className='flex flex-row justify-between items-center w-full pb-2'>
      <ShadCNInput
        placeholder='Søg efter navn.'
        value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('name')?.setFilterValue(event.target.value)
        }
        className='max-w-sm'
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='outline'
            className='ml-auto hidden h-8 lg:flex'
          >
            <MixerHorizontalIcon className='mr-2 h-4 w-4' />
            View
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align='end'
          className='w-[150px]'
        >
          <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== 'undefined' && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className='capitalize'
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
