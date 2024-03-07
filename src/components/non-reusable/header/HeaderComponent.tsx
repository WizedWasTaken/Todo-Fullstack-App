import Nav from '@/components/non-reusable/header/NavComponent';

export default function Header() {
  return (
    <header className='p-5 flex flex-col justify-center items-center border-b-2 border-slate-400'>
      <h1>Header</h1>
      <Nav />
    </header>
  );
}
