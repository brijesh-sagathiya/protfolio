import { cva } from "class-variance-authority";

export const sidebarVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      default: "",
      compact: "w-16",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
