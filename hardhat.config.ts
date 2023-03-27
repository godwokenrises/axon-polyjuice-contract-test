import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
      {
        //for call code
        version:"0.4.24"
      },
      { // for polyjuice contracts
        version: "0.6.6",
        settings: {}
      },
      { version: "0.7.5" },
      { version: "0.8.6" },
      { version: "0.8.7" },
      { version: "0.8.9" },
      { version: "0.8.12" },
      { version: "0.8.13" },
    ], overrides: {}
  },
  networks: {
    axon_devnet: {
      url: "http://127.0.0.1:8000",
      accounts: ["0x37aa0f893d05914a4def0460c0a984d3611546cfb26924d7a7ca6e0db9950a2d"],
      chainId: 2022,
    },
  }
};

export default config;
