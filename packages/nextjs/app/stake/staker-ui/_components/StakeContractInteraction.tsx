"use client";

import { ETHToPrice } from "./EthToPrice";
import humanizeDuration from "humanize-duration";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";
import { Clock, Wallet, BarChartIcon as ChartBar, Zap, LogOut, ArrowRight } from 'lucide-react';

export const StakeContractInteraction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: StakerContract } = useDeployedContractInfo("Staker");
  const { data: ExampleExternalContact } = useDeployedContractInfo("ExampleExternalContract");
  const { data: stakerContractBalance } = useWatchBalance({
    address: StakerContract?.address,
  });
  const { data: exampleExternalContractBalance } = useWatchBalance({
    address: ExampleExternalContact?.address,
  });

  const { targetNetwork } = useTargetNetwork();

  // Contract Read Actions
  const { data: threshold } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "threshold",
    watch: true,
  });
  const { data: timeLeft } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "timeLeft",
    watch: true,
  });
  const { data: myStake } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "balances",
    args: [connectedAddress],
    watch: true,
  });
  const { data: isStakingCompleted } = useScaffoldReadContract({
    contractName: "ExampleExternalContract",
    functionName: "completed",
    watch: true,
  });

  const { writeContractAsync } = useScaffoldWriteContract("Staker");

  const totalStaked = stakerContractBalance ? Number(formatEther(stakerContractBalance.value)) : 0;
  const thresholdValue = threshold ? Number(formatEther(threshold)) : 0;
  const progress = thresholdValue > 0 ? (totalStaked / thresholdValue) * 100 : 0;

  return (
    <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
      {isStakingCompleted && (
        <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl p-6 mt-12 w-full max-w-lg animate-fade-in">
          <p className="block m-0 font-semibold text-xl">
            🎉 Staking Successfully Completed! 🎉
          </p>
          <div className="flex items-center text-lg">
            <ETHToPrice
              value={exampleExternalContractBalance ? formatEther(exampleExternalContractBalance.value) : undefined}
              className="text-white"
            />
            <p className="block m-0 ml-2">staked</p>
          </div>
        </div>
      )}
      <div className={`flex flex-col items-center bg-white dark:bg-gray-800 rounded-2xl p-8 w-full max-w-lg ${
        !isStakingCompleted ? "mt-24" : ""
      } shadow-xl transition-all duration-200`}>
        <div className="flex flex-col w-full items-center mb-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Staker Contract
          </h2>
          <Address address={address} size="xl" />
        </div>

        <div className="grid grid-cols-2 gap-8 w-full mb-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Clock className="w-6 h-6 mb-2 text-primary" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Time Left</p>
            <p className="font-bold">{timeLeft ? humanizeDuration(Number(timeLeft) * 1000) : '0'}</p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700">
            <Wallet className="w-6 h-6 mb-2 text-primary" />
            <p className="text-sm text-gray-500 dark:text-gray-400">You Staked</p>
            <p className="font-bold">
              {myStake ? formatEther(myStake) : '0'} {targetNetwork.nativeCurrency.symbol}
            </p>
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <ChartBar className="w-5 h-5 mr-2 text-primary" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Staked</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium">
              <ETHToPrice value={stakerContractBalance ? formatEther(stakerContractBalance.value) : undefined} />
              <span>/</span>
              <ETHToPrice value={threshold ? formatEther(threshold) : undefined} />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <div className="flex gap-4">
            <button
              className="flex-1 btn bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => writeContractAsync({ functionName: "execute" })}
            >
              <Zap className="w-4 h-4" />
              Execute
            </button>
            <button
              className="flex-1 btn bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => writeContractAsync({ functionName: "withdraw" })}
            >
              <LogOut className="w-4 h-4" />
              Withdraw
            </button>
          </div>
          <button
            className="w-full btn bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
            onClick={() => writeContractAsync({ functionName: "stake", value: parseEther("0.5") })}
          >
            <ArrowRight className="w-4 h-4" />
            Stake 0.5 {targetNetwork.nativeCurrency.symbol}
          </button>
        </div>
      </div>
    </div>
  );
};

