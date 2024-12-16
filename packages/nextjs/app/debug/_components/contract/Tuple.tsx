"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ContractInput } from "./ContractInput";
import { getFunctionInputKey, getInitialTupleFormState } from "./utilsContract";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "~~/components/ui/collapsible";
import { cn } from "~~/lib/utils";
import { replacer } from "~~/utils/scaffold-eth/common";
import { AbiParameterTuple } from "~~/utils/scaffold-eth/contract";

type TupleProps = {
  abiTupleParameter: AbiParameterTuple;
  setParentForm: Dispatch<SetStateAction<Record<string, any>>>;
  parentStateObjectKey: string;
  parentForm: Record<string, any> | undefined;
};

export const Tuple = ({ abiTupleParameter, setParentForm, parentStateObjectKey }: TupleProps) => {
  const [form, setForm] = useState<Record<string, any>>(() => getInitialTupleFormState(abiTupleParameter));
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const values = Object.values(form);
    const argsStruct: Record<string, any> = {};
    abiTupleParameter.components.forEach((component, componentIndex) => {
      argsStruct[component.name || `input_${componentIndex}_`] = values[componentIndex];
    });

    setParentForm(parentForm => ({ ...parentForm, [parentStateObjectKey]: JSON.stringify(argsStruct, replacer) }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(form, replacer)]);

  return (
    <div>
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-muted pl-4 py-1.5 rounded-md border border-border"
      >
        <CollapsibleTrigger className="flex w-full items-center justify-between py-1.5 pl-1 text-sm hover:bg-muted/50">
          <p className="m-0 p-0 text-[1rem] text-muted-foreground">{abiTupleParameter.internalType}</p>
          <div className={cn("h-4 w-4 transition-transform", isOpen ? "rotate-180" : "")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="ml-3 flex-col space-y-4 border-l-2 border-border/80 pl-4">
            {abiTupleParameter?.components?.map((param, index) => {
              const key = getFunctionInputKey(abiTupleParameter.name || "tuple", param, index);
              return <ContractInput setForm={setForm} form={form} key={key} stateObjectKey={key} paramType={param} />;
            })}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
