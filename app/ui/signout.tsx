'use client';

import { useLinks } from "@/app/context/links";
import { PrimaryButton } from '@/app/ui/buttons';
import { auth } from '@/app/firebase/config';
import { signOut as nextAuthSignOut } from 'next-auth/react';
import { signOut as firebaseSignOut } from 'firebase/auth';

const SignOutButton = () => {

  const { user } = useLinks();
  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      if (user) {
        await firebaseSignOut(auth);
      }
      console.log('Signed out from Firebase');
  
      // Sign out from NextAuth
      await nextAuthSignOut({ callbackUrl: '/' });
      console.log('Signed out from NextAuth');
    } catch (error) {
      console.error('Error during sign out:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <PrimaryButton onClick={handleSignOut}>
      Sign Out
    </PrimaryButton>
  );
};

export default SignOutButton;