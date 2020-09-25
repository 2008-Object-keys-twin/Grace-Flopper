const { expect } = require("chai")
const db = require("../db")
const seed = require("../../../script/seed")
const { User, Product, Cart } = require("./")

describe("Sequelize model tests", () => {
  beforeEach(() => db.sync({ force: true }))
  afterEach(() => db.sync({ force: true }))

  it("Only allows emails in the email field", async () => {
    await expect(User.create({ email: "Not an email!" })).to.be.rejected
  })

  it("Requires that both an email and a password are supplied", async () => {
    await expect(User.create({})).to.be.rejected
    await expect(User.create({ email: "someperson@email.com", password: "" }))
      .to.be.rejected
    await expect(User.create({ email: "", password: "123" })).to.be.rejected
  })

  it("A user should be able to have many items in a cart", async () => {
    const user1 = await User.create({ email: "someperson@example.com" })
  })

  //   it("Creates products do display on the frontend", async () => {})

  //   it("Creates users and stores their relevant info", async () => {})

  //   it("")
})
