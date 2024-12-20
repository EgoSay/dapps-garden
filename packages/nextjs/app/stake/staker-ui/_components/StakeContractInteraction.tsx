"use client";

import { useState } from "react";
import { ETHToPrice } from "./EthToPrice";
import humanizeDuration from "humanize-duration";
import { ArrowRight, BarChartIcon as ChartBar, Clock, LogOut, TrendingUp, Wallet, Zap } from "lucide-react";
import { formatEther, parseEther } from "viem";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";
import { useDeployedContractInfo, useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";
import { useTargetNetwork } from "~~/hooks/scaffold-eth/useTargetNetwork";
import { useWatchBalance } from "~~/hooks/scaffold-eth/useWatchBalance";

export const StakeContractInteraction = ({ address }: { address?: string }) => {
  const { address: connectedAddress } = useAccount();
  const { data: StakerContract } = useDeployedContractInfo("Staker");
  const { data: stakerContractBalance } = useWatchBalance({
    address: StakerContract?.address,
  });

  const { targetNetwork } = useTargetNetwork();

  const [stakeAmount, setStakeAmount] = useState<string>("");
  const handleStake = () => {
    if (!stakeAmount) return;
    writeContractAsync({
      functionName: "stake",
      value: parseEther(stakeAmount),
    });
  };

  // Contract Read Actions
  const { data: stakingTarget } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "getStakingTarget",
    watch: true,
  });
  const { data: totalReceivedETH } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "getTotalReceivedETH",
    watch: true,
  });
  const { data: timeLeft } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "getTimeLeft",
    watch: true,
  });
  const { data: myStake } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "getStakedAmount",
    args: [connectedAddress],
    watch: true,
  });
  const { data: rewards } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "getCanClaimRewards",
    args: [connectedAddress],
    watch: true,
  });
  const { data: rewardTokenSymbol } = useScaffoldReadContract({
    contractName: "StakeRewardToken",
    functionName: "symbol",
    watch: true,
  });
  const { data: isStakingCompleted } = useScaffoldReadContract({
    contractName: "Staker",
    functionName: "isCompleted",
    watch: true,
  });

  const { writeContractAsync } = useScaffoldWriteContract("Staker");
  const totalStaked = stakerContractBalance ? Number(formatEther(stakerContractBalance.value)) : 0;
  const thresholdValue = stakingTarget ? Number(formatEther(stakingTarget)) : 0;
  const progress = thresholdValue > 0 ? (totalStaked / thresholdValue) * 100 : 0;

  return (
    <div className="flex items-center flex-col flex-grow w-full px-4 gap-12">
      {isStakingCompleted && (
        <div className="flex flex-col items-center gap-2 bg-gradient-to-r from-emerald-500 to-emerald-700 text-white rounded-xl p-6 mt-12 w-full max-w-lg animate-fade-in">
          <p className="block m-0 font-semibold text-xl">🎉 Staking Successfully Completed! 🎉</p>
          <div className="flex items-center text-lg">
            <ETHToPrice className="text-white" value={totalReceivedETH ? formatEther(totalReceivedETH) : "0"} />
            <p className="block m-0 ml-2">staked</p>
          </div>
        </div>
      )}
      <div
        className={`flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-lg ${
          !isStakingCompleted ? "mt-24" : ""
        } shadow-xl dark:shadow-gray-800/30 transition-all duration-200`}
      >
        <div className="flex flex-col w-full items-center mb-8">
          <h2 className="text-2xl font-bold mb-4 text-primary dark:text-white">Staker Contract</h2>
          <Address address={address} size="xl" />
        </div>

        {!isStakingCompleted && (
          <div className="w-full mb-8 px-8 py-3 flex flex-col items-center justify-center rounded-lg bg-gray-50 dark:bg-gray-800">
            <Clock className="w-6 h-6 mb-2 text-primary dark:text-emerald-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center">Time Left</p>
            <p className="font-bold text-center dark:text-white">
              {timeLeft ? humanizeDuration(Number(timeLeft) * 1000) : "0"}
            </p>
          </div>
        )}
        <div className="grid grid-cols-2 gap-4 w-full mb-8">
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <Wallet className="w-6 h-6 mb-2 text-primary dark:text-emerald-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">You Staked</p>
            <p className="font-bold dark:text-white">
              {myStake ? formatEther(myStake) : "0"} {targetNetwork.nativeCurrency.symbol}
            </p>
          </div>
          <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
            <TrendingUp className="w-6 h-6 mb-2 text-primary dark:text-emerald-400" />
            <p className="text-sm text-gray-500 dark:text-gray-400">Your Rewards</p>
            <p className="font-bold dark:text-white">
              {rewards ? rewards.toString() : "0"} {rewardTokenSymbol}
            </p>
          </div>
        </div>

        <div className="w-full mb-8">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <ChartBar className="w-5 h-5 mr-2 text-primary dark:text-emerald-400" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Staked</span>
            </div>
            <div className="flex items-center space-x-2 text-sm font-medium dark:text-white">
              <ETHToPrice value={stakerContractBalance ? formatEther(stakerContractBalance.value) : undefined} />
              <span>/</span>
              <ETHToPrice value={stakingTarget ? formatEther(stakingTarget) : undefined} />
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
            <div
              className="bg-gradient-to-r from-emerald-500 to-emerald-700 h-2.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
        </div>

        <div className="flex flex-col gap-6 w-full">
          {!isStakingCompleted && (
            <div className="flex-1 flex gap-2">
              <input
                type="number"
                className="input flex-1 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:focus:border-emerald-500"
                placeholder="输入质押数量"
                value={stakeAmount}
                onChange={e => setStakeAmount(e.target.value)}
                step="0.01"
              />
              <button
                className="flex-1 btn text-lg font-bold bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={handleStake}
              >
                <Zap className="w-4 h-4" />
                Stake
              </button>
              <button
                className="flex-1 btn text-lg font-bold bg-red-500 hover:bg-red-600 text-white dark:bg-red-600 dark:hover:bg-red-700 transition-all duration-200 flex items-center justify-center gap-2"
                onClick={() => writeContractAsync({ functionName: "refund" })}
              >
                <LogOut className="w-4 h-4" />
                Refund
              </button>
            </div>
          )}
          {isStakingCompleted && (
            <button
              className="w-full px-8 py-3 text-lg font-bold rounded-xl btn bg-gradient-to-r from-emerald-500 to-emerald-700 text-white hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2"
              onClick={() => writeContractAsync({ functionName: "claim" })}
            >
              <ArrowRight className="w-4 h-4" />
              Claim Rewards
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
