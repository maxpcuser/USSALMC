import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to USSA Lore Master</h1>
        <p className="text-lg">Web Application for USSA Knowledge Core</p>
      </main>
    </div>
  );
};

export default Home;