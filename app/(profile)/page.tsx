'use client';

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import LinksComponent from "@/app/ui/profile/links";
import { auth } from '@/app/firebase/config';
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import logoIcon from '@/public/icons/logo.svg';
import { Eye, Link as LinkIcon, UserCircle } from 'lucide-react';
import Logo from "../ui/logo";
import Details from "@/app/ui/profile/details";


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
              <Link href='/' className="flex items-center gap-2 sm:hidden">
                  <Image src={logoIcon} alt="logo" width={40} height={40} />
              </Link>
              <div className="hidden sm:inline-block">
                <Logo />
              </div>
              <div className="min-w-[148px]">
                <TabsList>
                  <TabsTrigger value="links" className="sm:px-7">
                    <LinkIcon size={18} />
                    <span className="hidden sm:inline-block font-bold">Links</span>
                  </TabsTrigger>

                  <TabsTrigger value="details">
                    <UserCircle size={18} />
                    <span className="hidden sm:inline-block font-bold">Profile Details</span>
                  </TabsTrigger>
                </TabsList>
              </div>
              <div className="border border-primary text-primary py-3 px-4 inline-flex rounded-lg">
                  <Eye size={18} className="inline-block sm:hidden" />
                  <span className='test-primary font-medium'>Preview</span>
              </div>
          </div>
        </div>
        <TabsContent value="links">
          <LinksComponent />
        </TabsContent>
        <TabsContent value="details">
          <Details />
        </TabsContent>
      </Tabs>

      {/* <PrimaryButton onClick={() => {
        signOut(auth)
        sessionStorage.removeItem('user');
        }}>Logout
      </PrimaryButton> */}
    </main>
  );
}
