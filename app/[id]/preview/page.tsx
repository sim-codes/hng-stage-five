'use client';

import { useEffect, useState } from "react";
import { useLinks } from "@/app/context/links";
import { db, auth } from "@/app/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Option, LinkProps } from "@/app/lib/definitions";
import { optionsWhite } from '@/app/lib/data';
import { useToast } from "@/components/ui/use-toast";


export default function Page({ params }: { params: { id: string } }){
    const {  user, previewData, setPreviewData, selectedImage, links } = useLinks();
    const [ data, setData ] = useState<LinkProps[]>([]);
    const { toast } = useToast()
    
    const user_id = params.id;

    const handleCopy = async () => {
        try {
            const currentUrl = window.location.href;
            await navigator.clipboard.writeText(currentUrl);
            toast({
                description: 'The link has been copie to your clip board.',
            });
            console.log('Link copied to clipboard!');
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
        };


    useEffect(() => {
        const loadLinksFromFirestore = async (userId: string) => {
            if (!userId) return;
            const userDocRef = doc(db, "users", userId);
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setData(data.links || []);
                } else {
                    console.log("No such document!");
                    return [];
                }
            } catch (error) {
                console.error("Error loading data: ", error);
                return [];
            } finally {
            }
        };

        loadLinksFromFirestore(user_id)
    }, [user_id]);

    useEffect(() => {
        setPreviewData(data.map(link => optionsWhite.find(option => option.value === link.platform) || { value: '', label: '', icon: '' }));
    }, [setPreviewData, data]);

    return (
        <main className="relative w-full p-5 max-w-screen overflow-x-hidden h-screen">

            <div className="h-[40vh] w-full bg-primary hidden sm:inline-block absolute -z-0 top-0 left-0 rounded-b-3xl" />

            <div className="absolute z-20 w-full left-0">
            <div className="flex items-center justify-between gap-5 p-3 rounded-lg w-full sm:w-[90%] mx-auto bg-white my-5">
                <Link href="/" className='w-full sm:max-w-[20vw] text-center bg-white border border-primary rounded-lg p-3 text-primary'>Back to Editor</Link>
                <button onClick={handleCopy} className='w-full sm:max-w-[15vw] text-center border border-primary rounded-lg p-3 text-white bg-primary'>Share Link</button>
            </div>
            <div className="p-5 mt-5">
                <div className="flex flex-col items-center justify-center bg-white w-[349px] mx-auto rounded-2xl gap-5 px-14 py-12 shadow-[0px_0px_32px_rgba(0,_0,_0,_0.1)]">
                <div className="w-full flex flex-col items-center justify-center">
                    <div className="relative w-28 h-28 rounded-full bg-grey overflow-hidden">
                        <Image src={selectedImage || '/avatar.png'}
                            alt="Background rectangle" layout="fill"
                            objectFit="cover" />
                    </div>
                    <span className="text-xl font-bold">{
                        user?.displayName ? user.displayName : 'User Name'
                    }</span>
                    <span className="text-sm">
                        {
                            user?.email ? user.email : 'ben@email.com'
                        }
                    </span>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center w-full">
                {
                    previewData.length === 0 ? (
                        <div className="flex flex-col items-start justify-start gap-7 animate-pulse">
                            <div className="w-[237px] h-11 rounded-lg bg-grey" />
                            <div className="w-[237px] h-11 rounded-lg bg-grey" />
                            <div className="w-[237px] h-11 rounded-lg bg-grey" />
                            <div className="w-[237px] h-11 rounded-lg bg-grey" />
                            <div className="w-[237px] h-11 rounded-lg bg-grey" />
                        </div>
                    ) : (
                        previewData.map((link, index) => (
                            <Link
                                href={`https://${data[index]?.url}`}
                                key={index}
                                className={clsx(
                                'w-full rounded-lg p-3 h-auto flex items-center justify-between',
                                {
                                    'text-darkGrey border border-darkGrey': link.value === 'frontendmentor',
                                    'text-white': link.value !== 'frontendmentor',
                                }
                                )}
                                style={{ backgroundColor: link.color }}
                            >
                                <div className="flex gap-2 items-center">
                                    <Image src={link.icon || '/icons/white/github.svg'} alt="Background rectangle" width={18} height={18} />
                                    <span className="text-md">{link.label}</span>
                                </div>
                                <ArrowRight size={24} />
                            </Link>
                        ))
                    )
                }
                </div>
                </div>
            </div>
            </div>
        </main>
    )
}