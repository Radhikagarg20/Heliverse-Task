import { CreateDiet } from "@/components/dialogs/CreateDiet";
import { CreatePantry } from "@/components/dialogs/CreatePantry";
import { db } from "@/lib/db";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { DietCard } from "@/components/cards/DietCard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const [session, diets, deliveryStaff] = await Promise.all([
    getServerSession(authOptions),
    getDiets(),
    getDeliveryStaff(),
  ]);

  if (!session?.user) {
    redirect("/signin");
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex gap-4">
          {session?.user.role === "MANAGER" && (
            <>
              <CreatePantry />
              <CreateDiet />
            </>
          )}
        </div>
      </div>

      <div className="grid gap-6">
        <div className="rounded-lg border bg-card">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Current Diet Plans</h2>
            {diets && diets.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {diets.map((diet) => (
                  <DietCard
                    key={diet.id}
                    diet={diet}
                    deliveryStaff={deliveryStaff}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <p>No Diet Plans Available.</p>
                <p className="mt-2">Start by Creating a New Diet Plan!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

async function getDiets() {
  try {
    const diets = await db.dietChart.findMany({
      where: {
        status: "ACTIVE",
      },
      include: {
        patient: {
          select: {
            name: true,
            roomnumber: true,
            floornumber: true,
            diseases: true,
            allergies: true,
          },
        },
        dietItems: {
          include: {
            preparedBy: {
              select: {
                name: true,
              },
            },
            deliveryStaff: {
              select: {
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return diets;
  } catch (err) {
    console.error("Failed to Fetch Diets:", err);
    return [];
  }
}

async function getDeliveryStaff() {
  try {
    return await db.user.findMany({
      where: {
        role: "DELIVERY",
      },
      select: {
        id: true,
        name: true,
      },
    });
  } catch (error) {
    console.error("Error fetching staff:", error);
    return [];
  }
}
