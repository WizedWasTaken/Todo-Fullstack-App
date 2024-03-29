'use client';

// Important Imports
import { ColumnDef } from '@tanstack/react-table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui-library/dropdown-menu';

import { DataTableColumnHeader } from '@/components/data-table/data-table-header';

// UI
import { Button } from '@/components/ui-library/button';
import { Checkbox } from '@/components/ui-library/checkbox';
import { MoreHorizontal } from 'lucide-react';

// Types
import { UserData } from '@/lib/types';

// TODO: Add row actions for managing user. For example, delete.
export const UserTableColumns: ColumnDef<UserData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Navn'
      />
    ),
    cell: ({ row }) => {
      const name: string = row.getValue('name');
      return <div className={'text-right font-medium'}>{name}</div>;
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Email'
      />
    ),
    cell: ({ row }) => {
      const email: string = row.getValue('email');
      return <div className='text-right font-medium'>{email}</div>;
    },
  },
  {
    accessorKey: 'provider',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Provider'
      />
    ),
    cell: ({ row }) => {
      const provider: string = row.getValue('provider');
      return <div className='text-right font-medium'>{provider}</div>;
    },
  },
  {
    accessorKey: 'group',
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title='Grupper'
      />
    ),
    cell: ({ row }) => {
      const group: string[] = row.getValue('group');
      const formatted = group.join(', ');
      return <div className='text-right font-medium'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'providerId',
    header: () => <div className='text-right'>Provider ID</div>,
    cell: ({ row }) => {
      const providerId: string = row.getValue('providerId');
      return <div className='text-right font-medium'>{providerId}</div>;
    },
  },
  // TODO: Dropdown menu is looking weird as fuck 😭.
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Åben menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Muligheder</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Kopier bruger ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se bruger</DropdownMenuItem>
            <DropdownMenuItem>Se bruger detaljer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

// ! This is an example table column. Copy columns from UserTableColumns and modify them.
export const ExampleTableColumns: ColumnDef<UserData>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const user = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant='ghost'
              className='h-8 w-8 p-0'
            >
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end'>
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(user._id)}
            >
              Kopier bruger ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Se bruger</DropdownMenuItem>
            <DropdownMenuItem>Se bruger detaljer</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
