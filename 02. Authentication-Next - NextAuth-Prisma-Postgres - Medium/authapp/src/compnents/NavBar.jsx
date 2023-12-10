import Link from "next/link";
import React from "react";

const Test = () => {
  return (
    <div className="">
      <div className="flex justify-between">
        <div>
          <Link href={"/"}>Home</Link>
        </div>
        <div
          className="flex flex-row gap-4"
          style={{ width: "400px", justifyContent: "flex-end" }}
        >
          <Link href={"/signup"}>SignUp</Link>
          <Link href={"/login"}>LogIn</Link>
        </div>
      </div>
    </div>
  );
};

export default Test;
