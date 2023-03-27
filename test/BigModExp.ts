import { ethers } from "hardhat"
import { BigModExp } from "../typechain-types"
import { expect } from "chai"

describe("Big Mod Exp", function () {
  let bigModExp: BigModExp
  before("Deploy", async function () {
    const BigModExp = await ethers.getContractFactory("BigModExp")
    bigModExp = await BigModExp.deploy()
  })

  it("Test Normal Case", async function () {
    expect(await bigModExp.callStatic.modExp(
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x000000000000000000000000000000000000000000000000000000000000003f",
        "0x0000000000000000000000000000000000000000000000000000000000000020",
        1111,
        1111,
        111
    )).to.ok
    expect(await bigModExp.callStatic.modExp(
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000021000", // Godwoken only support 132k
        "0x0000000000000000000000000000000000000000000000000000000000000020",
        1111,
        1111,
        111
    )).to.ok
  })

  it("Test Overflow Case", async function () {
    await expect(bigModExp.callStatic.modExp(
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x000000000000000000000000000000000000000000000000000000f00000003f",
        "0x0000000000000000000000000000000000000000000000000000000000000020",
        1111,
        1111,
        111
    )).to.reverted
    
    await expect(bigModExp.callStatic.modExp(
        "0x0000000000000000000000000000000000000000000000000000000000000001",
        "0x0000000000000000000000000000000000000000000000000000000000000020",
        "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff",
        1111,
        1111,
        111
    )).to.reverted
  })
})
