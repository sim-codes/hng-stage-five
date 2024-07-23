'use client';

import React, { useState, ChangeEvent } from 'react';
import GithubIcon from '@/public/icons/github.svg';
import { options } from '@/app/lib/data';
import { Option, DropdownProps } from '@/app/lib/definitions';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';

const Dropdown: React.FC<DropdownProps> = ({selectedOption, setSelectedOption}) => {
    const [isOpen, setIsOpen] = useState(false);
    // const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option: Option) => {
        setSelectedOption(option);
        console.log('Icon url', option.icon)
        console.log('Gihub url', GithubIcon)
        setIsOpen(false);
    };

    return (
        <div className="w-full mx-auto text-darkGrey">
            <div
                className="flex items-center justify-between w-full rounded-md border border-grey py-3 px-4 bg-white focus:outline-none shadow-none transition-all active:shadow-[0px_0px_32px_rgba(99,_60,_255,_0.25)] active:border-primary cursor-pointer"
                // className="flex items-center justify-between w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-md cursor-pointer"
                onClick={toggleDropdown}
            >
                {selectedOption ? (
                <div className='flex items-center'>
                    <Image
                        src={selectedOption.icon}
                        alt={selectedOption.label}
                        width={18}
                        height={18}
                    />
                    <span className="ml-2">{selectedOption.label}</span>
                </div>
                ) : (
                    <div className='flex items-center'>
                        <Image src={GithubIcon} alt='Github Icon' width={18} height={18} />
                        <span className="ml-2">Github</span>
                    </div>
                )}
                <ChevronDown size={18} className='text-primary' />
            </div>
            {isOpen && (
                <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                {options.map((option) => (
                    <li
                    key={option.value}
                    className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => selectOption(option)}
                    >
                    <Image src={option.icon} alt={option.label} width={18} height={18} />
                    <span className="ml-2">{option.label}</span>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default Dropdown;
