'use client';

import Image from "next/image";
import { useAuthState } from "react-firebase-hooks/auth";
import LinksComponent from "@/app/ui/profile/links";
import { auth } from '@/app/firebase/config';
import { signOut } from 'firebase/auth';
import { PrimaryButton } from "../ui/button";
import { useRouter } from "next/navigation";


export default function Home() {
  const [ user ] = useAuthState(auth);
  const router  = useRouter();
  const userSession = sessionStorage.getItem('user');

  if (!user && !userSession) {
    router.push('/login');
    return;
  }

  return (
    <main className="flex">
      <h1>Homepage</h1>
      <div className="">
        <PrimaryButton onClick={() => {
          signOut(auth)
          sessionStorage.removeItem('user');
          }}>Logout</PrimaryButton>
      </div>
      <LinksComponent />
    </main>
  );
}
