import { useCallback } from "react";
import { hexToString, isHex, stringToHex } from "viem";
import { CommonInputProps, InputBase } from "~~/components/scaffold-eth";
import { Button } from "~~/components/ui/button";
import { cn } from "~~/lib/utils";

export const Bytes32Input = ({ value, onChange, name, placeholder, disabled }: CommonInputProps) => {
  const convertStringToBytes32 = useCallback(() => {
    if (!value) {
      return;
    }
    onChange(isHex(value) ? hexToString(value, { size: 32 }) : stringToHex(value, { size: 32 }));
  }, [onChange, value]);

  return (
    <InputBase
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      disabled={disabled}
      suffix={
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "px-3 font-semibold text-xl",
            "hover:bg-transparent hover:text-primary",
            !value && "opacity-50 cursor-not-allowed",
          )}
          onClick={convertStringToBytes32}
          disabled={!value}
        >
          #
        </Button>
      }
    />
  );
};
