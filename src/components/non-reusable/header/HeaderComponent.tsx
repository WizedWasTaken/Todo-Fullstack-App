import NavBar from '@/components/non-reusable/header/NavComponent';
import HamburgerMenu from '@/components/non-reusable/header/HamburgerMenu';

/**
 * Header component with the site title and navigation bar
 * This will be shown on all pages
 * @returns HTML for the header
 */
export default function Header() {
  return (
    <header className='p-5 flex md:flex-col justify-around items-center border-b-2 border-slate-400 overflow-hidden'>
      <HamburgerMenu />
      <h1>Header</h1>
      <NavBar />
    </header>
  );
}
