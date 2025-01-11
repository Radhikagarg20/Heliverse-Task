"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
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
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";

export function EditDietStatus({ diet, deliveryStaff }: { diet: any, deliveryStaff: any[] }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(diet.status);
  const [notes, setNotes] = useState(diet.notes || "");
  const [selectedDeliveryStaff, setSelectedDeliveryStaff] = useState(diet.deliveryStaff?.id || "");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/diets/${diet.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          notes,
          deliveryStaffId: selectedDeliveryStaff,
        }),
      });

      if (!response.ok) throw new Error();

      toast.success("Diet status updated!");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Failed to update diet status.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Manage Diet</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Diet Status</DialogTitle>
          <DialogDescription>
            Update status and assign staff.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {/* Status Selection */}
            <div className="grid gap-2">
              <label>Current Status</label>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="IN_PREPARATION">In Preparation</SelectItem>
                  <SelectItem value="READY_FOR_DELIVERY">Ready for Delivery</SelectItem>
                  <SelectItem value="IN_DELIVERY">In Delivery</SelectItem>
                  <SelectItem value="DELIVERED">Delivered</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <label>Assign Delivery Staff</label>
              <Select
                value={selectedDeliveryStaff || undefined}
                onValueChange={setSelectedDeliveryStaff}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery staff" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">No Delivery Staff</SelectItem>
                  {deliveryStaff.map((staff) => (
                    <SelectItem key={staff.id} value={staff.id.toString()}>
                      {staff.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {selectedDeliveryStaff && selectedDeliveryStaff !== "unassigned" && (
                <p className="text-sm text-muted-foreground">
                  The delivery will be assigned to the chosen staff.
                </p>
              )}
            </div>

            <div className="grid gap-2">
              <label>Preparation/Delivery Notes</label>
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter preparation details or delivery instructions..."
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
