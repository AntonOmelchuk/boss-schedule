/* eslint-disable max-len */
import * as React from "react";

import { cn } from "@/lib/utils";

const Card = React.forwardRef(
  (
    {
      className,
      hoverable = false,
      bordered = true,
      compact = false,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl bg-zinc-950/70 text-zinc-100 backdrop-blur-md border border-amber-500/20 shadow-xl transition-all duration-300",
        bordered && "border border-amber-500/20",
        hoverable
          ? "hover:shadow-[0_0_25px_rgba(245,158,11,0.15)] hover:border-amber-500/60 hover:-translate-y-0.5"
          : "",
        compact ? "p-3 sm:p-4" : "p-0",
        className,
      )}
      {...props}
    />
  ),
);
Card.displayName = "Card";

const CardHeader = React.forwardRef(
  ({ className, spacing = "default", ...props }, ref) => {
    const spacingClasses = {
      compact: "flex flex-col space-y-1 p-4",
      default: "flex flex-col space-y-1.5 p-6",
      relaxed: "flex flex-col space-y-2 p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(spacingClasses[spacing], className)}
        {...props}
      />
    );
  },
);
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(
  ({ className, as = "h3", size = "default", ...props }, ref) => {
    const Component = as;
    const sizeClasses = {
      sm: "text-lg",
      default: "text-2xl",
      lg: "text-3xl",
    };

    return (
      <Component
        ref={ref}
        className={cn(
          "font-bold leading-none tracking-tight text-zinc-100",
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(
  ({ className, size = "default", ...props }, ref) => {
    const sizeClasses = {
      xs: "text-xs",
      sm: "text-sm",
      default: "text-sm",
    };

    return (
      <p
        ref={ref}
        className={cn(
          "text-amber-200/70 font-medium",
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(
  (
    { className, removeTopPadding = true, padding = "default", ...props },
    ref,
  ) => {
    const paddingClasses = {
      none: "p-0",
      sm: "px-4 py-3",
      default: "p-6",
      lg: "p-8",
    };

    return (
      <div
        ref={ref}
        className={cn(
          paddingClasses[padding],
          removeTopPadding && padding !== "none" ? "pt-0" : "",
          className,
        )}
        {...props}
      />
    );
  },
);
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef(
  ({ className, align = "center", direction = "row", ...props }, ref) => {
    const alignClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
    };

    const directionClasses = {
      row: "flex-row",
      column: "flex-col",
    };

    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center p-6 pt-0",
          alignClasses[align],
          directionClasses[direction],
          className,
        )}
        {...props}
      />
    );
  },
);
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
