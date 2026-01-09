import { PrismaClient, ReservationStatus, ReservationType, RoleName } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminRole = await prisma.role.upsert({
    where: { name: RoleName.ADMIN },
    update: {},
    create: { name: RoleName.ADMIN }
  });

  await prisma.user.upsert({
    where: { email: "admin@hospedagem-nexus.com" },
    update: {},
    create: {
      name: "Admin",
      email: "admin@hospedagem-nexus.com",
      password: "hashed-password",
      roleId: adminRole.id
    }
  });

  const house = await prisma.house.create({
    data: {
      name: "Casa Aurora",
      capacity: 8,
      notes: "Vista mar e piscina",
      rooms: {
        create: [
          {
            name: "Suíte 1",
            capacity: 2,
            beds: {
              create: [{ name: "Cama Queen", capacity: 2 }]
            }
          },
          {
            name: "Quarto 2A",
            capacity: 3,
            beds: {
              create: [
                { name: "Cama Solteiro", capacity: 1 },
                { name: "Cama Solteiro 2", capacity: 1 }
              ]
            }
          }
        ]
      }
    },
    include: { rooms: { include: { beds: true } } }
  });

  await prisma.reservation.create({
    data: {
      type: ReservationType.CASA,
      status: ReservationStatus.CONFIRMADA,
      startAt: new Date(),
      endAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
      guestName: "Maria Silva",
      price: 1250,
      paymentMethod: "Cartão",
      houseId: house.id
    }
  });

  await prisma.inventoryItem.create({
    data: {
      category: "ROUPA_CAMA",
      name: "Lençol 300 fios",
      quantity: 12,
      condition: "INTEGRO",
      replacementValue: 40,
      houseId: house.id
    }
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
