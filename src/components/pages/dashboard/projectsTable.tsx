'use client';

// Imports
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { testProjects } from '@/components/pages/dashboard/testProjects';
import { ProjectTableColumns } from '@/lib/theme/columnDefinitions';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export function ProjectsTable() {
  return (
    <>
      <DataTable
        data={testProjects}
        columns={ProjectTableColumns}
      />
    </>
  );
}
