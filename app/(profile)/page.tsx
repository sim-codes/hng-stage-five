'use client';

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import LinksComponent from "@/app/ui/profile/links";
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { PrimaryButton } from "../ui/buttons";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import logoIcon from '@/public/icons/logo.svg';
import { Eye, Link as LinkIcon, UserCircle } from 'lucide-react';


export default function Home() {
  const [ user ] = useAuthState(auth);
  const router  = useRouter();
  let userSession;

  if (typeof window !== 'undefined') {
    userSession = sessionStorage.getItem('user');
  }

  if (!user && !userSession) {
    router.push('/login');
    return;
  }

  return (
    <main className="flex flex-col gap-5">
      <Tabs defaultValue="links" className="w-full">
        <div className="bg-white">
          <div className="flex items-center justify-between p-5">
              <Link href='/' className="flex items-center gap-2">
                  <Image src={logoIcon} alt="logo" width={40} height={40} />
              </Link>
              <div className="min-w-[148px]">
                <TabsList>
                  <TabsTrigger value="links" className="sm:px-7">
                    <LinkIcon size={18} />
                    <span className="hidden sm:inline-block font-bold">Links</span>
                  </TabsTrigger>

                  <TabsTrigger value="user">
                    <UserCircle size={18} />
                    <span className="hidden sm:inline-block font-bold">Profile Details</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="border border-primary text-primary py-3 px-4 inline-flex rounded-lg">
                  <Eye size={18} />
              </div>
          </div>
        </div>
        <TabsContent value="links">
          <LinksComponent />
        </TabsContent>
        <TabsContent value="password">Change your password here.</TabsContent>
      </Tabs>

      {/* <PrimaryButton onClick={() => {
        signOut(auth)
        sessionStorage.removeItem('user');
        }}>Logout
      </PrimaryButton> */}
    </main>
  );
}
