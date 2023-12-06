import { ethers } from "hardhat"
import {
  CallRevertWithTryCatch,
  CallRevertWithTryCatchInConstructor,
  CallRevertWithTryCatchInConstructor__factory,
  CallRevertWithTryCatchInDepth,
  CallRevertWithoutTryCatch,
  Revert
} from "../typechain-types"
import { expect } from "chai"

describe("Revert", function () {
  let revert: Revert
  let revertWithoutTryCatch: CallRevertWithoutTryCatch
  let revertWithTryCatch: CallRevertWithTryCatch
  let revertWithTryCatchInDepth: CallRevertWithTryCatchInDepth
  beforeEach("Deploy", async function () {
    const Revert = await ethers.getContractFactory("Revert")
    revert = await Revert.deploy()
    const CallRevertWithoutTryCatch = await ethers.getContractFactory("CallRevertWithoutTryCatch")
    revertWithoutTryCatch = await CallRevertWithoutTryCatch.deploy()
    const CallRevertWithTryCatch = await ethers.getContractFactory("CallRevertWithTryCatch")
    revertWithTryCatch = await CallRevertWithTryCatch.deploy()
    const CallRevertWithTryCatchInDepth = await ethers.getContractFactory("CallRevertWithTryCatchInDepth")
    revertWithTryCatchInDepth = await CallRevertWithTryCatchInDepth.deploy()
  })

  it("Call revert in try catch", async function () {

    expect(await revert.state()).to.equal(1)
    expect(await revertWithTryCatch.state()).to.equal(1)
    //call CallRevertWithTryCatch.test(Revert)
    const tx = await revertWithTryCatch.test(revert.address)
    await tx.wait(1)

    expect(await revert.state()).to.equal(1)
    expect(await revertWithTryCatch.state()).to.equal(4)
  })

  it("Call revert in deep try catch", async function () {

    expect(await revert.state()).to.equal(1)
    expect(await revertWithTryCatch.state()).to.equal(1)
    expect(await revertWithTryCatchInDepth.state()).to.equal(1)

    //CallRevertWithTryCatchInDepth.test(CallRevertWithTryCatch, Revert)
    const tx = await revertWithTryCatchInDepth.test(revertWithTryCatch.address, revert.address)
    await tx.wait(1)

    expect(await revert.state()).to.equal(1)
    expect(await revertWithTryCatch.state()).to.equal(4)
    expect(await revertWithTryCatchInDepth.state()).to.equal(3)
  })

  it("Call revert in constructor", async function () {
    expect(await revert.state()).to.equal(1)
    const RevertInConstructor = await ethers.getContractFactory("CallRevertWithTryCatchInConstructor")
    const revertInConstructor = await RevertInConstructor.deploy(revert.address)
    expect(await revert.state()).to.equal(1)
    expect(await revertInConstructor.state()).to.equal(4)
  })

  it("Call revert without try-catch", async function () {
    expect(await revert.state()).to.equal(1)
    expect(await revertWithoutTryCatch.state()).to.equal(1)

    const tx = await revertWithoutTryCatch.test(revert.address, {gasLimit: 200000});
    try {
      await tx.wait()
    } catch (error: unknown) {
      const message = (error as Error).message
      // console.log(message);
      expect(message).to.contain('CALL_EXCEPTION')
    }

    expect(await revert.state()).to.equal(1)
    expect(await revertWithoutTryCatch.state()).to.equal(1)

  })
})
