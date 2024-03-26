'use client';
import React from 'react';
import { Label } from '@/components/ui-library/label';
import { Input } from '@/components/ui-library/input';
import { cn } from '@/lib/utils/design/cn';
import {
  IconBrandGithub,
  IconBrandGoogle,
  IconBrandFacebook,
} from '@tabler/icons-react';
import { signIn } from 'next-auth/react';

/**
 * Register page
 * @returns HTML for the register page
 */
export default function RegisterPage() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Implement login logic here');
  };

  // Find a way to alert other than using alert
  const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    for (let [key, value] of formData.entries() as any) {
      if (!value) {
        alert('Please fill out all fields');
        return;
      }
    }

    const result = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        repeatPassword: formData.get('repeatPassword'),
        firstName: formData.get('firstname'),
        lastName: formData.get('lastname'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(async (res) => {
        if (res.ok) {
          alert('User created successfully');

          console.log(formData.get('email'), formData.get('password'));
          const signInResult = await signIn('credentials', {
            redirect: false, // Handle redirection manually
            email: formData.get('email'),
            password: formData.get('password'),
          });

          if (signInResult?.error) {
            alert(`Login failed: ${signInResult.error}`);
          } else {
            location.reload();
            window.location.href = '/'; // Redirect to home page
          }
        } else {
          alert('An error occurred');
        }
      })
      .catch(() => {
        alert('An error occurred');
      });
  };

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

  // TODO: registerUser is also submitted when using OAuth buttons. Fix this
  return (
    <main className='flex flex-col flex-grow items-center justify-center w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input'>
      <h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center'>
        Velkommen til To-do App 🚀
      </h2>
      <p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
        Opret en konto for at komme i gang
      </p>

      <form
        className='my-8'
        onSubmit={registerUser}
      >
        <div className='flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4'>
          <LabelInputContainer>
            <Label htmlFor='firstname'>Fornavn</Label>
            <Input
              name='firstname'
              id='firstname'
              placeholder='John'
              type='text'
            />
          </LabelInputContainer>
          <LabelInputContainer>
            <Label htmlFor='lastname'>Efternavn</Label>
            <Input
              name='lastname'
              id='lastname'
              placeholder='Doe'
              type='text'
            />
          </LabelInputContainer>
        </div>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='email'>Email Addresse</Label>
          <Input
            name='email'
            id='email'
            placeholder='din@email.com'
            type='email'
          />
        </LabelInputContainer>
        <LabelInputContainer className='mb-4'>
          <Label htmlFor='password'>Kodeord</Label>
          <Input
            name='password'
            id='password'
            placeholder='••••••••'
            type='password'
          />
        </LabelInputContainer>
        <LabelInputContainer className='mb-8'>
          <Label htmlFor='repeatPassword'>Gentag kodeord</Label>
          <Input
            name='repeatPassword'
            id='repeatPassword'
            placeholder='••••••••'
            type='password'
          />
        </LabelInputContainer>

        <button
          className='bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]'
          type='submit'
        >
          Opret Konto &rarr;
          <BottomGradient />
        </button>

        <div className='bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full' />

        <div className='flex flex-col space-y-4'>
          <p className='text-neutral-600 dark:text-neutral-300 text-sm text-center'>
            Eller opret en konto med
          </p>
          <div className='flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
            {logInOptions.map((option, index) => (
              <button
                key={index}
                onClick={() => signIn(option.id)}
                className='relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]'
                // type='submit'
              >
                {option.icon}
                <span className='text-neutral-700 dark:text-neutral-300 text-sm'>
                  {option.name}
                </span>
                <BottomGradient />
              </button>
            ))}
          </div>
        </div>
      </form>
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
