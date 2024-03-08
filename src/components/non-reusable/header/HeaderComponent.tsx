import NavBar from '@/components/non-reusable/header/NavComponent';
import HamburgerMenu from '@/components/non-reusable/header/HamburgerMenu';
import ThemeToggle from '@/lib/theme/theme-toggle';

/**
 * Header component with the site title and navigation bar
 * This will be shown on all pages
 * @returns HTML for the header
 */
export default function Header() {
  return (
    <header className='p-5 w-full flex md:flex-col justify-around items-center border-b-2 border-slate-400 overflow-hidden'>
      <HamburgerMenu />
      <h1 className='w-full text-center font-bold text-xl'>To-do App</h1>
      <ThemeToggle />
      <NavBar />
    </header>
  );
}
