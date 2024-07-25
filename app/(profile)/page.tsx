'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import LinksComponent from "@/app/ui/profile/links";
import { useRouter } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from 'next/link';
import logoIcon from '@/public/icons/logo.svg';
import { Eye, Link as LinkIcon, UserCircle } from 'lucide-react';
import Logo from "../ui/logo";
import Details from "@/app/ui/profile/details";
import PreviewSection from '@/app/ui/profile/preview';
import { useLinks } from "@/app/context/links";
import { useSession } from 'next-auth/react';
import SignOutButton from "@/app/ui/signout";


export default function Home() {
  const router  = useRouter();
  const { user, previewData } = useLinks();
  const { data: session } = useSession();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (!session) {
        window.location.replace('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [session]);

  if (isLoading) {
    return <div>Loading...</div>;
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
              <div className="flex gap-2">
              <SignOutButton />
              <Link href={`/${session?.user.id}/preview`} className="border border-primary text-primary py-2 px-5 inline-flex rounded-lg">
                  <Eye size={18} className="inline-block sm:hidden" />
                  <span className='hidden sm:inline-block font-medium'>Preview</span>
              </Link>
              </div>
          </div>
        </div>
        <div className="block lg:grid lg:grid-cols-5">
          <div className="hidden lg:inline-block w-full col-span-2 bg-white rounded-lg m-5">
              <PreviewSection />
          </div>
          <div className="col-span-3 bg-white lg:p-5">
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
