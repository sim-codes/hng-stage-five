// app/components/SignOutButton.tsx
'use client';

import { PrimaryButton } from '@/app/ui/buttons';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { auth } from '@/app/firebase/config';
import { signOut as firebaseSignOut } from 'firebase/auth';
import { useState } from 'react';

const SignOutButton = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSignOut = async () => {
    try {
      // Sign out from Firebase
      await firebaseSignOut(auth);

      // Sign out from NextAuth
      const result = await signOut({ redirect: false, callbackUrl: '/' });

      // Check if signOut was successful
      if (result?.url) {
        // Redirect to the URL returned by signOut
        router.push(result.url);
      } else {
        // If no URL is returned, redirect to home page
        router.push('/login');
      }
    } catch (error) {
      console.error('Error signing out:', error);
      setError('Failed to sign out. Please try again.');
    }
  };

  return (
    <PrimaryButton onClick={handleSignOut}>
      Sign Out
    </PrimaryButton>
  );
};

export default SignOutButton;