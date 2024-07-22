'use client';

import { useState } from 'react';
import RegisterForm from '@/app/ui/register-form';
import Logo from '@/app/ui/logo';
import { PrimaryButton } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import emailIcon from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';
import Image from 'next/image';
import Link from 'next/link';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';

export default function Page() {
    const [email, setEmail ] = useState('');
    const [password, setPassword ] = useState('');
    const [ confirmPwd, setConfirmPwd ] = useState('');

    const [ disabled, setDisabled ] = useState(false);
    const router = useRouter();

    const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);

    const handleRegister = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setDisabled(true);
        try {
            const res = await createUserWithEmailAndPassword(email, password);
            if (res?.user) {
                sessionStorage.setItem('user', JSON.stringify(res.user));
                setEmail('');
                setPassword('');
                router.push('/')
            }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <main className="w-full min-h-screen max-w-7xl mx-auto flex justify-center items-center">
            <div className="w-[476px] flex flex-col gap-14 rounded-lg">
                <Logo />
                <div className="w-full flex flex-col gap-1 bg-white p-10 space-y-5">
                    <div className="flex flex-col gap-2">
                        <h1 className='font-bold text-3xl text-black'>Create account</h1>
                        <span className='text-sm text-darkGrey'>Let&lsquo;s get you started sharing your links!</span>
                    </div>
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
                            htmlFor="password1"
                            >
                            Create Password
                            </label>
                            <div className="relative">
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                                id="password1"
                                type="password"
                                name="password1"
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
                            htmlFor="password2"
                            >
                            Confirm Password
                            </label>
                            <div className="relative">
                            <input
                                value={confirmPwd}
                                onChange={(e) => setConfirmPwd(e.target.value)}
                                className="peer block w-full rounded-md border border-grey py-3 px-4 pl-10 autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                                id="password2"
                                type="password"
                                name="password2"
                                placeholder="At least 8 characters"
                                required
                                minLength={6}
                            />
                            <Image src={lock} alt="Email icon"
                            className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                            </div>
                        </div>
                        </div>
                        <PrimaryButton onClick={handleRegister}
                        className="mt-4 w-full justify-center" aria-disabled={disabled}>
                            Create new account
                        </PrimaryButton>
                        <p className='text-center py-5 text-md'>Already have an account? <Link href='/login' className='text-primary'>Login</Link></p>
                    </div>
                    </form>
                </div>
            </div>
        </main>
    )
}
