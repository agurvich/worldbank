import * as React from "react"

import { cn } from "@src/lib/utils"
import { Button } from "./button";

const Input = React.forwardRef(({ className, type, value, setValue=null, icon=null, ...props }, ref) => {

    const [isFocused, setIsFocused] = React.useState(false);

    React.useEffect(() => {
        const handleFocus = () => setIsFocused(true);
        const handleBlur = () => setIsFocused(false);

        const inputElement = ref.current;

        if (inputElement) {
            inputElement.addEventListener('focus', handleFocus);
            inputElement.addEventListener('blur', handleBlur);

            return () => {
                inputElement.removeEventListener('focus', handleFocus);
                inputElement.removeEventListener('blur', handleBlur);
            };
        }
    }, []);

  return (
      <div
        className={cn(
            "flex text-sm items-center border border-stroke-neutral-strong bg-neutral rounded-md px-3 py-2 relative",
            className
        )}
      >
        {icon && <span className="mr-2 text-icon-contrast">{icon}</span>}
        <input type={type} className={cn(`
                flex-1
                bg-transparent
                text-icon-contrast
                placeholder:text-icon-secondary
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-offset-0
                disabled:cursor-not-allowed
                disabled:opacity-50 
                w-16
                mr-2
            `)}
              ref={ref}
              value={value}
              {...props}
          />
          {false && ( //type === 'number' && (
            <div className={`
                ${true ? "flex" : "hidden" }
                flex-col absolute right-0 items-center mr-4
                flex-1
            `}>
                <Button 
                    variant="icon"
                    className="h-5 w-5 p-0 bg-neutral rounded-none text-text-contrast"
                    onClick={()=>setValue(1)}
                    >+</Button>
                <Button variant="icon" className="h-5 w-5 p-0 bg-neutral rounded-none text-text-contrast">-</Button>
            </div> 
        )} 
      </div>
  )
})
Input.displayName = "Input"

export { Input }
