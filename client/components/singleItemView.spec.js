/* global describe beforeEach it */

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
  const singleItemView = shallow(
    <SingleItemView products={products} match={match} />
  )
  it("renders the correct item", () => {
    expect(singleItemView.find("p").text()).to.be.equal("hard hat safe")
  })
})
