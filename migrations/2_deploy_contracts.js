const EnergyNft = artifacts.require("ERC721Full");
const Registry = artifacts.require("ERC6551Registry");
const AccountImpl = artifacts.require("SimpleERC6551Account");

module.exports =  async function(deployer) {
    await deployer.deploy(EnergyNft, "aaa");

    await deployer.deploy(Registry);

    await deployer.deploy(AccountImpl);

    console.log(`EnergyNft ${EnergyNft.address}, Registry ${Registry.address}, AccountImpl ${AccountImpl.address}`);

};