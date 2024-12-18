import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@src/lib/utils"

const buttonVariants = cva(`
    inline-flex
    items-center
    justify-center
    whitespace-nowrap
    rounded-lg
    text-sm
    font-medium
    ring-offset-background
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-ring
    focus-visible:ring-offset-2
    disabled:pointer-events-none
    disabled:opacity-50
    transition-all
    `, {
        variants: {
            variant: {
                default: `
                    bg-brand
                    text-text-neutral
                `,
                secondary: `
                    bg-icon-neutral
                    text-text-contrast
                `,
                    //hover:bg-accent/75
                disabled: `
                    bg-neutral
                    text-text-contrast/50
                `,
                    //hover:text-text-contrast/50
                    //hover:cursor-not-allowed
                destructive: `
                    bg-error
                    text-text-contrast
                    
                `,
                outline:`
                    border
                    border-brand
                    bg-transparent
                    text-text-contrast
                `,
                icon:`
                    bg-transparent
                    text-icon-neutral
                `,
                link:`
                    text-primary
                    bg-transparent
                    text-text-contrast
                    underline-offset-4
                    hover:underline
                `,
                empty:''
            },
            size: {
                default: "h-10 px-4 py-2",
                sm: "h-9 rounded-md px-3",
                lg: "h-11 rounded-md",
                icon: "",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
        (<Comp
            className={cn(buttonVariants({ variant, size, className }))}
            ref={ref}
            {...props} />)
    );
})
Button.displayName = "Button"

export { Button, buttonVariants }
