'use client';

// Imports
import React from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { ProjectTableColumns } from '@/lib/theme/columnDefinitions';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export function ProjectsTable() {
  const [projects, setProjects] = React.useState([]);

  React.useEffect(() => {
    fetch('/api/dashboard/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  return (
    <>
      <DataTable
        data={projects}
        columns={ProjectTableColumns}
      />
    </>
  );
}
