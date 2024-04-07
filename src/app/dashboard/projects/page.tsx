import { ProjectsTable } from '@/components/pages/dashboard/projectsTable';
import { CreateProjectMenu } from '@/components/pages/dashboard/createProjectMenu';

/*
 * Projects page
 */
export default function Projects() {
  return (
    <main className='flex flex-grow flex-col items-center justify-center'>
      <CreateProjectMenu />
      {/* Data table with all projects & overview. Add a "Create project" button */}
      <ProjectsTable />
    </main>
  );
}
