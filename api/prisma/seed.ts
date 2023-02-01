import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker';




const prisma = new PrismaClient()


const userData: Prisma.UserCreateInput[] = [
  {
    name: 'Alice',
    email: 'alice@prisma.io',
    posts: {
      create: [
        {
          title: 'Join the Prisma Slack',
          content: 'https://slack.prisma.io',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Nilu',
    email: 'nilu@prisma.io',
    posts: {
      create: [
        {
          title: 'Follow Prisma on Twitter',
          content: 'https://www.twitter.com/prisma',
          published: true,
        },
      ],
    },
  },
  {
    name: 'Mahmoud',
    email: 'mahmoud@prisma.io',
    posts: {
      create: [
        {
          title: 'Ask a question about Prisma on GitHub',
          content: 'https://www.github.com/prisma/prisma/discussions',
          published: true,
        },
        {
          title: 'Prisma on YouTube',
          content: 'https://pris.ly/youtube',
        },
      ],
    },
  },
]

function generateUserData() {
  let result: Prisma.UserCreateInput[] = [...userData];
  for (let i = 0; i < 1000; i++) {
    const name = faker.name.fullName(); 
    const email = faker.internet.email(); 
    result.push({
      name, email,
      posts: {
        create: [{
          title: faker.random.words(3),
          content: faker.company.catchPhrase(),
          published: faker.datatype.boolean()
        }]
      }
    })
  }
  return result;
}

async function main() {
  console.log(`Start seeding ...`)
  const data = generateUserData();
  for (const u of data) {
    const user = await prisma.user.create({
      data: u,
    })
    console.log(`Created user with id: ${user.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
