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

import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
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
    password1: z.string({
    }).min(8, {
        message: "Please check again"
    }),
    password2: z.string({
    }).min(8, {
        message: "Please check again"
    }),
})

export default function RegisterForm() {
    const [ disabled, setDisabled ] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    const [ createUserWithEmailAndPassword ] = useCreateUserWithEmailAndPassword(auth);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password1: "",
            password2: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setDisabled(true);
        // check if passwords match
        if (values.password1 !== values.password2) {
            form.setError("password2", {
                message: "Passwords do not match"
            })
            setDisabled(false);
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(values.email, values.password1);
            if (!res?.user) {
                setError("An error occurred. Please try again");
                setDisabled(false);
            } else {
                router.push('/login')
            }
        } catch (error) {
            console.error(error)
            setError((error as Error).message);
        }
    }
    return (
        <Form {...form} >
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 text-darkGrey">
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
                name="password1"
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
                <FormField
                control={form.control}
                name="password2"
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
                    Create new account
                </PrimaryButton>
                <p className='text-center py-5 text-md'>Already have an account? <Link href='/login' className='text-primary'>Login</Link></p>
            </form>
        </Form>
    )
}