import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { BuidlGuidlLogo } from "~~/components/assets/BuidlGuidlLogo";
import { Faucet } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { cn } from "~~/lib/utils";
import { useGlobalState } from "~~/services/store/store";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrency.price);
  const { targetNetwork } = useTargetNetwork();
  const isLocalNetwork = targetNetwork.id === hardhat.id;

  return (
    <div className="min-h-0 py-5 px-1 mb-11 lg:mb-0">
      <div>
        <div className="fixed flex justify-between items-center w-full z-10 p-4 bottom-0 left-0 pointer-events-none">
          <div className="flex flex-col md:flex-row gap-2 pointer-events-auto">
            {nativeCurrencyPrice > 0 && (
              <div>
                <Button variant="default" size="sm" className="font-normal cursor-auto">
                  <CurrencyDollarIcon className="h-4 w-4 mr-1" />
                  <span>{nativeCurrencyPrice.toFixed(2)}</span>
                </Button>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Button variant="default" size="sm" className="font-normal" asChild>
                  <Link href="/blockexplorer">
                    <MagnifyingGlassIcon className="h-4 w-4 mr-1" />
                    <span>Block Explorer</span>
                  </Link>
                </Button>
              </>
            )}
          </div>
          <SwitchTheme className={cn("pointer-events-auto", isLocalNetwork && "self-end md:self-auto")} />
        </div>
      </div>
      <div className="w-full">
        <nav className="w-full">
          <div className="flex justify-center items-center gap-2 text-sm w-full">
            <div className="text-center">
              <a
                href="https://github.com/EgoSay"
                target="_blank"
                rel="noreferrer"
                className="text-primary hover:text-primary/80 underline underline-offset-4"
              >
                Github
              </a>
            </div>
            <span>·</span>
            <div className="flex justify-center items-center gap-2">
              <p className="m-0 text-center">
                Built with <HeartIcon className="inline-block h-4 w-4" /> at
              </p>
              <a
                className="flex justify-center items-center gap-1 text-primary hover:text-primary/80 underline underline-offset-4"
                href="https://buidlguidl.com/"
                target="_blank"
                rel="noreferrer"
              >
                <BuidlGuidlLogo className="w-3 h-5 pb-1" />
                <span>BuidlGuidl</span>
              </a>
            </div>
            <span>·</span>
          </div>
        </nav>
      </div>
    </div>
  );
};
