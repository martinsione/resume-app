import { GetStaticPaths, GetStaticProps } from "next";
import { User } from "@prisma/client";

import prisma from "@lib/prisma";
import Timeline from "@components/Timeline";
import ExternalLink from "@components/ExternalLink";
import Avatar from "@components/Avatar";

interface Props {
  user: User;
}

export default function Profile({ user }: Props) {
  return (
    <div className="mx-auto flex max-w-2xl flex-col gap-10 px-6 py-6 sm:py-12">
      <div className="flex items-center gap-4">
        <div>
          <Avatar alt={user.name || ""} size="92px" src={user.image || ""} />
        </div>
        <div>
          <h2 className="sm:text-xl">{user.name}</h2>
          <p className="text-sm leading-6 sm:text-base">
            Full Stack Developer | React | Node | Typescript | SQL{" "}
          </p>
          <ExternalLink className="text-sm text-zinc-500" href="https://martinsione.com">
            martinsione.com
          </ExternalLink>
        </div>
      </div>
      <div>
        <h4>About</h4>
        <p className="text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda necessitatibus aperiam
          nam hic voluptatum veniam facere doloremque, vel dolorem quasi maiores sapiente sit
          aliquam et animi tenetur nostrum non ipsum ex explicabo quia quis. Rerum explicabo eius
          culpa a earum?
        </p>
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
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const users = await prisma.user.findMany();
  return {
    paths: users.map((user) => ({ params: { username: user.username } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    if (params?.username) {
      const username = params.username.toString();
      const user = await prisma.user.findUnique({ where: { username } });
      return { props: { user } };
    }
    return { props: { user: null, success: true } };
  } catch (e) {
    return { props: { user: null, success: false } };
  }
};
