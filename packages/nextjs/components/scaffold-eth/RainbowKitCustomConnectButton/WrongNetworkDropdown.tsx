import { NetworkOptions } from "./NetworkOptions";
import { useDisconnect } from "wagmi";
import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { Button } from "~~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";

export const WrongNetworkDropdown = () => {
  const { disconnect } = useDisconnect();

  return (
    <div className="mr-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="destructive" size="sm" className="gap-1">
            <span>Wrong network</span>
            <ChevronDownIcon className="h-6 w-4 ml-2 sm:ml-0" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48 mt-1 p-2 bg-background rounded-xl shadow-lg">
          <NetworkOptions />
          <DropdownMenuItem className="p-0" onClick={() => disconnect()}>
            <div className="flex items-center gap-3 p-3 text-destructive w-full">
              <ArrowLeftOnRectangleIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span>Disconnect</span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
