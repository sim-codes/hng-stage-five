'use client';

import { useLinks } from "@/app/context";
import React from 'react';
import firstFrame from '@/public/firstframe.svg';
import secondFrame from '@/public/secondframe.svg';
import clsx from 'clsx';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Option } from '@/app/lib/definitions';


const PreviewSection = () => {
    const { user, previewData } = useLinks();

    return (
    <div className="">
        <div className="w-full relative h-auto flex items-center justify-center">
        <div className="relative w-full h-full">
            <Image src='/firstframe.svg' alt="Background rectangle" width={307} height={631} className='absolute z-0 left-24 top-3' />
            <Image src='/secondframe.svg' alt="Background rectangle" width={285} height={611} className='absolute z-10 left-[108px] top-5' />
            <div className="absolute z-20 left-44 top-16 self-stretch flex flex-col items-center justify-start gap-6">
                <div className="w-24 h-24 rounded-full bg-gray-200" />
                <div className="flex flex-col items-center justify-start gap-3">
                    <div className="w-40 h-4 rounded-full bg-gray-200" />
                    <div className="w-[72px] h-2 rounded-full bg-gray-200" />
                </div>
            </div>
            <div className="absolute z-20 top-60 left-[130px] flex flex-col items-start justify-start gap-5">
                {
                    previewData && (
                        previewData.length === 0 ? (
                            <div className="flex flex-col items-start justify-start gap-7">
                                <div className="w-[237px] h-11 rounded-lg bg-grey" />
                                <div className="w-[237px] h-11 rounded-lg bg-grey" />
                                <div className="w-[237px] h-11 rounded-lg bg-grey" />
                                <div className="w-[237px] h-11 rounded-lg bg-grey" />
                                <div className="w-[237px] h-11 rounded-lg bg-grey" />
                            </div>
                        ) : (
                            <div className="flex flex-col items-start justify-start gap-5">
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
                        )
                    )
                }
            </div>
        </div>
    </div>
    </div>
    );
};

export default PreviewSection;
