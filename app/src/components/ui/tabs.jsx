import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@src/lib/utils"

const Tabs = TabsPrimitive.Root

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-text-secondary",
      className
    )}
    {...props} 
    />
))
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(`inline-flex
      items-center
      justify-center
      whitespace-nowrap
      rounded-sm
      px-3
      py-1.5
      font-medium
      transition-all
      disabled:pointer-events-none
      disabled:opacity-50
      bg-transparent
      text-text-secondary
      text-md
      uppercase
      focus:ring-0
      focus:outline-none
      data-[state=active]:bg-transparent
      data-[state=active]:text-text-contrast
      data-[state=active]:font-bold
      data-[state=active]:cursor-not-allowed
      data-[state=active]:pointer-events-none
      data-[state=active]:underline
      `,
      className
    )}
    {...props} />
))
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-neutral focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props} />
))
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
