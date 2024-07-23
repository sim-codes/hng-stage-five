'use client';

import { useState } from "react";
import { OutlineButton, PrimaryButton } from "@/app/ui/buttons";
import getStaterdIcon from '@/public/icons/started.svg';
import Image from 'next/image';

export default function LinksComponent() {
    // const [disabled, setDisabled] = useState(true);

    return (
        <div className="space-y-0 m-5 rounded-lg">
            <div className="min-h-[70vh] rounded-t-lg p-6 space-y-5">
                <div className="flex flex-col gap-10">
                    <div className="space-y-3">
                        <h1 className='font-bold text-2xl text-black'>Customize your links</h1>
                        <p className="text-md text-darkGrey">Add/edit/remove links below and then share all your profiles with the world!</p>
                    </div>
                    <OutlineButton className="w-full flex items-center justify-center">+ Add new link</OutlineButton>
                </div>

                <div className="text-center bg-grey/20 p-5 rounded-xl gap-5">
                    <div className="w-full flex items-center justify-center">
                        <Image src={getStaterdIcon} alt="Get Started" />
                    </div>
                    <h1 className='font-bold text-2xl text-black'>
                        Let&lsquo;s get you started
                    </h1>
                    <p className="text-md text-darkGrey">
                    Use the “Add new link” button to get started. Once you have more than one link, you can reorder and edit them. We’re here to help you share your profiles with everyone!
                    </p>
                </div>
            </div>

            <div className="rounded-b-lg w-full flex justify-end border-t p-6">
                <PrimaryButton className="w-full flex justify-center" disabled>Save changes</PrimaryButton>
            </div>
        </div>
    )
}