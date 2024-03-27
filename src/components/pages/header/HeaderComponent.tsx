import NavBar from '@/components/pages/header/NavComponent';
import HamburgerMenu from '@/components/pages/header/HamburgerMenu';
import ThemeToggle from '@/lib/theme/theme-toggle';

/*
 * Header component with the site title and navigation bar
 * This will be shown on all pages
 */
export default function Header() {
  return (
    <header className='p-5 w-full flex md:flex-col justify-around items-center border-b-2 border-slate-400 overflow-hidden'>
      <HamburgerMenu />
      <div className='flex md:flex-row items-center justify-center w-full relative mb-3'>
        <h1 className='w-full text-center font-bold text-xl'>To-do App</h1>
        <div className='absolute top-0 right-0'>
          <ThemeToggle />
        </div>
      </div>
      <NavBar />
    </header>
  );
}
