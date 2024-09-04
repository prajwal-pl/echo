import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { auth, signIn } from "../../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <p className="text-4xl text-center sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
        <span className="text-zinc-950 dark:text-white">Stream</span>{" "}
        <span className="bg-gradient-to-r from-purple-400 to-violet-800 animate-pulse text-white dark:text-black">
          code
        </span>{" "}
        on the{" "}
        <span className="bg-gradient-to-r from-yellow-300 to-amber-600 animate-pulse text-white dark:text-black">
          best
        </span>{" "}
        <br />
        code streaming platform!
      </p>
      <p className="text-muted-foreground font-medium text-lg sm:text-xl text-center ">
        Find{" "}
        <span className="text-black dark:text-neutral-50">
          skilled developers
        </span>{" "}
        to help you build your project
      </p>
      <Link href={"/create-room"}>
        <button className="bg-slate-800 no-underline my-3 group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
            <span className="text-sm md:text-lg p-1">Get Started</span>
            <svg
              fill="none"
              height="16"
              viewBox="0 0 24 24"
              width="16"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.75 8.75L14.25 12L10.75 15.25"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
              />
            </svg>
          </div>
          <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-violet-800/90 to-amber-400/0 transition-opacity duration-500 group-hover:opacity-40" />
        </button>
      </Link>
    </div>
  );
}
