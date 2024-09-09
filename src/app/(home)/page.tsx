import AdvantagesSection from "@/components/global/advantages-section";
import FeaturesSection from "@/components/global/features-section";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section>
        <div className="h-[40rem] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
          <p className="text-4xl text-center sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
            Stream{" "}
            <span className="bg-clip-text animate-pulse text-transparent bg-gradient-to-r from-purple-400 to-violet-800 dark:from-amber-200 dark:to-amber-800">
              code
            </span>{" "}
            on the{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-amber-600 animate-pulse dark:from-violet-200 dark:to-violet-800">
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
            to help you build your{" "}
            <span className="bg-clip-text bg-gradient-to-r text-transparent dark:from-blue-200 dark:to-blue-800 from-blue-400 to-blue-900">
              project
            </span>
          </p>
          <Link href={"/browse-rooms"}>
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
      </section>
      <FeaturesSection />
      <AdvantagesSection />
      <section>
        <footer className="py-8 bg-gray-100 dark:bg-slate-950">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  © {new Date().getFullYear()} Echo. All rights reserved.
                </p>
              </div>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Terms
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  Contact
                </a>
              </div>
            </div>
          </div>
        </footer>
      </section>
    </main>
  );
}
