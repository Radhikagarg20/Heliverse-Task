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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { MealTime } from "@prisma/client";

type Patient = {
  id: number;
  name: string;
  roomnumber: number;
  floornumber: number;
};

export function CreateDiet() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [formData, setFormData] = useState({
    patientId: "",
    mealtime: "",
    ingredients: "",
    instructions: "",
  });

  useEffect(() => {
    const fetchPatients = async () => {
      const response = await fetch("/api/patients");
      const data = await response.json();
      setPatients(data);
    };

    fetchPatients();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/diets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          ingredients: formData.ingredients.split(",").map((i) => i.trim()),
          instructions: formData.instructions
            .split("\n")
            .filter((i) => i.trim()),
        }),
      });

      if (!response.ok) {
        throw new Error("Diet creation Failed.");
      }

      toast.success("Diet successfully added.");
      setOpen(false);
      router.refresh();
      setFormData({
        patientId: "",
        mealtime: "",
        ingredients: "",
        instructions: "",
      });
    } catch (error) {
      console.log("error", error);
      toast.error("Diet creation Failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add New Diet</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Diet</DialogTitle>
          <DialogDescription>
            Create a diet plan for the patient
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="patient" className="text-right">
                Patient
              </Label>
              <Select
                name="patientId"
                value={formData.patientId}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, patientId: value }))
                }
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Choose patient" />
                </SelectTrigger>
                <SelectContent>
                  {patients.map((patient) => (
                    <SelectItem key={patient.id} value={patient.id.toString()}>
                      {patient.name} - Room {patient.roomnumber}, Floor{" "}
                      {patient.floornumber}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="mealtime" className="text-right">
                Meal Time
              </Label>
              <Select
                name="mealtime"
                value={formData.mealtime}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, mealtime: value }))
                }
                required
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select time" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(MealTime).map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="ingredients" className="text-right">
                Ingredients
              </Label>
              <Textarea
                id="ingredients"
                value={formData.ingredients}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ingredients: e.target.value,
                  }))
                }
                placeholder="Add ingredients (comma-separated)"
                className="col-span-3"
                required
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="instructions" className="text-right">
                Instructions
              </Label>
              <Textarea
                id="instructions"
                value={formData.instructions}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    instructions: e.target.value,
                  }))
                }
                placeholder="Add instructions (one per line)"
                className="col-span-3"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Diet"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
