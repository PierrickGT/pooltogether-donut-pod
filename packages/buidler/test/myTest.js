const SmartContractWallet = artifacts.require("SmartContractWallet");

describe("My Dapp", function() {
  let accounts;
  let myContract;

  before(async function() {
    accounts = await web3.eth.getAccounts();
    console.log('accounts', accounts);

  });

  describe("My SmartContractWallet", function() {
    it("Should deploy my SmartContractWallet", async function() {
      myContract = await SmartContractWallet.new();
      console.log('myContract', myContract);

    });

    describe("owner()", function() {
      it("Should have an owner equal to the deployer", async function() {
        assert.equal(await myContract.owner(), accounts[0]);
      });
    });
  });
});
