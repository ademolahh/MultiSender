// Using web3 here to send ether to the contract
const Web3 = require('web3');
const multiSender = require('./build/contracts/multiSender.json');

const init = async () => {
    const web3 = new Web3('http://127.0.0.1:7545');

    const id = await web3.eth.net.getId();
    const deployedNetwork = await multiSender.networks[id];
    const contract = new web3.eth.Contract(
        multiSender.abi,
        deployedNetwork.address
    );
    const addresses = await web3.eth.getAccounts();

    await web3.eth.sendTransaction({
        from: addresses[0],
        to: contract.options.address,
        value: '4400000000000000000'
    });

    console.log('Successful')
}

init();