const Bridge = artifacts.require('./Bridge.sol');

module.exports = async done => {
  const [recipient, _] = await web3.eth.getAccounts();
  const bridge = await Bridge.deployed();
  await bridge.burn(recipient, 1000);
  done();
}
