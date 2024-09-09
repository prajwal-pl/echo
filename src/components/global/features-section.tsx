import { GitHubLogoIcon, VideoIcon } from "@radix-ui/react-icons";
import { ShieldCheckIcon } from "lucide-react";
import Image from "next/image";

const features = [
  {
    name: "Live Code Streaming",
    description:
      "Stream your coding sessions in real-time, allowing viewers to watch and learn as you work on projects.",
    icon: VideoIcon,
  },
  {
    name: "Secure Environment",
    description:
      "Our platform ensures a safe and secure environment for all users, protecting your code and personal information.",
    icon: ShieldCheckIcon,
  },
  {
    name: "GitHub Integration",
    description:
      "Seamlessly connect your GitHub repositories to showcase your projects and collaborate with others.",
    icon: GitHubLogoIcon,
  },
];

export default function FeaturesSection() {
  return (
    <div className="overflow-hidden dark:bg-black bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-center">
          <div className="lg:pr-8 lg:pt-4">
            <div className="lg:max-w-lg">
              <h2 className="text-base font-semibold leading-7 text-indigo-600">
                Stream with ease
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight dark:text-white text-gray-900 sm:text-4xl">
                Elevate your coding experience
              </p>
              <p className="mt-6 text-lg leading-8 dark:text-white text-gray-900">
                Our platform offers a seamless environment for developers to
                showcase their skills, collaborate on projects, and learn from
                each other in real-time. With advanced features and a supportive
                community, you can take your coding to the next level.
              </p>
              <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 dark:text-white text-gray-900 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.name} className="relative pl-9">
                    <dt className="inline font-semibold dark:text-white text-gray-900">
                      <feature.icon
                        aria-hidden="true"
                        className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                      />
                      {feature.name}
                    </dt>{" "}
                    <dd className="inline">{feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
          <div className="relative">
            <Image
              alt="Product screenshot"
              src="/home-page.png"
              width={2432}
              height={1442}
              className="w-[48rem] max-w-none rounded-xl shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem] md:-ml-4 lg:-ml-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
