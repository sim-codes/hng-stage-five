export interface Option {
    value: string;
    label: string;
    icon: string;
}

export interface LinkCardProps {
    index: number;
    link: {
        platform: string;
        url: string;
    };
    handleLinkChange: (index: number, platform: string, url: string) => void;
    removeLink: () => void;
}
export interface DropdownProps {
    selectedOption: Option | null;
    setSelectedOption: (option: Option | null) => void;
}
