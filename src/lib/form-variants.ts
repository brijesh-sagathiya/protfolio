import { cva } from "class-variance-authority";

export const formVariants = cva("flex flex-col gap-2", {
  variants: {
    variant: {
      default: "",
      inline: "flex-row items-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});
