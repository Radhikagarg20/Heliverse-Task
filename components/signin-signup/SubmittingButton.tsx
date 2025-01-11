"use client";

import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export default function SubmittingButton({ 
  text, 
  pending 
}: { 
  text: string;
  pending?: boolean;
}) {
  const { pending: formPending } = useFormStatus();
  const isPending = pending || formPending;

  return (
    <Button className="w-full" type="submit" disabled={isPending}>
      {isPending ? "Please wait..." : text}
    </Button>
  );
}
