import {
  ArrowRightIcon,
  GitHubLogoIcon,
  LockClosedIcon,
  VideoIcon,
} from "@radix-ui/react-icons";
import {
  CloudUploadIcon,
  FingerprintIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

const features = [
  {
    name: "Real-Time Collaboration",
    description:
      "Code together in real-time with other developers. Share your screen, edit code simultaneously, and solve problems as a team, enhancing productivity and learning.",
    icon: UsersIcon,
  },
  {
    name: "Instant Code Sharing",
    description:
      "Share your code snippets or entire projects instantly with a single click. Perfect for quick demonstrations, code reviews, or seeking help from the community.",
    icon: CloudUploadIcon,
  },
  {
    name: "Secure Streaming Environment",
    description:
      "Stream your coding sessions in a secure, encrypted environment. Control who can view and interact with your streams, ensuring your intellectual property remains protected.",
    icon: LockClosedIcon,
  },
  {
    name: "Interactive Learning",
    description:
      "Learn by doing with our interactive coding challenges and tutorials. Get real-time feedback on your code and improve your skills through hands-on practice.",
    icon: FingerprintIcon,
  },
  {
    name: "Cross-Platform Compatibility",
    description:
      "Access your coding environment from any device. Whether you're on a desktop, tablet, or mobile, your development workspace is always at your fingertips.",
    icon: ArrowRightIcon,
  },
];

export default function AdvantagesSection() {
  return (
    <div className="bg-white dark:bg-black py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Why Choose Echo?
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Revolutionize Your Coding Journey
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-white">
            Discover a new dimension of programming with our innovative
            platform. We offer unique features that transform the way you code,
            learn, and collaborate. From interactive live streams to AI-powered
            code assistance, we're redefining what's possible in the world of
            software development.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                    <feature.icon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 dark:text-white text-gray-600">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
