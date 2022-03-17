import { getSession } from "next-auth/react";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { User } from "@prisma/client";

import Nav from "@components/Nav";

interface Props {
  user: User | null;
}

export default function Home({ user }: Props) {
  return (
    <div>
      <Nav alt={user?.name || ""} src={user?.image || ""} username={user?.username || null} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) return { props: { user: null } };
  return { props: { user: session.user } };
};
