CREATE TYPE "MealTime" AS ENUM ('MORNING', 'EVENING', 'NIGHT');
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE');
CREATE TYPE "Status" AS ENUM ('ACTIVE', 'INACTIVE', 'PENDING', 'COMPLETED');
CREATE TYPE "TaskStatus" AS ENUM ('PENDING', 'IN_PREPARATION', 'PREPARED', 'IN_DELIVERY', 'DELIVERED', 'CANCELLED');

ALTER TABLE "User" ADD COLUMN "pantryId" INTEGER;

CREATE TABLE "Patient" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "diseases" TEXT[],
    "allergies" TEXT[],
    "roomnumber" INTEGER NOT NULL,
    "bednumber" INTEGER NOT NULL,
    "floornumber" INTEGER NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender" NOT NULL,
    "phone" TEXT NOT NULL,
    "emergencyphone" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "DietChart" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3),
    "status" "Status" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DietChart_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Diet" (
    "id" SERIAL NOT NULL,
    "patientId" INTEGER NOT NULL,
    "mealtime" "MealTime" NOT NULL,
    "ingredients" TEXT[],
    "instructions" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dietChartId" INTEGER NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDING',
    "assignedTo" INTEGER,
    "deliveredBy" INTEGER,
    "deliveredAt" TIMESTAMP(3),

    CONSTRAINT "Diet_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Pantry" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pantry_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "Task" (
    "id" SERIAL NOT NULL,
    "dietId" INTEGER NOT NULL,
    "assignedTo" INTEGER NOT NULL,
    "pantryId" INTEGER NOT NULL,
    "status" "TaskStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Pantry"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "DietChart" ADD CONSTRAINT "DietChart_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_dietChartId_fkey" FOREIGN KEY ("dietChartId") REFERENCES "DietChart"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Diet" ADD CONSTRAINT "Diet_deliveredBy_fkey" FOREIGN KEY ("deliveredBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_dietId_fkey" FOREIGN KEY ("dietId") REFERENCES "Diet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_assignedTo_fkey" FOREIGN KEY ("assignedTo") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "Task" ADD CONSTRAINT "Task_pantryId_fkey" FOREIGN KEY ("pantryId") REFERENCES "Pantry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
