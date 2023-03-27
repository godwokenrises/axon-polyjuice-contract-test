import { ethers } from "hardhat"
import { expect } from "chai"

describe("Contract create contract test", () => {
  it("Test", async () => {
    const CreateContract = await ethers.getContractFactory('MomContract')
    const momContract = await CreateContract.deploy()
    const ssAddress = await momContract.ss();
    console.log(`ss address: ${ssAddress}`)
    const ss = await ethers.getContractAt('InnerSimpleStorage', ssAddress)
    expect(await ss.get()).equal(255)
  })
})
