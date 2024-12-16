"use client";

import { ReactElement, useState } from "react";
import { TransactionBase, TransactionReceipt, formatEther, isAddress, isHex } from "viem";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { Address } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";
import { replacer } from "~~/utils/scaffold-eth/common";

type DisplayContent =
  | string
  | number
  | bigint
  | Record<string, any>
  | TransactionBase
  | TransactionReceipt
  | undefined
  | unknown;

type ResultFontSize = "sm" | "base" | "xs" | "lg" | "xl" | "2xl" | "3xl";

export const displayTxResult = (
  displayContent: DisplayContent | DisplayContent[],
  fontSize: ResultFontSize = "base",
): string | ReactElement | number => {
  if (displayContent == null) {
    return "";
  }

  if (typeof displayContent === "bigint") {
    return <NumberDisplay value={displayContent} />;
  }

  if (typeof displayContent === "string") {
    if (isAddress(displayContent)) {
      return <Address address={displayContent} size={fontSize} onlyEnsOrAddress />;
    }

    if (isHex(displayContent)) {
      return displayContent;
    }
  }

  if (Array.isArray(displayContent)) {
    return <ArrayDisplay values={displayContent} size={fontSize} />;
  }

  if (typeof displayContent === "object") {
    return <StructDisplay struct={displayContent} size={fontSize} />;
  }

  return JSON.stringify(displayContent, replacer, 2);
};

const NumberDisplay = ({ value }: { value: bigint }) => {
  const [isEther, setIsEther] = useState(false);

  const asNumber = Number(value);
  if (asNumber <= Number.MAX_SAFE_INTEGER && asNumber >= Number.MIN_SAFE_INTEGER) {
    return String(value);
  }

  return (
    <div className="flex items-baseline">
      {isEther ? "Ξ" + formatEther(value) : String(value)}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2 h-6 w-6" onClick={() => setIsEther(!isEther)}>
              <ArrowsRightLeftIcon className="h-3 w-3 opacity-65" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{isEther ? "Multiply by 1e18" : "Divide by 1e18"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export const ObjectFieldDisplay = ({
  name,
  value,
  size,
  leftPad = true,
}: {
  name: string;
  value: DisplayContent;
  size: ResultFontSize;
  leftPad?: boolean;
}) => {
  return (
    <div className={`flex flex-row items-baseline ${leftPad ? "ml-4" : ""}`}>
      <span className="text-base-content/60 mr-2">{name}:</span>
      <span className="text-base-content">{displayTxResult(value, size)}</span>
    </div>
  );
};

const ArrayDisplay = ({ values, size }: { values: DisplayContent[]; size: ResultFontSize }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {values.length ? "array" : "[]"}
      {values.map((v, i) => (
        <ObjectFieldDisplay key={i} name={`[${i}]`} value={v} size={size} />
      ))}
    </div>
  );
};

const StructDisplay = ({ struct, size }: { struct: Record<string, any>; size: ResultFontSize }) => {
  return (
    <div className="flex flex-col gap-y-1">
      {Object.entries(struct).map(([k, v]) => (
        <ObjectFieldDisplay key={k} name={k} value={v} size={size} />
      ))}
    </div>
  );
};
