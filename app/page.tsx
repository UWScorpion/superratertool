import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { auth, signOut } from "./auth";
import { notFound } from "next/navigation";
import Image from "next/image";
import { AiOutlineLogout } from "react-icons/ai";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();
  if (!session) redirect('/login');
  return (
    <div>
      {session.user && (
        <div className="flex justify-end mt-4 mr-6">
          <div className="mt-2">Hello, {session.user.name}</div>
          <Image
            src={session.user.image!}
            alt="profile picture"
            width={30}
            height={30}
            className="object-cover ml-5 rounded-full"
          />
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="submit"
                    className="ml-6 mt-4 mr-4 px-1 bg-gray-100 rounded-md hover:bg-gray-200 active:scale-95 transition-transform duration-200"
                  >
                    <AiOutlineLogout />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Signout?</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </form>
        </div>
      )}
      <div className="flex justify-center">
        <div className="text-4xl mt-[20vh]">
          <div>Welcome to Core Machine Learning Group</div>
          <div className="flex flex-row justify-center mt-[25vh]">
            {/* <div className="mr-3">
            <Link
              href="/roster"
              className={buttonVariants({ variant: "outline" })}
            >
              Roster
            </Link>
          </div> */}
            <div className="mr-3">
              <Link
                href="/srroster"
                className={
                  buttonVariants({ variant: "outline" }) + " hover:bg-gray-200"
                }
              >
                Roster
              </Link>
            </div>
            <div>
              <Link
                href="/activeprojects"
                className={
                  buttonVariants({ variant: "outline" }) + " hover:bg-gray-200"
                }
              >
                Active Project
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
