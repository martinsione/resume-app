import Nav from "@components/Nav";
import { User } from "@prisma/client";
import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { getSession } from "next-auth/react";

interface Props {
  user: User | null;
}

export default function Home({ user }: Props) {
  const isLogged = !!user?.id;
  return (
    <div>
      <Nav
        alt={user?.name || ""}
        isLogged={isLogged}
        src={user?.image || ""}
        username={user?.username || null}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const session = await getSession(ctx);
  if (!session) return { props: { user: null } };
  return { props: { user: session.user } };
};
