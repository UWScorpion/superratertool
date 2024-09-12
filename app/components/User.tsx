import React from "react";
import { auth, signOut } from "../auth";
import { notFound } from "next/navigation";

const User = async () => {
  const session = await auth();
  if (!session) return notFound();
  return (
    <div className="flex justify-end mt-4 mr-6">
        <div>{session.user && session.user.name}</div>
      <form
      action={async () => {
        "use server";
        await signOut();
      }}
    >
      <button
        type="submit"
        className="bg-blue-100 px-6 py-2 rounded-md hover:bg-blue-400 active:scale-95 transition-transform duration-200"
      >
        Sign Out
      </button>
    </form>
    </div>
  );
};

export default User;
