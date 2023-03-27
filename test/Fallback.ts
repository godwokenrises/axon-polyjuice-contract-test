import { expect } from "chai"
import { ethers } from "hardhat"

describe("Fallback Test",  () => {
  it("Test", async () => {
    const Fallback = await ethers.getContractFactory('FallbackFunction')
    const fallback = await Fallback.deploy()
    expect(await fallback.storedData()).to.equal(123)
    const [deployer] = await ethers.getSigners()
    const tx = await deployer.sendTransaction({to: fallback.address, data: '0x'})
    await tx.wait(1)
    expect(await fallback.storedData()).to.equal(999)
  })
})
