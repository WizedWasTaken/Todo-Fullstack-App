'use client';

// Imports
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/components/ui-library/alert';

/*
 * Alert for when a user is already logged in
 */
export default function LoggedInAlert() {
  return (
    <>
      <Alert
        variant='default'
        className='mt-4'
      >
        <AlertTitle>Allerede logget ind</AlertTitle>
        <AlertDescription>
          Du er allerede logget ind på en konto. Log ud for at oprette en ny.
        </AlertDescription>
      </Alert>
    </>
  );
}
