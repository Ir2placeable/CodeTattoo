const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

const channel_title = 'mychannel'
const ccpPath = path.resolve(__dirname, '/blockchain', 'connection-org1.json');
const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
const walletPath = path.join(process.cwd(), 'wallet');
const wallet = await Wallets.newFileSystemWallet(walletPath);
const identity = await wallet.get('appUser');
if (!identity) {
    console.log('An identity for the user "appUser" does not exist in the wallet');
    console.log('Run the registerUser.js application before retrying');
    return;
}

exports.query = async function(params) {
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel_title);

        // Get the contract from the network.
        const contract = network.getContract('codeTattoo');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(getTattooLatest, params);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
exports.queryAll = async function(params) {
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel_title);

        // Get the contract from the network.
        const contract = network.getContract('codeTattoo');

        // Evaluate the specified transaction.
        const result = await contract.evaluateTransaction(getTattooHistory, params);
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
exports.invoke = async function(function_name, params) {
    try {
        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channel_title);

        // Get the contract from the network.
        const contract = network.getContract('codeTattoo');

        await contract.submitTransaction(function_name, params);
        console.log('Transaction has been submitted');

        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch (error) {
        console.error(`Failed to submit transaction: ${error}`);
        process.exit(1);
    }
}