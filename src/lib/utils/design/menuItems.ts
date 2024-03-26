/**
 * Normal navigation list items for the nav bar
 * This will be shown in the nav bar, and is used to generate the nav items
 */
export const normalMenuItems = [
  {
    name: 'Hjem',
    path: '/',
  },
  {
    name: 'Anmeld',
    path: '/review',
  },
  {
    name: 'Om os',
    path: '/about',
  },
  {
    name: 'Kontakt',
    path: '/contact',
  },
  {
    name: 'Planlæg',
    path: '/plan',
  },
];

/**
 * Login and register navigation list items for the nav bar
 * This will be shown in the nav bar, and is used to generate the nav items
 */
export const loginRegisterMenuItems = [
  {
    name: 'Login',
    path: '/login',
  },
  {
    name: 'Register',
    path: '/register',
  },
];

/**
 * Profile navigation list items for the nav bar
 */
export const profileMenuItems = [
  {
    name: 'Konto',
    path: '/dashboard',
  },
  {
    name: 'Log ud',
    path: '/api/auth/logout',
  },
];

/**
 * Admin navigation list items for the nav bar
 */
export const adminMenuItems = [
  {
    name: 'Dashboard',
    path: '/admin/dashboard',
  },
  {
    name: 'Users',
    path: '/admin/users',
  },
  {
    name: 'Reviews',
    path: '/admin/reviews',
  },
  {
    name: 'Settings',
    path: '/admin/settings',
  },
];
