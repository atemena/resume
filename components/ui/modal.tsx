"use client";

import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./button";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

export function Modal({ open, onClose, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className={cn("bg-background rounded-md p-6 w-full max-w-md", className)}>
        {children}
        <button
          onClick={onClose}
          className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "absolute top-2 right-2")}
        >
          ✕
        </button>
      </div>
    </div>
  );
}
