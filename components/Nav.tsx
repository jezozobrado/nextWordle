"use client";

import Link from "next/link";
import Image from "next/image";
// import { signIn, signOut, useSession, getPRoviders } from "next-auth/react";

const Nav = () => {
  const isUserLoggedIn = true;
  return (
    <nav className="flex justify-between items-start w-full mb-16 pt-6 px-32 gap-20">
      <Link className="flex gap-2 justify-center" href="/" id="logo">
        {/* <Image src="/next.svg" alt="Logo" width={30} height={30} /> */}
        <p>Wordletopia</p>
      </Link>
      <div className="flex gap-10 flex-grow font-semibold">
        <Link href="/wordle">Wordle</Link>
        <Link href="/four">Four</Link>
        <Link href="/contexto">Contexto</Link>
      </div>

      <Link href="/" className="black_btn">
        Sign Out
      </Link>
    </nav>
  );
};

export default Nav;
