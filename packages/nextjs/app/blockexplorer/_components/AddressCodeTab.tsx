import { Card, CardContent } from "~~/components/ui/card";
import { ScrollArea } from "~~/components/ui/scroll-area";

type AddressCodeTabProps = {
  bytecode: string;
  assembly: string;
};

export const AddressCodeTab = ({ bytecode, assembly }: AddressCodeTabProps) => {
  const formattedAssembly = Array.from(assembly.matchAll(/\w+( 0x[a-fA-F0-9]+)?/g))
    .map(it => it[0])
    .join("\n");

  return (
    <div className="flex flex-col gap-3 p-4">
      <div className="text-lg font-medium">Bytecode</div>
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <div className="p-4 font-mono text-sm">
              <code className="whitespace-pre-wrap break-words">{bytecode}</code>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="text-lg font-medium">Opcodes</div>
      <Card>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px] w-full rounded-md border">
            <div className="p-4 font-mono text-sm">
              <code>{formattedAssembly}</code>
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};
