/* global describe beforeEach it */

import { expect } from "chai"
import React from "react"
import enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { AllItems } from "./allItems"
import { mount } from "enzyme"

const adapter = new Adapter()
enzyme.configure({ adapter })

const products = [
  {
    id: 1,
    name: "a flip-flop",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
  }
]
describe("AllItems", () => {
  let allItems

  beforeEach(() => {
    const user = {
      isAdmin: true
    }
    allItems = shallow(
      <AllItems
        products={products}
        user={user}
        getAllProducts={() => undefined}
      />
    )
  })

  it("renders the list items", () => {
    expect(allItems.find("p").text()).to.be.equal("a flip-flop")
  })
  it("renders one image if given one product", () => {
    expect(allItems.find("Image")).to.have.length(1)
  })

  it("renders two images if given two products", () => {
    const user = {
      isAdmin: true
    }
    const twoProducts = [
      {
        id: 1,
        name: "a flip-flop",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
      },
      {
        id: 2,
        name: "another flip-flop",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
      }
    ]
    let allItemsWithTwoProducts = shallow(
      <AllItems
        products={twoProducts}
        user={user}
        getAllProducts={() => undefined}
      />
    )
    expect(allItemsWithTwoProducts.find("Image")).to.have.length(2)
  })

  it("renders two 'Add to cart' buttons", () => {
    expect(allItems.find("Button")).to.have.length(2)
  })
})
