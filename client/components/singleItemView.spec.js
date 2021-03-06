/* global describe beforeEach it */
/*
import { expect } from "chai"
import React from "react"
import enzyme, { shallow } from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import { SingleItemView } from "./singleItemView"

const adapter = new Adapter()
enzyme.configure({ adapter })

// faking a product list
const products = [
  {
    id: 1,
    name: "sick kicks",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
  },
  {
    id: 2,
    name: "hard hat safe",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
  },
  {
    id: 3,
    name: "tennis pro certified",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg"
  }
]
describe("SingleItemView", () => {
  const match = {
    params: {
      productId: 2
    }
  }
  const user = {
    isAdmin: true
  }
  const singleItemView = shallow(
    <SingleItemView products={products} match={match} user={user} />
  )
  it("renders the correct item", () => {
    expect(singleItemView.find("h3").text()).to.be.equal("hard hat safe")
  })
  // to fix the below test, if broken, just change 'button' to 'Button'
  it("renders an 'Add to cart' button", () => {
    expect(singleItemView.find("button").text()).to.be.equal("Add to cart")
  })
})
*/
