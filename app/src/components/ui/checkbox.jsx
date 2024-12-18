import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"

import { cn } from "@src/lib/utils"
import { Children, forwardRef } from "react"

const Checkbox = forwardRef(({ children, className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer relative h-4 w-4 shrink-0 rounded-md border border-stroke-contrast-strong ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral data-[state=checked]:text-contrast",
      className
    )}
    {...props}>
    {
        Children.count(children) > 0 ?
        children :
        <CheckboxPrimitive.Indicator className={cn("flex items-center justify-center text-current")}>
          <Check className="absolute t-0 l-0 h-3/4 w-3/4 text-text-contrast" />
        </CheckboxPrimitive.Indicator>
    }
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName


export { Checkbox }