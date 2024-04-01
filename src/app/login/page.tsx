'use client';

// Imports
import React from 'react';
import { Label } from '@/components/ui-library/label';
import { Input } from '@/components/ui-library/input';
import { cn } from '@/lib/utils/classNames';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from '@tabler/icons-react';
import LoggedInAlert from '@/components/alert/loggedInAlert';
import { signIn, useSession } from 'next-auth/react';

/*
 * Login page
 */
export default function LoginPage() {
  const { data: session } = useSession();

  // TODO: Find a way to alert other than using alert
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Form Data validation (Check if all fields are filled out)
    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData.entries() as any) {
      if (!value) {
        alert('Please fill out all fields');
        return;
      }
    }

    // NextAuth call to sign in with inputted credentials
    signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      callbackUrl: '/dashboard',
    });
  };

  // OAuth log in options for buttons
  const logInOptions = [
    {
      name: 'Google',
      icon: (
        <IconBrandGoogle className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
      ),
      id: 'google',
    },
    {
      name: 'GitHub',
      icon: (
        <IconBrandGithub className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
      ),
      id: 'github',
    },
    {
      name: 'Facebook',
      icon: (
        <IconBrandFacebook className='h-4 w-4 text-neutral-800 dark:text-neutral-300' />
      ),
      id: 'discord',
    },
  ];

  return (
    <main className='flex flex-col flex-grow items-center justify-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center'>
        Velkommen tilbage til To-do App 🚀
      </h2>
      <p className='text-neutral-600 text-sm md:text-lg mt-2 dark:text-neutral-300'>
        Log ind på din konto
      </p>
      <div>
        <form
          className='my-6 flex flex-col gap-2'
          onSubmit={registerUser}
        >
          <div className='flex gap-5'>
            <LabelInputContainer className='md:mb-2'>
              <Label htmlFor='email'>E-mailadresse</Label>
              <Input
                name='email'
                id='email'
                placeholder='din@email.com'
                type='email'
              />
            </LabelInputContainer>
            <LabelInputContainer className='md:mb-4'>
              <Label htmlFor='password'>Kodeord</Label>
              <Input
                name='password'
                id='password'
                placeholder='••••••••'
                type='password'
              />
            </LabelInputContainer>
          </div>

          <button
            className='bg-gradient-to-br relative group/btn disabled:cursor-not-allowed from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
            type='submit'
            disabled={session ? true : false}
          >
            Opret Konto &rarr;
            {!session && <BottomGradient />}
          </button>
          <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent mt-8 mb-2 h-[1px] w-full' />
        </form>

        {/* TODO: Can i clean this code with a new function??? */}
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4 w-full'>
          <div className='flex flex-col space-y-4 w-full'>
            <p className='text-neutral-600 dark:text-neutral-300 text-sm text-center'>
              Eller opret en konto med
            </p>
            <div className='flex flex-col md:flex-row w-full md:mx-auto justify-around md:justify-center gap-2 md:space-x-4 md:space-y-0'>
              {logInOptions.map((option, index) => (
                <button
                  key={index}
                  onClick={() =>
                    signIn(option.id, { callbackUrl: '/dashboard' })
                  }
                  disabled={session ? true : false}
                  className='relative group/btn justify-center flex w-full md:w-1/3 disabled:cursor-not-allowed space-x-2 items-center md:justify-start px-4 text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
                >
                  {option.icon}
                  <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                    {option.name}
                  </span>
                  {!session && <BottomGradient />}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div>{session && <LoggedInAlert />}</div>
      </div>
    </main>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
      <span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn('flex flex-col space-y-2 w-full', className)}>
      {children}
    </div>
  );
};