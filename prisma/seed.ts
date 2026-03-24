import { prisma } from "./client"

async function main() {

    const users = await prisma.user.createMany({
    data: [
      { name: "Giorgi Jokhtaberidze", roomNumber: "CVF-1234257", email: "Girogi1@mail.ge" },
      { name: "Mariam Maisuradze", roomNumber: "HYJ-1234568", email: "Mariam123@mail.ge" },
      { name: "Nino miminoshvili", roomNumber: "QWD-1235674", email: "NinoMimi7@mail.ge" },
    ],
    skipDuplicates: true, // prevents error if run multiple times
  });

  const parcels = await prisma.parcel.createMany({
    data: [
      { trackingNumber: "AAA123133123ADSAD" },
      { trackingNumber: "BBB123133123ADSAD" },
      { trackingNumber: "CCC123133123ADSAD" },
      { trackingNumber: "DDD123133123ADSAD" },
      { trackingNumber: "EEE123133123ADSAD" },
      { trackingNumber: "FFF123133123ADSAD" },
      { trackingNumber: "GGG123133123ADSAD" },
      { trackingNumber: "HHH123133123ADSAD" },
      { trackingNumber: "III123133123ADSAD" },
      { trackingNumber: "JJJ123133123ADSAD" },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });