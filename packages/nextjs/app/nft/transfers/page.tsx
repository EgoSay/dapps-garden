"use client";

import type { NextPage } from "next";
import { Address } from "~~/components/scaffold-eth";
import { Badge } from "~~/components/ui/badge";
import { EventList } from "~~/components/events/EventList";

const Transfers: NextPage = () => {
  return (
    <EventList
      contractName="YourCollectible"
      eventName="Transfer"
      title="Transfer Events"
      description="Track all NFT transfers on the blockchain"
      columns={[
        {
          header: "Token ID",
          accessor: (args) => (
            <Badge variant="outline">#{args.tokenId?.toString()}</Badge>
          ),
        },
        {
          header: "From",
          accessor: (args) => <Address address={args.from} />,
        },
        {
          header: "To",
          accessor: (args) => <Address address={args.to} />,
        },
      ]}
    />
  );
};

export default Transfers;

