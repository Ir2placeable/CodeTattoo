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
const walletPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'codeTattooApp', 'wallet');

exports.invoke = async function(function_name, key, data) {
    try {
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path :  ${walletPath}`)

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

        // 분기할 것
        if (function_name === 'newTattoo') {
            await contract.submitTransaction('newTattoo', key, data['owner_info'], Math.floor(Date.now() / 1000));
        } else if (function_name === 'makeReservation') {
            await contract.submitTransaction('makeReservation', key, data['tattooist_info'], Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part']);
        } else if (function_name === 'startTattoo') {
            await contract.submitTransaction('startTattoo', key, data['tattooist_info'] , Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
        } else if (function_name === 'endTattoo') {
            await contract.submitTransaction('endTattoo', key, data['tattooist_info'] , Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
        } else if (function_name === 'addProcedure') {
            await contract.submitTransaction('addProcedure', key, data['tattooist_info'] , Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
        } else if (function_name === 'suspend') {
            await contract.submitTransaction('suspend', key, data['owner_info'], Math.floor(Date.now() / 1000));
        } else if (function_name === 'addSideEffect') {
            await contract.submitTransaction('addSideEffect', key, data['founder_info'],  Math.floor(Date.now() / 1000), data['image'], data['symptom']);
        } else {
            throw 'wrong function name'
        }
        // Disconnect from the gateway.
        await gateway.disconnect();

    } catch(e) {
        console.log('Failed to submit transaction : ', e)
        process.exit(1)
    }
}

exports.getTattooInfo = async function(key) {
    try {
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path :  ${walletPath}`)

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

        const result = await contract.evaluateTransaction('getTattooInfo', key);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return JSON.parse(result.toString())
    } catch(e) {
        console.log('Failed to evaluate transaction : ', e)
        process.exit(1)
    }
}

exports.getTattooHistory = async function(key) {
    try {
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
    } catch(e) {
        console.log('Failed to evaluate transaction : ', e)
        process.exit(1)
    }
}

exports.getTattooSideEffects = async function(key) {
    try {
        let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path :  ${walletPath}`)

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

        const result = await contract.evaluateTransaction('getSideEffects', key);

        // Disconnect from the gateway.
        await gateway.disconnect();

        return JSON.parse(result.toString())
    } catch(e) {
        console.log('Failed to evaluate transaction : ', e)
        process.exit(1)
    }
}
