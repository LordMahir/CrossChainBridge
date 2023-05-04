// FOR TRANSACTION OF TOKENS ->

// const Bridge = artifacts.require('Bridge');
// const Token = artifacts.require('Token');

// module.exports = async function (deployer, network, addresses) {

//     if(network == "eth1"){
//         await deployer.deploy(Token, 'Token', 'TX');
//         const token = await Token.deployed();
//         await token.mint(addresses[0], 1000);  
//         await deployer.deploy(Bridge, token.address);
//         const bridge = await Bridge.deployed();
//         await token.updateAdmin(bridge.address);
//     }
//     if(network == "eth2"){
//         await deployer.deploy(Token, 'Token', 'TX');
//         const token = await Token.deployed();
//         await deployer.deploy(Bridge, token.address);
//         const bridge = await Bridge.deployed();
//         await token.updateAdmin(bridge.address);
//     }
   
// };

// FOR DATA TRANSFERRING ->

const Bridge = artifacts.require('Event');

module.exports = async function (deployer, network, addresses) {
    if(network == "eth1"){
        // await  deployer.deploy(Token, 'Token', 'TX');
        // const token = await Token.deployed();  
        await deployer.deploy(Bridge, token.address);
        await token.mint(addresses[0], "hello other blockchain");
        // const bridge = await Bridge.deployed();
        // await token.updateAdmin(bridge.address);
    }
    if(network == "eth2"){
        // await deployer.deploy(Token, 'Token', 'TX');
        // const token = await Token.deployed();
        await deployer.deploy(Bridge, token.address);
        // const bridge = await Bridge.deployed();
        // await token.updateAdmin(bridge.address);
    }
};