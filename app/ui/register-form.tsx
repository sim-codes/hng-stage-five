'use client';

import { PrimaryButton } from '@/app/ui/buttons';
import { useFormState, useFormStatus } from 'react-dom';
import email from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';
import Image from 'next/image';
import Link from 'next/link';

export default function RegisterForm() {
//   const [errorMessage, dispatch] = useFormState(authenticate, undefined);

  return (
    <form className="space-y-3 text-darkGrey text-sm">
      <div className="flex-1">
        <div className="w-full">
          <div>
            <label
              className="mb-3 mt-5 block font-normal"
              htmlFor="email"
            >
              Email address
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 text-sm autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                id="email"
                type="email"
                name="email"
                placeholder="e.g.alex@email.com"
                required
              />
              <Image src={email} alt="Email icon"
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-normal"
              htmlFor="password"
            >
              Create Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                id="password"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                required
                minLength={6}
              />
              <Image src={lock} alt="Email icon"
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
          <div className="mt-4">
            <label
              className="mb-3 mt-5 block text-xs font-normal"
              htmlFor="password"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                id="password"
                type="password"
                name="password"
                placeholder="At least 8 characters"
                required
                minLength={6}
              />
              <Image src={lock} alt="Email icon"
              className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
            </div>
          </div>
        </div>
        <RegisterButton />
        <p className='text-center py-5 text-md'>Already have an account? <Link href='/login' className='text-primary'>Login</Link></p>
      </div>
    </form>
  );
}

function RegisterButton() {
    const { pending } = useFormStatus();
    return (
    <PrimaryButton className="mt-4 w-full justify-center" aria-disabled={pending}>
        Create new account
    </PrimaryButton>
    );
}
