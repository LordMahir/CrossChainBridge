const Web3 = require('web3');
const Bridge = require('../build/contracts/Bridge.json');
// const BridgeEth2 = require('../build/contracts/BridgeEth2.json');

const web3Eth = new Web3('http://127.0.0.1:8501');
const web3ETh2 = new Web3('http://127.0.0.1:8503');
const adminPrivKey = 'mahir';
const { address: admin } = web3ETh2.eth.accounts.wallet.add(adminPrivKey);

const bridgeEth = new web3Eth.eth.Contract(
  Bridge.abi,
  Bridge.networks['1515'].address
);

const bridgeEth2 = new web3ETh2.eth.Contract(
  Bridge.abi,
  Bridge.networks['1516'].address
);

bridgeEth.events.Transfer(
  {fromBlock: 0, step: 0}
)

.on('data', async event => {
  const { from, to, amount, date, nonce } = event.returnValues;

  const tx = bridgeEth2.methods.mint(to, amount, nonce);
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
  const receipt = await web3ETh2.eth.sendTransaction(txData);
  console.log(`Transaction hash: ${receipt.transactionHash}`);
  console.log(`
    Processed transfer:
    - from ${from} 
    - to ${to} 
    - amount ${amount} tokens
    - date ${date}
  `);
});