/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

// 코드 목적 : HyperLedger Network 에 Transaction 을 기록 또는 불러오는 작업을 수행한다.

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');
const ccpPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'connection-org1.json');
const walletPath = path.resolve(__dirname, '..', '..', 'codeTattooBlockchain', 'codeTattooApp', 'wallet');

// 블록체인에 Transaction 을 기록한다.
// WorldState Schema의 state에 따라 다른 정보(data)를 기록한다.
exports.invoke = async function(function_name, key, data) {
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
        // state : 1
        await contract.submitTransaction('newTattoo', key, data['owner_info'], Math.floor(Date.now() / 1000));
    } else if (function_name === 'startTattoo') {
        // state : 2
        await contract.submitTransaction('startTattoo', key, data['tattooist_info'], Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
    } else if (function_name === 'endTattoo') {
        // state : 3
        await contract.submitTransaction('endTattoo', key, data['tattooist_info'], Math.floor(Date.now() / 1000), data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
    } else if (function_name === 'addProcedure') {
        // state : 4(Retouched), 5(CoveredUp)
        await contract.submitTransaction('addProcedure', key, data['tattooist_info'], Math.floor(Date.now() / 1000), data['state_index'], data['cost'], data['image'], data['body_part'], data['inks'], data['niddle'], data['depth'], data['machine']);
    } else if (function_name === 'suspend') {
        // state : 0
        await contract.submitTransaction('suspend', key, data['owner_info'], Math.floor(Date.now() / 1000));
    } else if (function_name === 'addSideEffect') {
        await contract.submitTransaction('addSideEffect', key, data['founder_info'],  Math.floor(Date.now() / 1000), data['image'], data['symptom']);
    } else {
        throw 'wrong function name'
    }
    // Disconnect from the gateway.
    await gateway.disconnect();
}

// 블록체인에서 가장 최근의 Transaction 1개를 불러온다.
exports.getTattooInfo = async function(key) {
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
}

// 블록체인에서 모든 Transaction 을 불러온다.
exports.getTattooHistory = async function(key) {
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

// 블록체인에서 Side-Effect 만 불러온다.
exports.getTattooSideEffects = async function(key) {
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
}
