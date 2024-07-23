'use client';

import React, { useState, ChangeEvent, useEffect } from 'react';
import Dropdown from "@/app/ui/profile/dropdown";
import { Link as LinkIcon } from "lucide-react";
import linkMenuIcon from '@/public/icons/linkMenu.svg';
import Image from 'next/image';
import { Option, LinkCardProps } from '@/app/lib/definitions';

const LinkCard: React.FC<LinkCardProps> = ({ index, link, handleLinkChange, removeLink }) => {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    useEffect(() => {
        if (link.platform) {
            setSelectedOption({ value: link.platform, label: link.platform, icon: '' });
        }
    }, [link]);

    const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
        handleLinkChange(index, selectedOption?.value || 'github', e.target.value);
    };

    const handlePlatformChange = (option: Option | null) => {
        setSelectedOption(option);
        if (option) {
            handleLinkChange(index, option.value, link.url);
        }
    };

    return (
        <div className="bg-grey/20 p-5 rounded-xl gap-5">
            <div className="flex justify-between text-darkGrey">
                <span className='font-bold flex gap-2'>
                    <Image src={linkMenuIcon} alt="Hamburger icon" />
                    Link #{index+1}
                </span>
                <button onClick={removeLink}>Remove</button>
            </div>
            <div className="text-sm">
                <div>
                    <label
                    className="mb-3 mt-5 block font-normal"
                    htmlFor="dropdown"
                    >
                    Platform
                    </label>
                    <div className="relative">
                        <Dropdown selectedOption={selectedOption} setSelectedOption={handlePlatformChange} />
                    </div>
                </div>
                <div className="">
                    <label
                    className="mb-3 mt-5 block font-normal"
                    htmlFor="link"
                    >
                    Link
                    </label>
                    <div className="relative">
                        <input
                            className="peer z-0 block w-full rounded-md border border-grey py-3 px-4 pl-10 text-sm autofill:bg-white placeholder:text-darkGrey focus:outline-none shadow-none transition-all focus:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] focus:border-primary"
                            id="link"
                            type="text"
                            name="link"
                            placeholder="e.g. https://www.github.com/simcodes"
                            value={link.url}
                            onChange={handleUrlChange}
                            required
                        />
                        <LinkIcon size={18}
                        className="pointer-events-none text-darkGrey absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LinkCard;
