/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'codeTattooApp', 'wallet')

exports.test = async function(key) {
    try {
        const ccpPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'connection-org1.json');
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));
        console.log('ccpPath done')

        const walletPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'codeTattooApp', 'wallet')
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log('wallet path done')

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get('appUser');
        if (!identity) {
            console.log('An identity for the user "appUser" does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }
        console.log('identity done')

        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: false, asLocalhost: false } })

        console.log('gateway done')

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel')
        console.log('channel done')
        // Get the contract from the network.
        const contract = network.getContract('codeTattoo');
        console.log('contract done')

        await contract.submitTransaction('newTattoo', key, 'owner_info', 'timestamp');
        console.log('transaction done')
        // Disconnect from the gateway.
        await gateway.disconnect();
    } catch(e) {
        console.log(e)
        process.exit(1)
    }

}
exports.invoke = async function(function_name, key, params) {
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } })

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel')
    // Get the contract from the network.
    const contract = network.getContract('codeTattoo');
    await contract.submitTransaction(function_name, key, params);
    // Disconnect from the gateway.
    await gateway.disconnect();
}

exports.query = async function(key) {
    // load the network configuration
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('codeTattoo');

    const result = await contract.evaluateTransaction('getTattooLatest', key);

    // Disconnect from the gateway.
    await gateway.disconnect();

    return JSON.parse(result.toString())
}

exports.history = async function(key) {
    // load the network configuration
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const wallet = await Wallets.newFileSystemWallet(walletPath);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
        console.log('An identity for the user "appUser" does not exist in the wallet');
        console.log('Run the registerUser.js application before retrying');
        return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('codeTattoo');

    const result = await contract.evaluateTransaction('getTattooHistory', key);

    // Disconnect from the gateway.
    await gateway.disconnect();

    return JSON.parse(result.toString())
}
