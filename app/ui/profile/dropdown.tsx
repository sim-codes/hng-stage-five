'use client';
import React, { useState, ChangeEvent } from 'react';
import GithubIcon from '@/public/icons/github.svg';
import TwitterIcon from '@/public/icons/twitter.svg';
import LinkedinIcon from '@/public/icons/linkedin.svg';
import FrontendIcon from '@/public/icons/frontendmentor.svg';
import TwitchIcon from '@/public/icons/twitch.svg';
import FacebookIcon from '@/public/icons/facebook.svg';
import YoutubeIcon from '@/public/icons/youtube.svg';
import CodewarsIcon from '@/public/icons/codewars.svg';
import DevtoIcon from '@/public/icons/devto.svg';
import GitlabIcon from '@/public/icons/gitlab.svg';
import FreecodecampIcon from '@/public/icons/freecodecamp.svg';
import CodepenIcon from '@/public/icons/codepen.svg';
import StackoverflowIcon from '@/public/icons/stackoverflow.svg';
import HashnodeIcon from '@/public/icons/hashnode.svg';

import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import Github from 'teenyicons/solid/github.svg';

interface Option {
    value: string;
    label: string;
    icon: string;
}

const options: Option[] = [
    { value: 'github', label: 'Github',
        icon: GithubIcon,
     },
     { value: 'frontendmentor', label: 'Frontend Mentor',
        icon: FrontendIcon,
     },
    { value: 'twitter', label: 'Twitter',
        icon: TwitterIcon,
     },
    { value: 'linkedin', label: 'LinkedIn',
        icon: LinkedinIcon,
     },
    { value: 'youtube', label: 'YouTube',
        icon: YoutubeIcon,
     },
    { value: 'facebook', label: 'Facebook',
        icon: FacebookIcon,
     },
    { value: 'twitch', label: 'Twitch',
        icon: TwitchIcon,
     },
    { value: 'dev', label: 'Dev.to',
        icon: DevtoIcon,
     },
    { value: 'codewars', label: 'Codewars',
        icon: CodewarsIcon,
    },
    { value: 'codepen', label: 'CodePen',
        icon: CodepenIcon,
     },
    { value: 'freecodecamp', label: 'freeCodeCamp',
        icon: FreecodecampIcon,
    },
    { value: 'gitlab', label: 'GitLab',
        icon: GitlabIcon,
    },
    { value: 'hashnode', label: 'Hashnode',
        icon: HashnodeIcon,
     },
    { value: 'stackoverflow', label: 'Stack Overflow',
        icon: StackoverflowIcon,
    },
];

export default function Dropdown() {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);

    const toggleDropdown = () => setIsOpen(!isOpen);

    const selectOption = (option: Option) => {
        setSelectedOption(option);
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
                    <Image src={selectedOption.icon} alt={selectedOption.label} width={18} height={18} />
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
                    <Image src={option.icon} alt={option.label} width={18} height={18} className='text-red' />
                    <span className="ml-2">{option.label}</span>
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}