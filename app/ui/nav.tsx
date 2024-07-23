import logoIcon from '@/public/icons/logo.svg';
import Image from 'next/image';
import { Eye, Link as LinkIcon, UserCircle } from 'lucide-react';

export default function Nav() {
    return (
        <div className="w-full ">
            <div className="flex items-center justify-between p-5">
                <div className="flex items-center gap-2">
                    <Image src={logoIcon} alt="logo" width={40} height={40} />
                </div>
                <div className="grid grid-cols-2 gap-5 w-[148px]">
                    <LinkIcon size={24} />
                    <UserCircle size={24} />
                </div>
                <div className="">
                    <span>Preview</span>
                </div>
            </div>
        </div>
    )
}