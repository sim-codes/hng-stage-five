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
import PreviewSection from '@/app/ui/profile/preview';
import { Option } from "../lib/definitions";
import { useLinks } from "@/app/context";


export default function Home() {
  const router  = useRouter();
  const { user, previewData } = useLinks();


  // let userSession;

  // if (typeof window !== 'undefined') {
  //   userSession = sessionStorage.getItem('user');
  // }

  if (!user) {
    router.push('/login');
    return;
  }



  return (
    <main className="">
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
              <div className="border border-primary text-primary py-2 px-5 inline-flex rounded-lg">
                  <Eye size={18} className="inline-block sm:hidden" />
                  <span className='hidden sm:inline-block font-medium'>Preview</span>
              </div>
          </div>
        </div>
        <div className="block lg:grid lg:grid-cols-5">
          <div className="hidden lg:inline-block w-full col-span-2 bg-white rounded-lg m-5">
              <PreviewSection links={previewData} />
          </div>
          <div className="col-span-3 bg-white p-5">
            <TabsContent value="links">
              <LinksComponent />
            </TabsContent>
            <TabsContent value="details">
              <Details />
            </TabsContent>
          </div>
        </div>
      </Tabs>
    </main>
  );
}
