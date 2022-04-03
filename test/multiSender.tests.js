const multiSender = artifacts.require("multiSender");

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('multiSender', (accounts) => {
    function ETH(n) {
        return web3.utils.toWei(n, 'ether')
    }
    let multisender
    before(async () => {
        multisender = await multiSender.new()

        // To send some ether to the contract
        await web3.eth.sendTransaction({
            from: accounts[0],
            to: multisender.address,
            value: ETH("4.4")
        });

    })

    // Test for the name 
    describe('ConfirmtheName', async () => {
        it('CorrectName', async () => {
            const name = await multisender.name()
            assert.equal(name, 'PayEmployees')

        })
    })

    describe('contracTest', async () => {
        it('balance', async () => {
            let balance = await multisender.getContractEthBalance()
            assert.equal(balance.toString(), ETH("4.4"))
        })

        it('getOwner', async () => {
            const owner = await multisender.owner()
            assert.equal(owner.toString(), accounts[0])

            const allAddress = await web3.eth.getAccounts(); // Using web3 to get accounts from Ganache

            // Testing the payout function for multiple accounts
            await multisender.payOut([allAddress[1], allAddress[2], allAddress[3]], [ETH("1"), ETH("1"), ETH("1")], {
                from: accounts[0]
            })
        })
        it('balance', async () => {
            let balance = await multisender.getContractEthBalance()
            assert.equal(balance.toString(), ETH("1.4"))

        })
    })
})