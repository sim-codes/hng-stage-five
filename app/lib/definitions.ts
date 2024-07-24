import { StaticImageData } from 'next/image';
export interface Option {
    value: string;
    label: string;
    icon: string | StaticImageData;
    color?: string;
}

export interface LinkProps {
    platform: string;
    url: string;
    icon?: string | StaticImageData;
}

export interface LinkCardProps {
    index: number;
    link: LinkProps,
    handleLinkChange: (index: number, platform: string, url: string) => void;
    removeLink: () => void;
}
export interface DropdownProps {
    selectedOption: Option | null;
    setSelectedOption: (option: Option | null) => void;
}

export interface PreviewSectionProps {
    value?: string;
    label?: string;
    icon?: string;
    color?: string;
}
