"use client";

import type { NextPage } from "next";
import { formatEther } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { EventList } from "~~/components/events/EventList";

const Stakings: NextPage = () => {
  return (
    <EventList
      contractName="Staker"
      eventName="Stake"
      title="All Staking Events"
      columns={[
        {
          header: "From",
          accessor: (args) => <Address address={args[0]} />,
        },
        {
          header: "Value",
          accessor: (args) => `${formatEther(args[1] || 0n)} ETH`,
        },
      ]}
    />
  );
};

export default Stakings;
