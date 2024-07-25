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


export type FirebaseUser = {
    uid: string;
    email: string | null;
    displayName: string | null;
    photoURL: string | null;
    emailVerified: boolean;
    phoneNumber: string | null;
    isAnonymous: boolean;
    metadata: {
      creationTime?: string;
      lastSignInTime?: string;
    };
    providerData: Array<{
      providerId: string;
      uid: string;
      displayName: string | null;
      email: string | null;
      phoneNumber: string | null;
      photoURL: string | null;
    }>;
  };
