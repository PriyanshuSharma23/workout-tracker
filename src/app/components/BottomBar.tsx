"use client";

import {
  SignedIn,
  SignedOut,
  UserButton,
  SignInButton,
  useUser,
} from "@clerk/nextjs";

export default function BottomBar() {
  const { isSignedIn, user, isLoaded } = useUser();

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  if (!isSignedIn) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 flex justify-center items-center gap-2 border-t border-gray-700 bg-gray-800">
      <SignedIn>
        <div className="flex items-center gap-2">
          <UserButton />
          <span>
            Hello{" "}
            {user?.firstName ||
              user?.primaryEmailAddress?.emailAddress ||
              "User"}
            !
          </span>
        </div>
      </SignedIn>
      <SignedOut>
        <SignInButton mode="modal" />
      </SignedOut>
    </div>
  );
}
