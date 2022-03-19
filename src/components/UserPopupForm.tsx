import { HiOutlinePencilAlt } from "react-icons/hi";
import { useForm } from "react-hook-form";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import { User } from "@prisma/client";
import { Dialog, Transition } from "@headlessui/react";

import Textarea from "./Textarea";
import Input from "./Input";

function View({ children, id }: { id: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full flex-grow flex-col gap-3 p-6" id={id}>
      {children}
    </div>
  );
}

interface Props {
  user: User;
  setUser: (user: User) => void;
}

export default function UserPopupForm({ user, setUser }: Props) {
  const { register, watch, setValue } = useForm<User>();
  useEffect(() => {
    setValue("username", user.username);
    setValue("name", user.name);
    setValue("email", user.email);
    setValue("phone", user.phone);
    setValue("occupation", user.occupation);
    setValue("bio", user.bio);
    setValue("portfolio", user.portfolio);
    setValue("github", user.github);
    setValue("linkedin", user.linkedin);
  }, [setValue, user]);

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => {
    const values = watch();
    axios
      .put(`/api/users/${user.username}`, values)
      .then(({ data }) => setUser(data))
      .catch((err) => console.log(err));

    setIsOpen(false);
  };
  return (
    <>
      <button
        className="flex items-center justify-center gap-2 whitespace-nowrap rounded-3xl border border-zinc-200 bg-white py-3 px-4 font-medium shadow hover:shadow-lg"
        type="button"
        onClick={() => setIsOpen(true)}
      >
        <HiOutlinePencilAlt className="text-lg" />
        Edit profile
      </button>

      <Transition appear as={Fragment} show={isOpen}>
        <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={onClose}>
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
              <div className="inline-block w-full max-w-3xl transform overflow-hidden rounded-xl bg-white text-left align-middle shadow-xl">
                <div className="flex flex-col md:flex-row">
                  <div className="relative w-52 border-r border-gray-200 bg-gray-50">
                    <div className="fixed flex flex-col gap-2 p-6">
                      <Link href="#personal-info">
                        <a className="text-sm text-zinc-600 hover:text-black">1. Personal Info</a>
                      </Link>

                      <Link href="#links">
                        <a className="text-sm text-zinc-600 hover:text-black">2. Links</a>
                      </Link>

                      <Link href="#work-experience">
                        <a className="text-sm text-zinc-600 hover:text-black">3. Work experience</a>
                      </Link>

                      <Link href="#education">
                        <a className="text-sm text-zinc-600 hover:text-black">4. Education</a>
                      </Link>

                      <Link href="#personal-projects">
                        <a className="text-sm text-zinc-600 hover:text-black">
                          5. Personal Projects
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="max-h-[700px] flex-grow overflow-y-auto">
                    <View id="personal-info">
                      <div className="flex select-none items-center justify-between border-b border-gray-200 pb-2 text-xl">
                        <h4 className="">Personal Info</h4>
                      </div>
                      <Input required label="Username" {...register("username")} />
                      <Input required label="Name" {...register("name")} />
                      <Input required label="Email" {...register("email")} />
                      <Input label="Phone" placeholder="Contact number" {...register("phone")} />
                      <Input
                        label="Job title"
                        placeholder="Python backend developer"
                        {...register("occupation")}
                      />
                      <Textarea
                        label="About"
                        placeholder="Tell people about yourself"
                        {...register("bio")}
                      />
                    </View>

                    <View id="links">
                      <div className="flex select-none items-center justify-between border-b border-gray-200 pb-2 text-xl">
                        <h4 className="">Links</h4>
                      </div>
                      <Input
                        label="Portfolio"
                        placeholder="https://website.com"
                        {...register("portfolio")}
                      />
                      <Input
                        label="Github profile"
                        placeholder="https://github.com/username"
                        {...register("github")}
                      />
                      <Input
                        label="Linkedin profile"
                        placeholder="https://www.linkedin.com/in/username"
                        {...register("linkedin")}
                      />
                    </View>
                    <View id="work-experience">
                      <div className="flex select-none items-center justify-between border-b border-gray-200 pb-2 text-xl">
                        <h4 className="">Work Experience</h4>
                        <button
                          className="rounded-lg bg-black px-5 py-2 text-center text-sm text-white hover:bg-gray-900 focus:ring-4 focus:ring-gray-300 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
                          type="button"
                          onClick={() => console.log("Add new work experience")}
                        >
                          Add
                        </button>
                      </div>
                    </View>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
