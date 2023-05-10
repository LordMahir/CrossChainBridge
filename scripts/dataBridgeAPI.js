const Web3 = require("web3");

// import json file produced from truffle
const DataBridge = require("../build/contracts/Event.json");

// web3 instances for both the blockchains

const web3Eth = new Web3(
  new Web3.providers.WebsocketProvider("ws://127.0.0.1:8501")
);
const web3ETh2 = new Web3(
  new Web3.providers.WebsocketProvider("ws://127.0.0.1:8503")
);

// contract object on both the blockchains
const bridgeEth1 = new web3Eth.eth.Contract(
  DataBridge.abi,
  DataBridge.networks["1515"].address
);

const bridgeEth2 = new web3ETh2.eth.Contract(
  DataBridge.abi,
  DataBridge.networks["1516"].address
);

bridgeEth1.events
  .Transfer({ fromBlock: 870, step: 0 })
  .on("data", async (event) => {
    // // console.log("Event fired", event);
    console.log("Event fired");
    console.log(event.returnValues);
    
    // institating tx object to collect data received from function
    const { from, to, data, date } = event.returnValues;

    bridgeEth2.methods
      .receiv(from, data)
      .send({ from: to })
      .then((receipt) => {
        console.log("Received data successfully");
        console.log(receipt);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .on("error", console.error);
