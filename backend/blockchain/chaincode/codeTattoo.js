/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Chaincode } = require('fabric-contract-api');
const { Tattoo } = require('./WorldStateSchema');

class CodeTattoo extends Chaincode {

    // params : { customer_id }
    async newTattoo(cc, tattoo_id, params) {
        const new_tattoo = Tattoo(params)

        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(new_tattoo)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async startImprint(cc, tattoo_id, procedure) {
        const tattoo = await cc.stub.getState(tattoo_id);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data['state'] !== 'created') {
            throw new Error('state is not created')
        }

        tattoo_data['procedure'].push(procedure);
        tattoo_data['state'] = 'imprinting'
        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async endImprint(cc, tattoo_id, procedure) {
        const tattoo = await cc.stub.getState(tattoo_id);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data['state'] !== 'imprinting') {
            throw new Error('state is not imprinting')
        }

        tattoo_data['procedure'].push(procedure);
        tattoo_data['state'] = 'imprinted'
        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async startRemove(cc, tattoo_id, procedure) {
        const tattoo = await cc.stub.getState(tattoo_id);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data['state'] !== 'imprinted') {
            throw new Error('state is not imprinted')
        }

        tattoo_data['procedure'].push(procedure);
        tattoo_data['state'] = 'removing'
        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async endRemove(cc, tattoo_id, procedure) {
        const tattoo = await cc.stub.getState(tattoo_id);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data['state'] !== 'removing') {
            throw new Error('state is not removing')
        }

        tattoo_data['procedure'].push(procedure);
        tattoo_data['state'] = 'removed'
        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, symptom }
    async addSideEffect(cc, tattoo_id, side_effect) {
        const tattoo = await cc.stub.getState(tattoo_id);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        tattoo_data['side_effects'].push(side_effect)

        await cc.stub.putState(tattoo_id, Buffer.from(JSON.stringify(tattoo_data)));
    }

    async getTattooLatest(cc, tattoo_id) {
        const tattoo = await cc.stub.getState(tattoo_id)
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${tattoo_id} does not exist`);
        }

        return tattoo.toString();
    }

    async getTattooHistory(cc, tattoo_id) {
        const history_data = await cc.stub.getHistoryForKey(tattoo_id)
        let tattoo_histories = []
        let iter = { done : false }

        while(!iter.done) {
            iter = await history_data.next();

            try {
                if (iter && iter.value && iter.value.value) {
                    let history = iter.value.value.toString('utf8')
                    if (history.length > 0) {
                        tattoo_histories.push({ Key : tattoo_id, Record : JSON.parse(history) })
                    }

                }
            } catch(err) {
                console.log(err.message);
            }

            if(iter && iter.done) {
                try {
                    history_data.close();
                } catch (err) {
                    console.log(err.message);
                }
            }
        }
        return JSON.stringify(tattoo_histories)
    }
}

module.exports = CodeTattoo;

