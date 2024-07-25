'use client';

import { useEffect, useState } from "react";
import { useLinks } from "@/app/context/links";
import PreviewSection from '@/app/ui/profile/preview';
import { db, auth } from "@/app/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import clsx from 'clsx';
import { Option, LinkProps } from "@/app/lib/definitions";
import { optionsWhite } from '@/app/lib/data';

export default function Page({ params }: { params: { id: string } }){
    const {  previewData, setPreviewData } = useLinks();
    const [ data, setData ] = useState<LinkProps[]>([]);

    const user_id = params.id;

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

    console.log('User ID:', user_id);
    console.log('Data:', data);

    return (
        <main className="w-full p-5">
            <div className="flex items-center justify-between gap-5">
                <Link href="/" className='w-full sm:w-[12vw] text-center bg-white border border-primary rounded-lg p-3 text-primary'>Back to Editor</Link>
                <Link href="/" className='w-full sm:w-[10vw] text-center border border-primary rounded-lg p-3 text-white bg-primary'>Share Link</Link>
            </div>
            <div className="p-5 flex flex-col items-center justify-center mt-5 gap-5">
                <div className="animate-pulse self-stretch flex flex-col items-center justify-start gap-6">
                    <div className="w-24 h-24 rounded-full bg-gray-200" />
                    <div className="flex flex-col items-center justify-start gap-3">
                        <div className="w-40 h-4 rounded-full bg-gray-200" />
                        <div className="w-[72px] h-2 rounded-full bg-gray-200" />
                    </div>
                </div>
                <div className="flex flex-col gap-5 justify-center items-center">
                {
                    previewData.map((link, index) => (
                        <div
                            key={index}
                            className={clsx(
                            'w-[237px] rounded-lg p-3 h-auto flex items-center justify-between',
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
                        </div>
                    ))
                }
                </div>
            </div>
        </main>
    )
}