import { ProjectsTable } from '@/components/pages/dashboard/projects/projectsTable';

/*
 * Projects page
 */
export default function Projects() {
  return (
    <main className='flex flex-grow flex-col items-center justify-center'>
      <h1 className='text-4xl mb-3 font-bold'>Projekter</h1>
      <p className='text-2xl text-center'>
        Dette er en liste med alle projekter du er leder af og er medlem af.
      </p>
      {/* Data table with all projects & overview. Add a "Create project" button */}
      <ProjectsTable />
    </main>
  );
}
