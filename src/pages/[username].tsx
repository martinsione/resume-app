import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import type { User } from "@prisma/client";
import type { Session } from "@api/auth/types";

import { useState } from "react";
import Link from "next/link";
import { getSession } from "next-auth/react";

import UserPopupForm from "@components/UserPopupForm";
import Timeline from "@components/Timeline";
import ExternalLink from "@components/ExternalLink";
import Avatar from "@components/Avatar";

interface Props {
  user: User | null;
  session: Session;
}

export default function Profile(props: Props) {
  const { session } = props;
  const [user, setUser] = useState(props.user);

  return (
    <div>
      {user ? (
        <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-6 sm:py-12">
          <div className="flex items-center gap-4">
            <div>
              <Avatar alt={user.name || ""} size="92px" src={user.image || ""} />
            </div>
            <div>
              <h2 className="sm:text-xl">{user.name}</h2>
              <p className="text-sm leading-6 sm:text-base">{user.occupation}</p>
              {user.portfolio && (
                <ExternalLink className="text-sm text-zinc-500" href={user.portfolio}>
                  {user.portfolio.replace(/^https?:\/\//, "")}
                </ExternalLink>
              )}
            </div>
          </div>
          <div>
            <h4>About</h4>
            <p className="text-sm">{user.bio}</p>
          </div>
          <div>
            <h4 className="mb-4">Experience</h4>
            <div className="flex flex-1 flex-col gap-5">
              <Timeline
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quam maiores modi nobis ipsa magnam sequi suscipit fugit laborum porro culpa."
                href="https://martinsione.com"
                started={2020}
                title="Senior software engineer at Google"
              />
              <Timeline
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti sed excepturi iste, quod eos minus."
                ended={2020}
                started={2018}
                title="Semi-Senior software engineer at Facebook"
              />
              <Timeline ended={2018} started={2017} title="Junior web developer" />
            </div>
          </div>

          <div>
            <h4 className="mb-4">Education</h4>

            <div className="flex flex-1 flex-col gap-5">
              <Timeline
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti sed excepturi iste, quod eos minus."
                ended={2015}
                started={2011}
                title="Computer Science at MIT"
              />
              <Timeline ended={2005} started={2010} title="High school" />
            </div>
          </div>
          {session?.user?.username === user.username && (
            <div className="fixed bottom-0 mb-10">
              <UserPopupForm setUser={setUser} user={user} />
            </div>
          )}
        </div>
      ) : (
        <div className="flex h-screen flex-col items-center justify-center gap-8">
          <p className="text-2xl font-semibold sm:text-3xl">User not found</p>
          <Link href="/">
            <a className="rounded bg-gray-100 px-6 py-3 font-bold hover:opacity-80 dark:bg-gray-900 md:text-lg">
              Return Home
            </a>
          </Link>
        </div>
      )}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  let user: User | null = null;
  if (ctx.params?.username) {
    try {
      const username = ctx.params.username.toString();
      user = await prisma.user.findUnique({ where: { username } });
    } catch (e: any) {
      if (e.msg) {
        console.error(e.msg);
      }
    }
  }

  const session = await getSession(ctx);
  return { props: { user, session } };
};
