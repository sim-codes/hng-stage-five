"use client"

import { useState } from "react";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation';
import emailIcon from '@/public/icons/email.svg';
import lock from '@/public/icons/lock.svg';
import Image from 'next/image';
import Link from 'next/link';

import { signIn } from 'next-auth/react';
import { signInWithEmailAndPassword, getIdToken } from 'firebase/auth';
import { auth } from '@/app/firebase/config';

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { PrimaryButton } from '@/app/ui/buttons';

const formSchema = z.object({
    email: z.string().email({
        message: "Can't be empty"
    }),
    password: z.string({
    }).min(8, {
        message: "Please check again"
    }),
})

export default function LoginForm() {
    const [ disabled, setDisabled ] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setDisabled(true);
        try {
            const userCredential = await signInWithEmailAndPassword(auth, values.email, values.password);
            const idToken = await getIdToken(userCredential.user);
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
            // Raise form error with the message in the error
            setDisabled(false);
            setError((error as Error).message);
        }
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-darkGrey">
                <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem className='relative'>
                    <FormLabel className='text-darkGrey font-normal'>Email address</FormLabel>
                    <FormControl>
                        <Input type="email" placeholder="e.g.alex@email.com" {...field} />
                    </FormControl>
                        <Image src={emailIcon} alt="Email icon"
                            className="pointer-events-none absolute left-3 top-[44px] h-[18px] w-[18px] -translate-y-1/2" />
                    <FormMessage className='text-red absolute right-2 top-8' />
                    </FormItem>
                )}
                />
                <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem className='relative'>
                    <FormLabel className='text-darkGrey font-normal'>Create Password</FormLabel>
                    <FormControl>
                        <Input type='password' placeholder="At least 8 characters" {...field} />
                    </FormControl>
                        <Image src={lock} alt="Password icon"
                            className="pointer-events-none absolute left-3 top-[44px] h-[18px] w-[18px] -translate-y-1/2" />
                    <FormMessage className='text-red absolute right-2 top-8' />
                    </FormItem>
                )}
                />
                {error && <p className='text-red text-sm text-center'>{error}</p>}
                <PrimaryButton
                className="mt-4 w-full justify-center" aria-disabled={disabled}>
                    Log in
                </PrimaryButton>
                <p className='text-center py-2 text-md'>Don&lsquo;t have an account? <Link href='/register' className='text-primary'>Create account</Link></p>
            </form>
        </Form>
    )
}