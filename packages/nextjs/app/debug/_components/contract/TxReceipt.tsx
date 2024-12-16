import { useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { TransactionReceipt } from "viem";
import { CheckCircleIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";
import { ObjectFieldDisplay } from "~~/app/debug/_components/contract";
import { Card, CardContent } from "~~/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~~/components/ui/collapsible";
import { ScrollArea } from "~~/components/ui/scroll-area";
import { cn } from "~~/lib/utils";
import { replacer } from "~~/utils/scaffold-eth/common";

export const TxReceipt = ({ txResult }: { txResult: TransactionReceipt }) => {
  const [txResultCopied, setTxResultCopied] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="bg-muted">
      <CardContent className="flex text-sm p-0">
        <div className="mt-1 pl-2">
          {txResultCopied ? (
            <CheckCircleIcon
              className="ml-1.5 text-xl font-normal text-primary h-5 w-5 cursor-pointer"
              aria-hidden="true"
            />
          ) : (
            <CopyToClipboard
              text={JSON.stringify(txResult, replacer, 2)}
              onCopy={() => {
                setTxResultCopied(true);
                setTimeout(() => {
                  setTxResultCopied(false);
                }, 800);
              }}
            >
              <DocumentDuplicateIcon
                className="ml-1.5 text-xl font-normal text-primary h-5 w-5 cursor-pointer"
                aria-hidden="true"
              />
            </CopyToClipboard>
          )}
        </div>
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="flex-grow">
          <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 pl-1 text-sm hover:bg-muted/50">
            <strong>Transaction Receipt</strong>
            <div className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="m6 9 6 6 6-6" />
              </svg>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <ScrollArea className="h-[200px] bg-muted/50 rounded-b-lg">
              <div className="p-4">
                <pre className="text-xs">
                  {Object.entries(txResult).map(([k, v]) => (
                    <ObjectFieldDisplay name={k} value={v} size="xs" leftPad={false} key={k} />
                  ))}
                </pre>
              </div>
            </ScrollArea>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};
