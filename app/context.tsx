'use client';

import { useState, useEffect, createContext, useContext } from 'react';
import  { Option, LinkProps } from '@/app/lib/definitions';
import { useAuthState } from "react-firebase-hooks/auth";
import { db, auth } from "@/app/firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useToast } from "@/components/ui/use-toast"
import { optionsWhite } from '@/app/lib/data';

interface LinksContextProps {
    user: any;
    links: LinkProps[];
    previewData: Option[];
    loading: boolean;
    addLink: () => void;
    removeLink: (index: number) => void;
    handleLinkChange: (index: number, platform: string, url: string) => void;
    handleSave: () => void;
}

const LinksContext = createContext<LinksContextProps | undefined>(undefined);

export function LinksProvider({ children }: Readonly<{ children: React.ReactNode}>){
    const { toast } = useToast()
    const [loading, setLoading] = useState(true);
    const [ previewData, setPreviewData ] = useState<Option[]>([]);
    const [user] = useAuthState(auth);
    const [links, setLinks] = useState<LinkProps[]>([]);

    useEffect(() => {
        const loadLinksFromFirestore = async () => {
            if (!user) return;
            setLoading(true);
            const userDocRef = doc(db, "users", user.uid);
            try {
                const docSnap = await getDoc(userDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setLinks(data.links || []);
                }
            } catch (error) {
                console.error("Error loading data: ", error);
            }
            setLoading(false);
        };

        loadLinksFromFirestore();
    }, [user]);

    // get preview data from links
    useEffect(() => {
        setPreviewData(links.map(link => optionsWhite.find(option => option.value === link.platform) || { value: '', label: '', icon: '' }));
    }, [links]);

    const addLink = () => {
        setLinks(prevLinks => [...prevLinks, { platform: '', url: '' }]);
        console.log(links);
    };

    const removeLink = (indexToRemove: number) => {
        setLinks(prevLinks => prevLinks.filter((_, index) => index !== indexToRemove));
    };

    const handleLinkChange = (index: number, platform: string, url: string) => {
        setLinks(prevLinks => prevLinks.map((link, i) =>
            i === index ? { platform, url } : link
        ));
    };

    const handleSave = async () => {
        if (!user) return;
        try {
            const userDocRef = doc(db, "users", user.uid);
            await setDoc(userDocRef, { links }, { merge: true });
            // Call the toast function directly
            toast({
                description: "Links saved successfully",
            });
            console.log("Links saved successfully");
        } catch (error) {
            console.error("Error saving links: ", error);
            // Add an error toast
            toast({
                description: "Error saving links",
                variant: "destructive"
            });
        }
    };

    return (
        <LinksContext.Provider
            value={{ user, links, addLink, removeLink, handleLinkChange, handleSave, loading, previewData }}
        >
            {children}
        </LinksContext.Provider>
    );
};

export function useLinks() {
    const context = useContext(LinksContext);
    if (context === undefined) {
        throw new Error('useLinks must be used within a LinksProvider');
    }
    return context;
}
