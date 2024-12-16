"use client";

import { useEffect, useState } from "react";
import { Address, createPublicClient, http, toHex } from "viem";
import { hardhat } from "viem/chains";
import { Card, CardContent } from "~~/components/ui/card";
import { ScrollArea } from "~~/components/ui/scroll-area";

const publicClient = createPublicClient({
  chain: hardhat,
  transport: http(),
});

export const AddressStorageTab = ({ address }: { address: Address }) => {
  const [storage, setStorage] = useState<string[]>([]);

  useEffect(() => {
    const fetchStorage = async () => {
      try {
        const storageData = [];
        let idx = 0;

        while (true) {
          const storageAtPosition = await publicClient.getStorageAt({
            address: address,
            slot: toHex(idx),
          });

          if (storageAtPosition === "0x" + "0".repeat(64)) break;

          if (storageAtPosition) {
            storageData.push(storageAtPosition);
          }

          idx++;
        }
        setStorage(storageData);
      } catch (error) {
        console.error("Failed to fetch storage:", error);
      }
    };

    fetchStorage();
  }, [address]);

  return (
    <div className="flex flex-col gap-3 p-4">
      {storage.length > 0 ? (
        <Card>
          <CardContent className="p-0">
            <ScrollArea className="h-[500px] w-full rounded-md border">
              <div className="p-4 font-mono text-sm">
                {storage.map((data, i) => (
                  <div key={i} className="py-1">
                    <strong className="text-primary">Storage Slot {i}:</strong> {data}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      ) : (
        <div className="text-lg">This contract does not have any variables.</div>
      )}
    </div>
  );
};
