import { Address } from "viem";
import { Card, CardContent } from "~~/components/ui/card";
import { ScrollArea } from "~~/components/ui/scroll-area";
import { useContractLogs } from "~~/hooks/scaffold-eth";
import { replacer } from "~~/utils/scaffold-eth/common";

export const AddressLogsTab = ({ address }: { address: Address }) => {
  const contractLogs = useContractLogs(address);

  return (
    <div className="flex flex-col gap-3 p-4">
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <div className="p-4 font-mono text-sm">
              {contractLogs.map((log, i) => (
                <div key={i} className="py-1">
                  <strong className="text-primary">Log:</strong> {JSON.stringify(log, replacer, 2)}
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
