const Web3 = require("web3");
const DataBridge = require("../build/contracts/Event.json");

const web3Eth = new Web3("ws://127.0.0.1:8501");

const bridgeEth1 = new web3Eth.eth.Contract(
  DataBridge.abi,
  DataBridge.networks["1515"].address
);

// Trigger the Transfer event using the send() method
bridgeEth1.methods
  .send("0x74cF569283C4d3E3d6e06E1e604A625c468bf708", "Hello")
  .send({ from: "0x427cE2F2cb7630CFab186835a11853252Aa36eF3" })
  .then((receipt) => {
    console.log("Event triggered successfully");
    console.log(receipt);
  })
  .catch((error) => {
    console.log(error);
  });
