import { type NextPage } from "next";
import NextError from "next/error";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import { trpc } from "../../utils/trpc";

const Artist: NextPage = () => {
  const id = useRouter().query.id as string;
  const artistQuery = trpc.artist.getById.useQuery({ id });

  if (artistQuery.error) {
    return (
      <NextError
        title={artistQuery.error.message}
        statusCode={artistQuery.error.data?.httpStatus ?? 500}
      />
    );
  }

  if (artistQuery.status !== "success") {
    return <>Loading...</>;
  }

  return (
    <>
      <Head>
        <title>{artistQuery.data?.name}</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            {artistQuery.data?.name}
          </h1>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
            <div className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <LyricsForm />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Artist;

const LyricsForm: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
      </p>
    </div>
  );
};
