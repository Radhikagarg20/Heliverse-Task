"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { EditDietStatus } from "@/components/dialogs/EditDietStatus";
import { useSession } from "next-auth/react";
import { DeliveryStatus } from "../dialogs/DeliveryStatus";

export function DietCard({
  diet,
  deliveryStaff,
}: {
  diet: any;
  deliveryStaff?: any[];
}) {
  const { data: session } = useSession();
  const isPantryStaff = session?.user.role === "STAFF";
  const isAssignedDelivery =
    session?.user.role === "DELIVERY" &&
    diet.deliveredBy?.toString() === session.user.id;

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{diet.patient.name}</CardTitle>
            <CardDescription>
              Room {diet.patient.roomnumber}, Floor {diet.patient.floornumber}
            </CardDescription>
          </div>
          <Badge variant={diet.status === "ACTIVE" ? "default" : "secondary"}>
            {diet.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="text-sm">
            <span className="font-medium">Started:</span>{" "}
            {format(new Date(diet.startDate), "PPP")}
          </div>
          {diet.dietItems.length > 0 && (
            <div className="space-y-1">
              <p className="text-sm font-medium">Latest meals:</p>
              <div className="text-sm text-muted-foreground">
                {diet.dietItems.slice(0, 3).map((item: any) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <span>{item.mealtime}</span>
                    <Badge variant="outline">{item.status}</Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
          {diet.patient.allergies.length > 0 && (
            <div className="flex gap-1 flex-wrap">
              {diet.patient.allergies.map((allergy: string) => (
                <Badge key={allergy} variant="destructive">
                  {allergy}
                </Badge>
              ))}
            </div>
          )}
        </div>
        {isPantryStaff && (
          <div className="mt-4 pt-4 border-t">
            <EditDietStatus diet={diet} deliveryStaff={deliveryStaff!} />
          </div>
        )}
        {isAssignedDelivery && (
          <div className="mt-4 pt-4 border-t">
            <DeliveryStatus diet={diet} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
