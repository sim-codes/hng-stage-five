'use client';

import Logo from '@/app/ui/logo';
import { PrimaryButton } from '@/app/ui/buttons';
import { useState } from 'react';
import emailIcon from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';
import Image from 'next/image';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [ disabled, setDisabled ] = useState(false);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);

    // const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    //     e.preventDefault();
    //     setDisabled(true);
    //     try {
    //         const res = await signInWithEmailAndPassword(email, password);
    //         if (res?.user) {
    //             sessionStorage.setItem('user', JSON.stringify(res.user));
    //             setEmail('');
    //             setPassword('');
    //             router.push('/')
    //         }
    //         setDisabled(false);
    //         console.log('Error:', res)
    //         return;
    //     } catch (error) {
    //         console.error(error)
    //     }
    // }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setDisabled(true)
    
        try {
          // Sign in with Firebase
          const userCredential = await signInWithEmailAndPassword(auth, email, password);
          
          // Get the ID token
          const idToken = await getIdToken(userCredential.user);
    
          // Sign in with NextAuth using the ID token
          const result = await signIn('credentials', {
            idToken,
            redirect: false,
          });
    
          if (result?.error) {
            setError(result.error);
          } else {
            router.push('/');
          }
        } catch (error) {
          setError('Failed to sign in. Please check your credentials.');
          console.error('Sign-in error:', error);
        }
      };

    return (
        <main className="w-full min-h-screen max-w-7xl mx-auto flex justify-center sm:items-center items-start">
            <div className="w-[476px] flex flex-col gap-14 rounded-lg">
                <Logo />
                <div className="w-full flex flex-col gap-1 bg-white p-10 space-y-5">
                    <div className="flex flex-col gap-2">
                        <h1 className='font-bold text-3xl text-black'>Login</h1>
                        <span className='text-sm text-darkGrey'>Add your details below to get back into the app</span>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-3 text-darkGrey text-sm">
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 text-sm autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                                    id="email"
                                    type="email"
                                    name="email"
                                    placeholder="e.g.alex@email.com"
                                    required
                                />
                                <Image src={emailIcon} alt="Email icon"
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
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
                            {error && <p>{error}</p>}
                            </div>
                            <PrimaryButton
                            className="mt-4 w-full justify-center" aria-disabled={disabled}>
                                Log in
                            </PrimaryButton>
                            <p className='text-center py-5 text-md'>Don&lsquo;t have an account? <Link href='/register' className='text-primary'>Create account</Link></p>
                        </div>
                        </form>
                </div>
            </div>
        </main>
    )
}

