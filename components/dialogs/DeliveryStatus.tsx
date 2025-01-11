"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function DeliveryStatus({ diet }: { diet: any }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(diet.status);
  const [notes, setNotes] = useState(diet.deliveryNotes || "");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/delivery/${diet.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          deliveryNotes: notes,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Delivery status updated");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to update delivery status");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Update Delivery</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Delivery Status</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label>Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="CONFIRM_DELIVERY">Confirm Delivery</SelectItem>
                <SelectItem value="ON THE WAY">On the Way</SelectItem>
                <SelectItem value="DELIVERY_COMPLETED">Completed</SelectItem>
                <SelectItem value="DELIVERY_FAILED">Failed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label>Delivery Notes</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes or issues..."
            />
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Updating..." : "Update Status"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
