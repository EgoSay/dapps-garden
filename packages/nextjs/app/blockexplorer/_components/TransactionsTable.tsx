import { TransactionHash } from "./TransactionHash";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { TransactionWithFunction } from "~~/utils/scaffold-eth";
import { TransactionsTableProps } from "~~/utils/scaffold-eth/";

export const TransactionsTable = ({ blocks, transactionReceipts }: TransactionsTableProps) => {
  const { targetNetwork } = useTargetNetwork();

  return (
    <div className="flex justify-center px-4 md:px-0">
      <div className="overflow-x-auto w-full shadow-2xl rounded-xl">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="bg-primary text-primary-foreground">Transaction Hash</TableHead>
              <TableHead className="bg-primary text-primary-foreground">Function Called</TableHead>
              <TableHead className="bg-primary text-primary-foreground">Block Number</TableHead>
              <TableHead className="bg-primary text-primary-foreground">Time Mined</TableHead>
              <TableHead className="bg-primary text-primary-foreground">From</TableHead>
              <TableHead className="bg-primary text-primary-foreground">To</TableHead>
              <TableHead className="bg-primary text-primary-foreground text-end">
                Value ({targetNetwork.nativeCurrency.symbol})
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {blocks.map(block =>
              (block.transactions as TransactionWithFunction[]).map(tx => {
                const receipt = transactionReceipts[tx.hash];
                const timeMined = new Date(Number(block.timestamp) * 1000).toLocaleString();
                const functionCalled = tx.input.substring(0, 10);

                return (
                  <TableRow key={tx.hash} className="hover:bg-muted/50 text-sm">
                    <TableCell className="w-1/12 md:py-4">
                      <TransactionHash hash={tx.hash} />
                    </TableCell>
                    <TableCell className="w-2/12 md:py-4">
                      {tx.functionName === "0x" ? "" : <span className="mr-1">{tx.functionName}</span>}
                      {functionCalled !== "0x" && (
                        <Badge variant="default" className="font-bold text-xs">
                          {functionCalled}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="w-1/12 md:py-4">{block.number?.toString()}</TableCell>
                    <TableCell className="w-2/1 md:py-4">{timeMined}</TableCell>
                    <TableCell className="w-2/12 md:py-4">
                      <Address address={tx.from} size="sm" onlyEnsOrAddress />
                    </TableCell>
                    <TableCell className="w-2/12 md:py-4">
                      {!receipt?.contractAddress ? (
                        tx.to && <Address address={tx.to} size="sm" onlyEnsOrAddress />
                      ) : (
                        <div className="relative">
                          <Address address={receipt.contractAddress} size="sm" onlyEnsOrAddress />
                          <small className="absolute top-4 left-4">(Contract Creation)</small>
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="text-right md:py-4">
                      {formatEther(tx.value)} {targetNetwork.nativeCurrency.symbol}
                    </TableCell>
                  </TableRow>
                );
              }),
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
