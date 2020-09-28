"use strict"

const db = require("../server/db")
const { User, Product } = require("../server/db/models")

const dummyData = [
  {
    name: "Flip-Flops",
    description: "very comfortable",
    imageUrl:
      "https://ae01.alicdn.com/kf/HTB1zGbQdbZnBKNjSZFKq6AGOVXan/Women-Sandals-Plus-Size-34-43-Gladiator-Sandals-2018-Summer-Summer-Shoes-Woman-Beach-New-Style.jpg",
    price: 26.99,
    size: "S",
    color: "red",
    filter: ["men", "women", "children"],
    quantity: 15
  },
  {
    name: "beach flip-flops",
    description: "not comfortable",
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.4kfBwCFjz9DBrllqz3pL1gHaFj&pid=Api",
    price: 26.99,
    size: "S",
    color: "red",
    filter: ["men", "women", "children"],
    quantity: 1
  },
  {
    name: "rough terrain flip-flop",
    description: "very fashionable",
    imageUrl:
      "https://ae01.alicdn.com/kf/HTB1zzBDhXGWBuNjy0Fbq6z4sXXaE/Plus-Size-13-Metallic-Platform-Sandals-Ankle-Strap-Chunky-Heel-Bling-Bling-Glitter-Sandals-2018-Summer.jpg",
    price: 26.99,
    size: "S",
    color: "red",
    filter: ["men", "women", "children"],
    quantity: 3
  },
  {
    name: "construction flip-flop",
    description: "safe in hard hat areas",
    imageUrl:
      "https://images.askmen.com/fashion/galleries/men-s-sandals-what-women-think-136985632716.jpg",
    price: 26.99,
    size: "L",
    color: "orange",
    filter: ["men", "women", "children"],
    quantity: 941
  },
  {
    name: "athletic flip-flop",
    description: "incredible traction!",
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIP.dL-8Ty3wTjy-u9YHuF6EtAHaFj&pid=Api",
    price: 26.99,
    size: "M",
    color: "yellow",
    filter: ["men", "women", "children"],
    quantity: 21
  },
  {
    name: "Mens flippy-flops",
    description: "the best shoes! Men Only!",
    imageUrl:
      "https://tse2.mm.bing.net/th?id=OIP.dL-8Ty3wTjy-u9YHuF6EtAHaFj&pid=Api",
    price: 26.99,
    size: "M",
    color: "yellow",
    filter: ["men"],
    quantity: 51
  },
  {
    name: "thongs",
    description: "Aussies Mate!",
    imageUrl:
      "https://tse1.mm.bing.net/th?id=OIP.lPKdYPV1It_Y4t3h_cbZSQHaFj&pid=Api",
    price: 6.99,
    size: "L",
    color: "bronw",
    filter: ["men", "women", "children"],
    quantity: 5
  },
  {
    name: "Breathable Sandals",
    description: "Great Grip and Fit!",
    imageUrl:
      "https://tse4.mm.bing.net/th?id=OIP.qZJpypfmw9kKencnlzNhiwAAAA&pid=Api",
    price: 12.69,
    size: "M",
    color: "orange",
    filter: ["men", "women", "children"],
    quantity: 100
  },
  {
    name: "Childrens Sandal",
    description: "For Kids!",
    imageUrl: "https://i.ebayimg.com/images/g/J2sAAOSwIs9c7VpH/s-l300.jpg",
    price: 8.99,
    size: "S",
    color: "grey",
    filter: ["children"],
    quantity: 90
  },
  {
    name: "Womens High Fashion",
    description: "Unpractical! Avoid Women from Running",
    imageUrl:
      "https://tse1.mm.bing.net/th?id=OIP.wKhvZY9iO5sVOCnbzaBwqAAAAA&pid=Api",
    price: 89.99,
    size: "S",
    color: "purple",
    filter: ["women"],
    quantity: 7
  }
]

const productsGenerator = (numberOfProducts) => {
  //Possible filters for our schema - these must return as arrays due to database structure
  const filters = [
    ["men", "women", "children"],
    ["men", "women"],
    ["men"],
    ["women, children"],
    ["women"],
    ["children"],
    ["children", "men"]
  ]

  // A list of colors to choose from at random
  const colors = [
    "blue",
    "red",
    "green",
    "yellow",
    "orange",
    "chartruse",
    "purple",
    "black",
    "white",
    "brown",
    "rainbow",
    "grey",
    "ivory",
    "indigo",
    "khaki",
    "gold",
    "silver",
    "copper",
    "slate",
    "peaarlescent"
  ]

  // Size options
  const sizes = ["S", "M", "L"]

  // Some lorem ipsum for description filler
  const loremIpsum = `Laudantium molestias ea maxime sunt. Laborum et aspernatur sed. Quo et impedit corporis fugit ut ut quam. Voluptate eos voluptas velit perferendis doloribus doloribus. Sit ut voluptatem sapiente commodi soluta est qui voluptatibus. Et impedit laudantium earum aut non sint.`

  // Something to hold all these new products
  const randomProductArray = []

  // The goal of this is to loop through a given number, randomly choose values for each one,
  // and push them to the array above.
  for (let i = 0; i < numberOfProducts; i++) {
    let fillerObject = {
      name: `Flip-flop ${i + 1}`,
      description: loremIpsum,
      price: Math.floor(Math.random() * 100),
      color: colors[Math.floor(Math.random() * (colors.length - 1))],
      size: sizes[Math.floor(Math.random() * (sizes.length - 1))],
      filter: filters[Math.floor(Math.random() * (filters.length - 1))],
      quantity: Math.floor(Math.random() * 150)
    }
    randomProductArray.push(fillerObject)
  }
  return randomProductArray
}

// Now buld that array!
const fillMeUp = productsGenerator(Math.floor(Math.random() * 200))
async function seed() {
  await db.sync({ force: true })
  console.log("db synced!")

  const users = await Promise.all([
    User.create({ email: "cody@email.com", password: "123" }),
    User.create({ email: "murphy@email.com", password: "123" }),
    User.create({ email: "ada@email.com", password: "123" }),
    User.create({ email: "jeremy@email.com", password: "123" }),
    User.create({ email: "grace@email.com", password: "123" }),
    User.create({ email: "graham@email.com", password: "123" }),
    User.create({ email: "admin@email.com", password: "123", isAdmin: true })
  ])

  const products = await Promise.all(
    dummyData.map((sandal) => {
      return Product.create(sandal)
    })
  )

  const fillerProducts = await Promise.all(
    fillMeUp.map((product) => {
      return Product.create(product)
    })
  )

  console.log(`seeded ${fillerProducts.length} filler products`)
  console.log(`seeded ${users.length} users`)
  console.log(`Seeded ${products.length} products`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log("seeding...")
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log("closing db connection")
    await db.close()
    console.log("db connection closed")
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
