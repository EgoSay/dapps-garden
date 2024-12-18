"use client";

import React, { useCallback, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  Bars3Icon,
  BugAntIcon,
  CircleStackIcon,
  InboxStackIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import { FaucetButton, RainbowKitCustomConnectButton } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "~~/components/ui/dropdown-menu";
import { useOutsideClick } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";

type HeaderMenuLink = {
  label: string;
  href: string;
  icon?: React.ReactNode;
  subItems?: Array<{
    label: string;
    href: string;
    icon?: React.ReactNode;
  }>;
};

export const menuLinks: HeaderMenuLink[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "NFT",
    href: "#",
    icon: <PhotoIcon className="h-4 w-4" />,
    subItems: [
      {
        label: "My NFTs",
        href: "/nft/myNFTs",
        icon: <PhotoIcon className="h-4 w-4" />,
      },
      {
        label: "Transfers",
        href: "/nft/transfers",
        icon: <ArrowPathIcon className="h-4 w-4" />,
      },
      {
        label: "IPFS Upload",
        href: "/nft/ipfsUpload",
        icon: <ArrowUpTrayIcon className="h-4 w-4" />,
      },
      {
        label: "IPFS Download",
        href: "/nft/ipfsDownload",
        icon: <ArrowDownTrayIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Stake",
    href: "#",
    icon: <CircleStackIcon className="h-4 w-4" />,
    subItems: [
      {
        label: "Staker UI",
        href: "/stake/staker-ui",
        icon: <CircleStackIcon className="h-4 w-4" />,
      },
      {
        label: "Stake Events",
        href: "/stake/stakings",
        icon: <InboxStackIcon className="h-4 w-4" />,
      },
    ],
  },
  {
    label: "Debug Contracts",
    href: "/debug",
    icon: <BugAntIcon className="h-4 w-4" />,
  },
];

export const HeaderMenuLinks = () => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <>
      {menuLinks.map(({ label, href, icon, subItems }) => {
        const isActive = pathname === href || (subItems?.some(item => pathname === item.href));

        if (subItems) {
          return (
            <li key={label} className="list-none">
              <DropdownMenu
                open={openDropdown === label}
                onOpenChange={(open) => setOpenDropdown(open ? label : null)}
              >
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      "flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-colors",
                      "hover:bg-secondary/80 hover:text-secondary-foreground",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      isActive && "bg-secondary text-secondary-foreground shadow-sm",
                    )}
                  >
                    {icon}
                    <span>{label}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  {subItems.map((item) => (
                    <DropdownMenuItem key={item.href} asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2 px-3 py-2",
                          pathname === item.href && "bg-secondary/50"
                        )}
                      >
                        {item.icon}
                        <span>{item.label}</span>
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
          );
        }

        return (
          <li key={href} className="list-none">
            <Link
              href={href}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 text-sm rounded-full transition-colors",
                "hover:bg-secondary/80 hover:text-secondary-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive && "bg-secondary text-secondary-foreground shadow-sm",
              )}
            >
              {icon}
              <span>{label}</span>
            </Link>
          </li>
        );
      })}
    </>
  );
};

/**
 * Site header
 */
export const Header = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const burgerMenuRef = useRef<HTMLDivElement>(null);
  useOutsideClick(
    burgerMenuRef,
    useCallback(() => setIsDrawerOpen(false), []),
  );

  return (
    <header className="sticky lg:static top-0 flex items-center justify-between w-full h-16 px-4 py-2 z-20 bg-background border-b">
      <div className="flex items-center gap-4 w-auto lg:w-1/2">
        <div className="lg:hidden" ref={burgerMenuRef}>
          <DropdownMenu open={isDrawerOpen}>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn("px-2", isDrawerOpen && "bg-secondary")}
                onClick={() => setIsDrawerOpen(!isDrawerOpen)}
              >
                <Bars3Icon className="h-6 w-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-52 mt-2">
              <nav className="grid gap-1 p-2" onClick={() => setIsDrawerOpen(false)}>
                <HeaderMenuLinks />
              </nav>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Link href="/" className="hidden lg:flex items-center gap-2 shrink-0">
          <div className="flex relative w-10 h-10">
            <Image alt="SE2 logo" className="cursor-pointer" fill src="/logo.svg" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold leading-tight">Dapps-Garden</span>
          </div>
        </Link>
        <nav className="hidden lg:flex items-center gap-2">
          <HeaderMenuLinks />
        </nav>
      </div>
      <div className="flex items-center gap-2">
        <RainbowKitCustomConnectButton />
        <FaucetButton />
      </div>
    </header>
  );
};

