"use client";

import { useEffect, useState } from "react";
import { Address as AddressType, createWalletClient, http, parseEther } from "viem";
import { hardhat } from "viem/chains";
import { useAccount } from "wagmi";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { Address, AddressInput, Balance, EtherInput } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~~/components/ui/dialog";
import { useTransactor } from "~~/hooks/scaffold-eth";

// Account index to use from generated hardhat accounts.
const FAUCET_ACCOUNT_INDEX = 0;

const localWalletClient = createWalletClient({
  chain: hardhat,
  transport: http(),
});

/**
 * Faucet modal which lets you send ETH to any address.
 */
export const Faucet = () => {
  const [loading, setLoading] = useState(false);
  const [inputAddress, setInputAddress] = useState<AddressType>();
  const [faucetAddress, setFaucetAddress] = useState<AddressType>();
  const [sendValue, setSendValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const { chain: ConnectedChain } = useAccount();

  const faucetTxn = useTransactor(localWalletClient);

  useEffect(() => {
    const getFaucetAddress = async () => {
      try {
        const accounts = await localWalletClient.getAddresses();
        setFaucetAddress(accounts[FAUCET_ACCOUNT_INDEX]);
      } catch (error) {
        console.error("⚡️ ~ file: Faucet.tsx:getFaucetAddress ~ error", error);
      }
    };
    getFaucetAddress();
  }, []);

  const sendETH = async () => {
    if (!faucetAddress || !inputAddress) {
      return;
    }
    try {
      setLoading(true);
      await faucetTxn({
        to: inputAddress,
        value: parseEther(sendValue as `${number}`),
        account: faucetAddress,
      });
      setLoading(false);
      setInputAddress(undefined);
      setSendValue("");
      setIsOpen(false);
    } catch (error) {
      console.error("⚡️ ~ file: Faucet.tsx:sendETH ~ error", error);
      setLoading(false);
    }
  };

  // Render only on local chain
  if (ConnectedChain?.id !== hardhat.id) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="sm" className="font-normal">
          <BanknotesIcon className="h-4 w-4 mr-1" />
          <span>Faucet</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Local Faucet</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <div className="flex space-x-4">
            <div>
              <span className="text-sm font-bold">From:</span>
              <Address address={faucetAddress} onlyEnsOrAddress />
            </div>
            <div>
              <span className="text-sm font-bold pl-3">Available:</span>
              <Balance address={faucetAddress} />
            </div>
          </div>
          <div className="flex flex-col space-y-3">
            <AddressInput
              placeholder="Destination Address"
              value={inputAddress ?? ""}
              onChange={value => setInputAddress(value as AddressType)}
            />
            <EtherInput placeholder="Amount to send" value={sendValue} onChange={value => setSendValue(value)} />
            <Button variant="default" size="default" className="gap-2" onClick={sendETH} disabled={loading}>
              {!loading ? (
                <BanknotesIcon className="h-5 w-5" />
              ) : (
                <div className="h-5 w-5 animate-spin rounded-full border-b-2 border-current" />
              )}
              <span>Send</span>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
