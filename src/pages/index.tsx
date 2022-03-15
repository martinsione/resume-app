import Nav from "@components/Nav";
import { User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props {
  user: User | null;
  userId: string | null;
}

export default function Home({ user, userId }: Props) {
  return (
    <div>
      <Nav alt={user?.name || ""} src={user?.image || ""} userId={userId} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) {
    return { props: { user: null, userId: null } };
  }
  const { user, userId } = session;
  return { props: { user, userId } };
};
