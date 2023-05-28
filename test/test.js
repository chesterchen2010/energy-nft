const EnergyNft = artifacts.require("ERC721Full");
const Registry = artifacts.require("ERC6551Registry");
const AccountImpl = artifacts.require("SimpleERC6551Account");

contract("ERC721Full", accounts => {

    let energyNft, registry, accountImpl;
    before(async () => {
        energyNft = await EnergyNft.deployed();
        registry = await Registry.deployed();
        accountImpl = await AccountImpl.deployed();
    });

	it('ERC6551 Account of NFT works', async () => {
		var impl = accountImpl.address;
		var chainId = await web3.eth.getChainId();
        var tokenContract = energyNft.address;
        var tokenId = 1;
		var salt = 1;//web3.utils.soliditySha3("");
        var initData = [];

        //mint erc721 nft
		await energyNft.mint();
        //create erc6551 account for the nft
		var ret = await registry.createAccount(impl,chainId,tokenContract,tokenId,salt,initData);
		var nftAccountAddr = ret.logs[0].args.account;

        //get owner from nft erc6551 account
        var nftAccount = await AccountImpl.at(nftAccountAddr);
		var owner0 = await nftAccount.owner();

		assert.equal(owner0, accounts[0], "owner0 address mismatch.");

        //transfer nft, the owner changes
        var from = owner0;
        var to = accounts[1];
        await energyNft.transferFrom(from,to,tokenId);
        var owner1 = await nftAccount.owner();

        assert.equal(owner1, accounts[1], "owner1 address mismatch.");
	});

})