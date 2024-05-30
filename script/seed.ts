const { PrismaClient } = require("@prisma/client");

const database = new PrismaClient();

async function main() {
  try {
    await database.category.createMany({
      data: [
        { name: "Development" },
        { name: "Business" },
        { name: "Finance & Accounting" },
        { name: "IT & Software" },
        { name: "Office Productivity" },
        { name: "Personal Development" },
        { name: "Design" },
        { name: "Marketing" },
        { name: "Lifestyle" },
        { name: "Photography & Video" },
        { name: "Health & Fitness" },
        { name: "Music" },
        { name: "Teaching & Academics" },
      ],
    });
    console.log("Categories seeded successfully");
  } catch (error) {
    console.log("Error seeding the database categories: ", error);
  } finally {
    database.$disconnect();
  }
}

main();
