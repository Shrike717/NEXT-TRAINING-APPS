"use client";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

export function NavBar() {
  const { data: session } = useSession();
  // console.log('[NavBar] session: ', session);

  //   if (session) {
  //     return (
  //       <nav className="mb-32 flex h-[60px] w-1/2 flex-row items-center justify-between">
  //         <Link href={"/"}>Home</Link>
  //         <div className={"flex flex-row items-center gap-8"}>
  //           <div className="flex flex-row items-center justify-center gap-2">
  //             <img
  //               className={"h-[30px] w-[30px] rounded-[50%] "}
  //               alt={"Profilbild"}
  //               src={session.user.image}
  //             />
  //             <span>{session.user.name}</span>
  //           </div>
  //           <button
  //             onClick={() => {
  //               signOut();
  //             }}
  //           >
  //             Sign out
  //           </button>
  //         </div>
  //       </nav>
  //     );
  //   }
  return (
    <nav className="mb-32 flex h-[60px] w-1/2 flex-row items-center justify-between ">
      <Link href={"/"}>Home</Link>
      <div className="flex w-48 flex-row items-center">
        <Link href={"/signup"}>SignUp</Link>
        <Link href={"/login"}>LogIn</Link>
      </div>
    </nav>
  );
}
