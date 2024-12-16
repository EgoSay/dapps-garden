import { ChangeEvent, FocusEvent, ReactNode, useCallback, useEffect, useRef } from "react";
import { CommonInputProps } from "~~/components/scaffold-eth";
import { Input } from "~~/components/ui/input";
import { cn } from "~~/lib/utils";

type InputBaseProps<T> = CommonInputProps<T> & {
  error?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
  reFocus?: boolean;
};

export const InputBase = <T extends { toString: () => string } | undefined = string>({
  name,
  value,
  onChange,
  placeholder,
  error,
  disabled,
  prefix,
  suffix,
  reFocus,
}: InputBaseProps<T>) => {
  const inputReft = useRef<HTMLInputElement>(null);

  const getInputStyles = () => {
    if (error) {
      return "border-destructive";
    }
    if (disabled) {
      return "opacity-50 bg-muted";
    }
    return "";
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value as unknown as T);
    },
    [onChange],
  );

  const onFocus = (e: FocusEvent<HTMLInputElement, Element>) => {
    if (reFocus !== undefined) {
      e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length);
    }
  };

  useEffect(() => {
    if (reFocus !== undefined && reFocus === true) inputReft.current?.focus();
  }, [reFocus]);

  return (
    <div className={cn("flex items-center rounded-full border-2", "bg-background text-foreground", getInputStyles())}>
      {prefix}
      <Input
        className={cn(
          "border-0 bg-transparent",
          "focus-visible:ring-0 focus-visible:ring-offset-0",
          "h-[2.2rem] min-h-[2.2rem] w-full px-4",
          "font-medium text-foreground",
          "placeholder:text-muted-foreground/50",
        )}
        placeholder={placeholder}
        name={name}
        value={value?.toString()}
        onChange={handleChange}
        disabled={disabled}
        autoComplete="off"
        ref={inputReft}
        onFocus={onFocus}
      />
      {suffix}
    </div>
  );
};
