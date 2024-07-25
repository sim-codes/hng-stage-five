'use client';

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/app/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { OutlineButton, PrimaryButton } from "@/app/ui/buttons";
import getStartedIcon from '@/public/icons/started.svg';
import Image from 'next/image';
import LinkCard from '@/app/ui/profile/linkCard';
import { useLinks } from "@/app/context/links";

interface Link {
    platform: string;
    url: string;
}

export default function LinksComponent() {
    const { links, addLink, handleLinkChange, removeLink, handleSave, loading } = useLinks();
    const [user] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="space-y-0 m-5 rounded-lg h-full w-full">
            <div className="rounded-t-lg px-6 space-y-5">
                <div className="flex flex-col gap-10">
                    <div className="space-y-3">
                        <h1 className='font-bold text-2xl text-black'>Customize your links</h1>
                        <p className="text-md text-darkGrey">Add/edit/remove links below and then share all your profiles with the world!</p>
                    </div>
                    <OutlineButton onClick={addLink} className="w-full flex items-center justify-center">
                        + Add new link
                    </OutlineButton>
                </div>

                {links.length === 0 ? (
                    <div className="text-center flex flex-col items-stretch justify-center bg-grey/10 px-5 py-14 rounded-xl gap-10">
                        <div className="w-[40vw] mx-auto sm:w-full flex items-center justify-center">
                            <Image src={getStartedIcon} alt="Get Started" className="w-full" />
                        </div>
                        <h1 className='font-bold text-2xl text-black'>
                            Let&apos;s get you started
                        </h1>
                        <p className="text-md text-darkGrey">
                            Use the &quot;Add new link&quot; button to get started. Once you have more than one link, you can reorder and edit them. We&pos;re here to help you share your profiles with everyone!
                        </p>
                    </div>
                ) : (
                    links.map((link, index) => (
                        <LinkCard
                            key={index}
                            index={index}
                            link={link}
                            handleLinkChange={handleLinkChange}
                            removeLink={() => removeLink(index)}
                        />
                    ))
                )}
            </div>

            <div className="rounded-b-lg w-full flex justify-end border-t p-6">
                <PrimaryButton
                    onClick={handleSave}
                    className="w-full flex justify-center lg:w-[10vw] lg:self-end"
                    disabled={links.length === 0}
                >
                    Save
                </PrimaryButton>
            </div>
        </div>
    );
}
