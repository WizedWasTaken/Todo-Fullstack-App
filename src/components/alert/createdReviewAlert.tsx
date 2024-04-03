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
export default function CreatedReviewAlert() {
  return (
    <>
      <Alert
        variant='default'
        className='mb-4'
      >
        <AlertTitle>Allerede skrevet en anmeldelse</AlertTitle>
        <AlertDescription>
          Du redigere istedet i din eksisterende anmeldelse.
        </AlertDescription>
      </Alert>
    </>
  );
}
