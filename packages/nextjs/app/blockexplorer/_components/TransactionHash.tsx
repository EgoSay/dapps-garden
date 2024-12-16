"use client";

import { useState } from "react";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";

export const TransactionHash = ({ hash }: { hash: string }) => {
  const [addressCopied, setAddressCopied] = useState(false);

  return (
    <div className="flex items-center">
      <Link href={`/blockexplorer/transaction/${hash}`} className="hover:text-primary">
        {hash?.substring(0, 6)}...{hash?.substring(hash.length - 4)}
      </Link>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {addressCopied ? (
              <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-transparent">
                <CheckCircleIcon className="ml-1.5 text-primary h-5 w-5" aria-hidden="true" />
              </Button>
            ) : (
              <CopyToClipboard
                text={hash as string}
                onCopy={() => {
                  setAddressCopied(true);
                  setTimeout(() => {
                    setAddressCopied(false);
                  }, 800);
                }}
              >
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0 hover:bg-transparent">
                  <DocumentDuplicateIcon className="ml-1.5 text-primary h-5 w-5" aria-hidden="true" />
                </Button>
              </CopyToClipboard>
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{addressCopied ? "Copied!" : "Copy to clipboard"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};
