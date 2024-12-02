import InputMask from "react-input-mask";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface PhoneInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export function PhoneInput({ className, error, ...props }: PhoneInputProps) {
  return (
    <InputMask
      mask="(999) 999-9999"
      maskChar="_"
      formatChars={{
        '9': '[0-9]',
      }}
      beforeMaskedValueChange={({ value, selection }) => {
        // Remove all non-numeric characters
        const numericValue = value.replace(/\D/g, '');
        
        // If pasting, format the number
        if (numericValue.length === 10) {
          const formattedValue = `(${numericValue.slice(0,3)}) ${numericValue.slice(3,6)}-${numericValue.slice(6)}`;
          return {
            value: formattedValue,
            selection
          };
        }
        
        return {
          value,
          selection
        };
      }}
      {...props}
    >
      {(inputProps: any) => (
        <Input 
          {...inputProps}
          type="tel"
          className={cn(
            error && "border-destructive",
            className
          )}
        />
      )}
    </InputMask>
  );
}