import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@src/lib/utils"

const Slider = React.forwardRef(({ className, ...props }, ref) => {
  return (
  <SliderPrimitive.Root
    ref={ref}
    className={cn("relative flex w-full touch-none select-none items-center", className)}
    {...props}>
    <SliderPrimitive.Track
      className="relative w-full grow overflow-hidden rounded-full bg-neutral h-full">
      <SliderPrimitive.Range className="absolute h-full bg-contrast" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb
      className="block h-0 w-auto aspect-square rounded-full border-2 border-contrast bg-neutral ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" >
      </SliderPrimitive.Thumb>
  </SliderPrimitive.Root>
)})
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
