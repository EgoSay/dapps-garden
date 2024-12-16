import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import { cn } from "~~/lib/utils";

export const AddressCopyIcon = ({ className, address }: { className?: string; address: string }) => {
  const [addressCopied, setAddressCopied] = useState(false);
  return (
    <CopyToClipboard
      text={address}
      onCopy={() => {
        setAddressCopied(true);
        setTimeout(() => {
          setAddressCopied(false);
        }, 800);
      }}
    >
      <Button
        variant="ghost"
        size="icon"
        className="p-0 h-auto w-auto hover:bg-transparent"
        onClick={e => e.stopPropagation()}
      >
        {addressCopied ? (
          <CheckCircleIcon className={cn(className, "transition-all")} aria-hidden="true" />
        ) : (
          <DocumentDuplicateIcon className={cn(className, "transition-all")} aria-hidden="true" />
        )}
      </Button>
    </CopyToClipboard>
  );
};
