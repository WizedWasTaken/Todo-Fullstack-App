import { ProjectsTable } from '@/components/pages/dashboard/projectsTable';

/*
 * Projects page
 */
export default function Projects() {
  return (
    <main className='flex flex-grow flex-col items-center justify-center'>
      {/* Data table with all projects & overview. Add a "Create project" button */}
      <ProjectsTable />
    </main>
  );
}
