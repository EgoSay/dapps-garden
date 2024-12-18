"use client";

import Image from "next/image";
import Link from "next/link";
import type { NextPage } from "next";
// import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "~~/components/ui/card";

const Home: NextPage = () => {
  // const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Welcome to</span>
            <span className="block text-4xl font-bold">Dapps Garden</span>
          </h1>
          <div className="flex flex-col items-center justify-center">
            <Image
              src="/nft1.png"
              width="266"
              height="223"
              alt="challenge banner"
              className="rounded-xl border-4 border-primary"
            />
            <div className="max-w-3xl">
              <p>NFT marketplace</p>
            </div>
          </div>
        </div>

        <div className="flex-grow bg-muted w-full mt-16 px-8 py-12">
          <div className="flex justify-center items-center gap-12 flex-col sm:flex-row">
            <Card className="max-w-xs">
              <CardContent className="flex flex-col items-center p-10 text-center">
                <BugAntIcon className="h-8 w-8 text-secondary" />
                <p>
                  Tinker with your smart contract using the{" "}
                  <Link href="/debug" className="text-primary hover:text-primary/80 underline underline-offset-4">
                    Debug Contracts
                  </Link>{" "}
                  tab.
                </p>
              </CardContent>
            </Card>
            <Card className="max-w-xs">
              <CardContent className="flex flex-col items-center p-10 text-center">
                <MagnifyingGlassIcon className="h-8 w-8 text-secondary" />
                <p>
                  Explore your local transactions with the{" "}
                  <Link
                    href="/blockexplorer"
                    className="text-primary hover:text-primary/80 underline underline-offset-4"
                  >
                    Block Explorer
                  </Link>{" "}
                  tab.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
