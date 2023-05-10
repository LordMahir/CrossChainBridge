const Event = artifacts.require("Event");
module.exports = async function (deployer) {
  await deployer.deploy(Event);
};
