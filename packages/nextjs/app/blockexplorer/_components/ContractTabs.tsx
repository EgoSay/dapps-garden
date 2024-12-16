"use client";

import { useEffect, useState } from "react";
import { AddressCodeTab } from "./AddressCodeTab";
import { AddressLogsTab } from "./AddressLogsTab";
import { AddressStorageTab } from "./AddressStorageTab";
import { PaginationButton } from "./PaginationButton";
import { TransactionsTable } from "./TransactionsTable";
import { createPublicClient, http } from "viem";
import { hardhat } from "viem/chains";
import { Tabs, TabsList, TabsTrigger } from "~~/components/ui/tabs";
import { useFetchBlocks } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";

type AddressCodeTabProps = {
  bytecode: string;
  assembly: string;
};

type PageProps = {
  address: string;
  contractData: AddressCodeTabProps | null;
};

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export const ContractTabs = ({ address, contractData }: PageProps) => {
  const { blocks, transactionReceipts, currentPage, totalBlocks, setCurrentPage } = useFetchBlocks();
  const [activeTab, setActiveTab] = useState("transactions");
  const [isContract, setIsContract] = useState(false);

  useEffect(() => {
    const checkIsContract = async () => {
      const contractCode = await publicClient.getBytecode({ address: address });
      setIsContract(contractCode !== undefined && contractCode !== "0x");
    };

    checkIsContract();
  }, [address]);

  const filteredBlocks = blocks.filter(block =>
    block.transactions.some(tx => {
      if (typeof tx === "string") {
        return false;
      }
      return tx.from.toLowerCase() === address.toLowerCase() || tx.to?.toLowerCase() === address.toLowerCase();
    }),
  );

  return (
    <>
      {isContract && (
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-min">
            <TabsTrigger
              value="transactions"
              className={cn("px-4 py-2 rounded-t-lg", activeTab === "transactions" && "bg-background text-foreground")}
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={cn("px-4 py-2 rounded-t-lg", activeTab === "code" && "bg-background text-foreground")}
            >
              Code
            </TabsTrigger>
            <TabsTrigger
              value="storage"
              className={cn("px-4 py-2 rounded-t-lg", activeTab === "storage" && "bg-background text-foreground")}
            >
              Storage
            </TabsTrigger>
            <TabsTrigger
              value="logs"
              className={cn("px-4 py-2 rounded-t-lg", activeTab === "logs" && "bg-background text-foreground")}
            >
              Logs
            </TabsTrigger>
          </TabsList>
        </Tabs>
      )}
      {activeTab === "transactions" && (
        <div className="pt-4">
          <TransactionsTable blocks={filteredBlocks} transactionReceipts={transactionReceipts} />
          <PaginationButton
            currentPage={currentPage}
            totalItems={Number(totalBlocks)}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
      {activeTab === "code" && contractData && (
        <AddressCodeTab bytecode={contractData.bytecode} assembly={contractData.assembly} />
      )}
      {activeTab === "storage" && <AddressStorageTab address={address} />}
      {activeTab === "logs" && <AddressLogsTab address={address} />}
    </>
  );
};
