import { BackButton } from "./BackButton";
import { ContractTabs } from "./ContractTabs";
import { Address, Balance } from "~~/components/scaffold-eth";
import { Card, CardContent } from "~~/components/ui/card";

export const AddressComponent = ({
  address,
  contractData,
}: {
  address: string;
  contractData: { bytecode: string; assembly: string } | null;
}) => {
  return (
    <div className="m-10 mb-20">
      <div className="flex justify-start mb-5">
        <BackButton />
      </div>
      <div className="col-span-5 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
        <div className="col-span-1 flex flex-col">
          <Card className="mb-6">
            <CardContent className="space-y-1 py-4 overflow-x-auto">
              <div className="flex">
                <div className="flex flex-col gap-1">
                  <Address address={address} format="long" onlyEnsOrAddress />
                  <div className="flex gap-1 items-center">
                    <span className="font-bold text-sm">Balance:</span>
                    <Balance address={address} className="text" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ContractTabs address={address} contractData={contractData} />
    </div>
  );
};
