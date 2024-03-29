'use client';

// Imports
import React, { useEffect, useState } from 'react';
import { DataTable } from '@/components/data-table/data-table';
import { TestProjectData } from '@/lib/types';
import { ProjectTableColumns } from '@/lib/theme/columnDefinitions';

/*
 * This is the main page for the users section of the admin dashboard.
 * It shows all the users that have been registered.
 * It is possible to delete users from this page.
 */
export function ProjectsTable() {
  const testProjects: TestProjectData[] = [
    {
      _id: 'proj1',
      name: 'Website Redesign',
      description:
        'A comprehensive redesign of our main website to improve UX and conversion rates.',
      status: 'In Progress',
      startDate: '2024-01-01',
      endDate: '2024-06-30',
      progress: 45,
      members: [
        { _id: 'user1', name: 'Alice' },
        { _id: 'user2', name: 'Bob' },
      ],
    },
    {
      _id: 'proj2',
      name: 'New Product Launch',
      description:
        'Launching our new product line including market analysis, branding, and marketing strategy.',
      status: 'Planning',
      startDate: '2024-02-15',
      endDate: '2024-12-01',
      progress: 10,
      members: [
        { _id: 'user3', name: 'Charlie' },
        { _id: 'user4', name: 'Dana' },
      ],
    },
    {
      _id: 'proj3',
      name: 'Internal Tool Development',
      description:
        'Development of internal tools for project management and productivity improvement.',
      status: 'Completed',
      startDate: '2023-05-01',
      endDate: '2024-01-15',
      progress: 100,
      members: [
        { _id: 'user5', name: 'Eve' },
        { _id: 'user6', name: 'Frank' },
      ],
    },
    {
      _id: 'proj4',
      name: 'Market Research Project',
      description:
        'A detailed market research project to identify new market opportunities and trends.',
      status: 'In Progress',
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      progress: 25,
      members: [
        { _id: 'user7', name: 'Grace' },
        { _id: 'user8', name: 'Heidi' },
      ],
    },
    {
      _id: 'proj5',
      name: 'Security Infrastructure Upgrade',
      description:
        'Upgrade of our security infrastructure to meet latest standards and protect against new threats.',
      status: 'Planning',
      startDate: '2024-04-01',
      endDate: '2025-03-30',
      progress: 5,
      members: [
        { _id: 'user9', name: 'Ivan' },
        { _id: 'user10', name: 'Judy' },
      ],
    },
  ];

  return (
    <DataTable
      data={testProjects}
      columns={ProjectTableColumns}
    />
  );
}
