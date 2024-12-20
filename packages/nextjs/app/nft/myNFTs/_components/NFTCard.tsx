"use client";

import { useState } from "react";
import { Collectible } from "./MyHoldings";
import { Address, AddressInput } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";
import { Card, CardContent } from "~~/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export const NFTCard = ({ nft }: { nft: Collectible }) => {
  const [transferToAddress, setTransferToAddress] = useState("");
  const { writeContractAsync } = useScaffoldWriteContract("YourCollectible");

  const handleTransfer = async () => {
    try {
      await writeContractAsync({
        functionName: "transferFrom",
        args: [nft.owner, transferToAddress, BigInt(nft.id.toString())],
      });
    } catch (err) {
      console.error("Error calling transferFrom function", err);
    }
  };

  return (
    <Card className="w-[300px] overflow-hidden bg-card hover:shadow-lg transition-shadow duration-200">
      <div className="relative aspect-square">
        <img src={nft.image} alt={nft.name} className="object-cover w-full h-full" />
        <div className="absolute top-2 left-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-md">
          <span className="text-white text-sm font-medium">#{nft.id}</span>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold truncate">{nft.name}</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <div className="flex flex-wrap gap-2">
                  {nft.attributes?.map((attr, index) => (
                    <Badge key={index} variant="secondary" className="px-3 py-1">
                      {attr.value}
                    </Badge>
                  ))}
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>{nft.description}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Owner:</span>
          <Address address={nft.owner} />
        </div>

        <div className="flex items-center space-x-2">
          <AddressInput
            value={transferToAddress}
            placeholder="Receiver address"
            onChange={newValue => setTransferToAddress(newValue)}
          />
          <Button size="sm" onClick={handleTransfer} disabled={!transferToAddress}>
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
