/* global describe beforeEach it */

const { expect } = require("chai")
const request = require("supertest")
const db = require("../db")
const app = require("../index")
const Cart = db.model("cart")

describe("Cart routes", () => {
  beforeEach(() => {
    return db.sync({ force: true })
  })

  describe("/api/cart/", () => {
    beforeEach(() => {
      return Cart.create({
        userId: 1,
        productId: 4
      })
    })

    it("PUT /api/cart/", async () => {
      const res = await request(app)
        .put("/api/cart/")
        .send({ userId: 1, productId: 1 })
        .expect(200)

      expect(res.body).to.be.an("array")
      expect(res.body[1].to.equal(true))
      //expect(res.body[0].userId.to.be.equal(1))
      expect(res.body[0].productId.to.be.equal(1))
      expect(res.body[0].quantity.to.be.equal(1))
    })
  }) // end describe('/api/cart')
}) // end describe('Cart routes')
