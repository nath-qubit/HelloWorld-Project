import { expect } from "chai";
import { ethers } from "hardhat";
// eslint-disable-next-line node/no-missing-import
import { HelloWorld } from "../typechain";

describe("HelloWorld", function() {
    let helloWorldContract: HelloWorld;

    beforeEach(async function() {
        const helloWorldFactory = await ethers.getContractFactory("HelloWorld");
        helloWorldContract = await helloWorldFactory.deploy();
        await helloWorldContract.deployed();
    });

    it("Should return 'Hello, World!'", async function() {
        expect(await helloWorldContract.readText()).to.equal("Hello, World!");
    });

    it("Should set the owner to the deployer of the contract", async function() {
        const accounts = await ethers.getSigners();
        expect(await helloWorldContract.owner()).to.equal(accounts[0].address);
    });

    it("Should not allow anyone other than owner to call transferOwnership", async function () {
        const accounts = await ethers.getSigners();
        await expect(
          helloWorldContract
            .connect(accounts[1])
            .transferOwnership(accounts[1].address)
        ).to.be.revertedWith("Caller is not the owner");
    });

    it("Should change text correctly", async function () {
        expect(await helloWorldContract.readText()).to.equal("Hello, World!");

        const setText = await helloWorldContract.setText("Hello, Hardhat!");
        await setText.wait();
        expect(await helloWorldContract.readText()).to.equal("Hello, Hardhat!");
    });

    it("Should not allow anyone other than owner to call setText", async function () {
        const accounts = await ethers.getSigners();
        await expect(
          helloWorldContract
            .connect(accounts[1])
            .setText("Hello, Hardhat!")
        ).to.be.revertedWith("Caller is not the owner");
    });
});
