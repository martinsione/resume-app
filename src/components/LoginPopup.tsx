import { signIn } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function LoginPopup() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="rounded-lg bg-black px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        Login
      </button>

      <Transition appear as={Fragment} show={isOpen}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span aria-hidden="true" className="inline-block h-screen align-middle">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-xs transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="mb-4 text-lg text-gray-900">
                  Login to your account
                </Dialog.Title>
                <div className="flex flex-col gap-2">
                  <button
                    className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2 px-4 hover:shadow"
                    onClick={() => signIn("google")}
                  >
                    <FcGoogle className="text-xl" />
                    <p className="hover:text-black">Continue with Google</p>
                  </button>

                  <button
                    className="flex items-center justify-center gap-2 rounded-lg border border-zinc-200 py-2 px-4 hover:shadow"
                    onClick={() => signIn("github")}
                  >
                    <FaGithub className="text-xl" />
                    <p className="hover:text-black">Continue with Github</p>
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
