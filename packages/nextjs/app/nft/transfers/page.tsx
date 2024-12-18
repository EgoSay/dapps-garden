"use client";

import { useState } from "react";
import { Clock, Copy, ExternalLink } from 'lucide-react';
import { Address } from "~~/components/scaffold-eth";
import { useScaffoldEventHistory } from "~~/hooks/scaffold-eth";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~~/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "~~/components/ui/card";
import { Badge } from "~~/components/ui/badge";
import { Button } from "~~/components/ui/button";

export default function Transfers() {
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  const { data: transferEvents, isLoading } = useScaffoldEventHistory({
    contractName: "YourCollectible",
    eventName: "Transfer",
    fromBlock: 0n,
  });

  const sortedEvents = transferEvents?.slice().sort((a, b) => {
    const aId = Number(a.args.tokenId);
    const bId = Number(b.args.tokenId);
    return sortDirection === "asc" ? aId - bId : bId - aId;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="flex flex-col items-center gap-2">
          <div className="animate-spin">
            <Clock className="h-8 w-8" />
          </div>
          <p className="text-sm text-muted-foreground">Loading transfers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Card>
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Transfer Events</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortDirection(d => d === "asc" ? "desc" : "asc")}
            >
              Sort {sortDirection === "asc" ? "↑" : "↓"}
            </Button>
          </div>
          <p className="text-sm text-muted-foreground">
            Track all NFT transfers on the blockchain
          </p>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] font-medium">Token ID</TableHead>
                  <TableHead className="font-medium">From</TableHead>
                  <TableHead className="font-medium">To</TableHead>
                  {/* <TableHead className="w-[100px] text-right font-medium">Actions</TableHead> */}
                </TableRow>
              </TableHeader>
              <TableBody>
                {!sortedEvents || sortedEvents.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground">
                      No transfer events found
                    </TableCell>
                  </TableRow>
                ) : (
                  sortedEvents.map((event, index) => (
                    <TableRow key={`${event.args.tokenId}-${index}`}>
                      <TableCell className="font-medium">
                        <Badge variant="outline">
                          #{event.args.tokenId?.toString()}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Address address={event.args.from} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Address address={event.args.to} />
                        </div>
                      </TableCell>
                      {/* <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => window.open(`https://etherscan.io/tx/${event.transactionHash}`, '_blank')}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      </TableCell> */}
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

