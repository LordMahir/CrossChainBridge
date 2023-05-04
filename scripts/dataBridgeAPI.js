const Web3 = require('web3');

// import json file produced from truffle
const DataBridge = require('../build/contracts/Event_fire.json');

// web3 instances for both the blockchains
const web3Eth = new Web3('http://127.0.0.1:8501');
const web3ETh2 = new Web3('http://127.0.0.1:8503');

// address for admin
const adminPrivKey = 'mahir';
const { address: admin } = web3ETh2.eth.accounts.wallet.add(adminPrivKey);

// contract object on both the blockchains
const bridgeEth = new web3Eth.eth.Contract(
  DataBridge.abi,
  DataBridge.networks['1515'].address
);

const bridgeEth2 = new web3ETh2.eth.Contract(
  DataBridge.abi,
  DataBridge.networks['1516'].address
);

// Listening to the event fired in smart contract of first blockchain
// step 0 signifies Receives function
bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)

// On listening any event 
.on('data', async event => {
    
    // institating tx object to collect data received from function
    const { from, to, data_1, date} = event.returnValues;

    const tx = bridgeEth2.methods.receive(to, data_1);

    // estimiating gas price and gas cost
    const [gasPrice, gasCost] = await Promise.all([
        web3ETh2.eth.getGasPrice(),
        tx.estimateGas({from: admin}),
    ]);
    const data = tx.encodeABI();
    const txData = {
        from: admin,
        to: bridgeEth2.options.address,
        data,
        gas: gasCost,
        gasPrice
    };

    // send transaction here using sendTransaction fucntion which is used it to send a transaction that transfers some ether from one address to another.
    const receipt = await web3ETh2.eth.sendTransaction(txData);
    console.log(`Transaction hash: ${receipt.transactionHash}`);
    console.log(`
        Processed transfer:
        - from ${from} 
        - to ${to} 
        - data ${data} received
        - date ${date}
    `);
});