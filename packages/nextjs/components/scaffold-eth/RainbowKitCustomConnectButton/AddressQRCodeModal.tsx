import { QRCodeSVG } from "qrcode.react";
import { Address as AddressType } from "viem";
import { Address } from "~~/components/scaffold-eth";
import { Dialog, DialogContent, DialogTrigger } from "~~/components/ui/dialog";

type AddressQRCodeModalProps = {
  address: AddressType;
  modalId: string;
};

export const AddressQRCodeModal = ({ address, modalId }: AddressQRCodeModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <input type="checkbox" id={modalId} className="hidden" />
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <div className="space-y-3 py-6">
          <div className="flex flex-col items-center gap-6">
            <QRCodeSVG value={address} size={256} />
            <Address address={address} format="long" disableAddressLink onlyEnsOrAddress />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
