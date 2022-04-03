const multiSender = artifacts.require("multiSender");

module.exports = async function (deployer, network, accounts) {
  await deployer.deploy(multiSender);

};
