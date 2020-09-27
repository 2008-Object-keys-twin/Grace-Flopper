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
    allItems = shallow(
      <AllItems products={products} getAllProducts={() => undefined} />
    )
  })

  it("renders the list items", () => {
    expect(allItems.find("p").text()).to.be.equal("a flip-flop")
  })
  // it('renders the image', () => {
  //   console.log(allItems)
  //   expect(allItems.find('img').text()).to.be.equal('https://upload.wikimedia.org/wikipedia/commons/a/ab/2010-07-10-gdansk-by-RalfR-087.jpg')
  // })

  it("renders an 'Add to cart' button", () => {
    expect(allItems.find("button").text()).to.be.equal("Add to cart")
  })
})
