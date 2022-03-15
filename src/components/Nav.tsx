import { useRouter } from "next/router";
import { HiOutlineLogout, HiOutlineUserCircle } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import cl from "@lib/cl";
import Avatar from "./Avatar";
import Signin from "./LoginPopup";

interface Props {
  src: string;
  alt: string;
  userId: string | null;
}

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/jobs", label: "Jobs" },
];

export default function Nav({ alt, src, userId }: Props) {
  const { asPath: pathname } = useRouter();
  return (
    <div className="border-b border-zinc-200">
      <div className="mx-auto flex max-w-3xl items-center justify-between py-2 px-4">
        <div className="space-x-4">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href}>
              <a
                className={cl(
                  pathname === link.href
                    ? "font-semibold text-gray-800 dark:text-gray-200"
                    : "font-normal text-gray-600 dark:text-gray-400",
                  "rounded-lg p-1 transition-all hover:bg-gray-200 dark:hover:bg-gray-800 sm:px-3 sm:py-2"
                )}
              >
                {link.label}
              </a>
            </Link>
          ))}
        </div>

        {userId ? (
          <Menu as="div" className="relative ml-3">
            <Menu.Button className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-300">
              <Avatar alt={alt} size="48px" src={src} />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="absolute right-0 mt-2 w-48 rounded-md bg-white py-1 shadow-lg">
                <Menu.Item>
                  <Link href={`/${userId}`}>
                    <a className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      <HiOutlineUserCircle className="text-lg" /> View profile
                    </a>
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <button
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => signOut()}
                  >
                    <HiOutlineLogout className="text-lg" /> Logout
                  </button>
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        ) : (
          <Signin />
        )}
      </div>
    </div>
  );
}
