const multiSender = artifacts.require('multiSender')

module.exports = async function payOut(callback){

    function ETH(n) {
        return web3.utils.toWei(n, 'ether')
    }
    
    const accounts = await web3.eth.getAccounts(); // Using web3 to get accounts from Ganache
    let multisender = await multiSender.deployed()

    // Sending 1 ether to each of the account
    await multisender.payOut([accounts[1] , accounts[2], accounts[3], accounts[4]], [ETH("1") , ETH("1"), ETH("1"), ETH("1")])
    console.log("Paid successfully")
    callback()
}