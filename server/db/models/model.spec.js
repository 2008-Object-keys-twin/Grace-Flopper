const { expect } = require("chai")
const db = require("../db")
const seed = require("../../../script/seed")
const { User, Product, Cart } = require("./")

describe("Sequelize model tests", () => {
  beforeEach(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  const userdata = { name: "", email: "" }

  // it("Only allows emails in the email field", async () => {
  //   await expect(User.create({ email: "Not an email!" })).to.be.rejected
  // })

  it("A user should be able to have many items in a cart", async () => {
    const user1 = await User.create({ email: "someperson@example.com" })
  })

  //   it("Creates products do display on the frontend", async () => {})

  //   it("Creates users and stores their relevant info", async () => {})

  //   it("")
})
