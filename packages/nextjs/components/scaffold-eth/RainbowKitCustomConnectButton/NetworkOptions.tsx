import { useTheme } from "next-themes";
import { useAccount, useSwitchChain } from "wagmi";
import { ArrowsRightLeftIcon } from "@heroicons/react/24/solid";
import { DropdownMenuItem } from "~~/components/ui/dropdown-menu";
import { getNetworkColor } from "~~/hooks/scaffold-eth";
import { cn } from "~~/lib/utils";
import { getTargetNetworks } from "~~/utils/scaffold-eth";

const allowedNetworks = getTargetNetworks();

type NetworkOptionsProps = {
  hidden?: boolean;
};

export const NetworkOptions = ({ hidden = false }: NetworkOptionsProps) => {
  const { switchChain } = useSwitchChain();
  const { chain } = useAccount();
  const { resolvedTheme } = useTheme();
  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      {allowedNetworks
        .filter(allowedNetwork => allowedNetwork.id !== chain?.id)
        .map(allowedNetwork => (
          <DropdownMenuItem
            key={allowedNetwork.id}
            className={cn("p-0", hidden && "hidden")}
            onClick={() => switchChain?.({ chainId: allowedNetwork.id })}
          >
            <div className="flex items-center gap-3 p-3 w-full">
              <ArrowsRightLeftIcon className="h-6 w-4 ml-2 sm:ml-0" />
              <span className="whitespace-nowrap">
                Switch to{" "}
                <span
                  style={{
                    color: getNetworkColor(allowedNetwork, isDarkMode),
                  }}
                >
                  {allowedNetwork.name}
                </span>
              </span>
            </div>
          </DropdownMenuItem>
        ))}
    </>
  );
};
