"use strict"

const db = require("../server/db")
const { User, Product } = require("../server/db/models")

const dummyData = [
  {
    name: "Space flip-flop",
    description: "Weightless",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/81457181069M-01--IMG_300--TRADIZORISANDALBLACKBLACK--1306645300.jpg",
    price: 26.99,
    size: "S",
    color: "black",
    filter: ["men", "women", "children"],
    quantity: 15
  },
  {
    name: "Beach flip-flop",
    description: "Not comfortable",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41445207611W-01--IMG_300--TOPVIBESSANDALGREENDEW-1877201726.jpg",
    price: 26.99,
    size: "S",
    color: "multi-color",
    filter: ["men", "women", "children"],
    quantity: 1
  },
  {
    name: "Rough terrain flip-flop",
    description: "Very fashionable",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41406884896M-01--IMG_300--URBANSPECIALSANDALOLIVEGREEN-999871149.jpg",
    price: 26.99,
    size: "S",
    color: "green",
    filter: ["men", "women", "children"],
    quantity: 3
  },
  {
    name: "Construction flip-flop",
    description: "Safe in hard hat areas",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41351960074M-01--IMG_300--URBANCRAFTSANDALNEWGRAPHITE-1961020912.jpg",
    price: 26.99,
    size: "L",
    color: "black",
    filter: ["men", "women", "children"],
    quantity: 941
  },
  {
    name: "Athletic flip-flop",
    description: "Incredible traction!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41234353498M-01--IMG_300--POWERSANDALICEGREY--2125135874.jpg",
    price: 26.99,
    size: "M",
    color: "grey",
    filter: ["men", "women", "children"],
    quantity: 21
  },
  {
    name: "Men's flippy-flop",
    description: "The best shoes! Men Only!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41457185784W-01--IMG_300--TRADIZORISANDALPINKFLUX--2056590703.jpg",
    price: 26.99,
    size: "M",
    color: "yellow",
    filter: ["men"],
    quantity: 51
  },
  {
    name: "Thongs",
    description: "Aussies Mate!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41445347598W-01--IMG_300--SLIMSUMMERSANDALLEMONYELLOW-274386799.jpg",
    price: 6.99,
    size: "L",
    color: "yellow",
    filter: ["men", "women", "children"],
    quantity: 5
  },
  {
    name: "Breathable Sandals",
    description: "Great Grip and Fit!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41443630121W-01--IMG_300--YOUSTTROPEZMATERIALSANDALBEIGE--1653915014.jpg",
    price: 12.69,
    size: "M",
    color: "orange",
    filter: ["men", "women", "children"],
    quantity: 100
  },
  {
    name: "Children's Sandal",
    description: "For Kids!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/41444901652K-01--IMG_300--KIDSLIONKINGSANDALBANANAYELLOW--1782226047.jpg",
    price: 8.99,
    size: "S",
    color: "brown",
    filter: ["children"],
    quantity: 90
  },
  {
    name: "Women's High Fashion",
    description: "Unpractical!",
    imageUrl:
      "https://s3.amazonaws.com/havaianas3-java/images/skus/40000392976W-01--IMG_300--FLASHURBANSANDALBLACKSILVER-1263956354.jpg",
    price: 89.99,
    size: "S",
    color: "black",
    filter: ["women"],
    quantity: 7
  }
]

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
