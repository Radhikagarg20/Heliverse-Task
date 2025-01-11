const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { pantries, staffUsers, deliveryUsers, patients } = require('./data');

const prisma = new PrismaClient();

async function main() {
  try {
    await prisma.user.deleteMany();
    await prisma.task.deleteMany();
    await prisma.diet.deleteMany();
    await prisma.dietChart.deleteMany();
    await prisma.patient.deleteMany();
    await prisma.pantry.deleteMany();

    console.log("🗑️ Deleted existing data");

    const createdPantries = await Promise.all(
      pantries.map(pantry => prisma.pantry.create({ data: pantry }))
    );

    console.log("🏥 Created pantries");

    const hashedPassword = await bcrypt.hash("password123", 12);

    await Promise.all(
      staffUsers.map((user, index) =>
        prisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
            pantryId: createdPantries[index % createdPantries.length].id,
          },
        })
      )
    );

    console.log("👩‍🍳 Created staff users");

    await Promise.all(
      deliveryUsers.map(user =>
        prisma.user.create({
          data: {
            ...user,
            password: hashedPassword,
          },
        })
      )
    );

    console.log("🚚 Created delivery users");

    await Promise.all(
      patients.map(patient =>
        prisma.patient.create({
          data: patient,
        })
      )
    );

    console.log("🏥 Created patients");
    console.log("✅ Seeding completed successfully");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
