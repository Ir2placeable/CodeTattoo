/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class CodeTattoo extends Contract {

    async initLedger(ctx) {
        console.info('start initLedger')
    }

    // params : { owner_id }
    async newTattoo(ctx, key, owner_id) {
        let new_tattoo = {};
        new_tattoo.key = key;
        new_tattoo.owner_id = owner_id;
        new_tattoo.state = 'created'
        new_tattoo.procedure = [];
        new_tattoo.side_effects = [];

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(new_tattoo)));
    }
    
    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async startImprint(ctx, key, procedure) {
        const tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data.state !== 'created') {
            throw new Error('state is not created')
        }

        tattoo_data.procedure.push(procedure);
        tattoo_data.state = 'imprinting'
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async endImprint(ctx, key, procedure) {
        const tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data.state !== 'imprinting') {
            throw new Error('state is not imprinting')
        }

        tattoo_data.procedure.push(procedure);
        tattoo_data.state = 'imprinted'
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async startRemove(ctx, key, procedure) {
        const tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data.state !== 'imprinted') {
            throw new Error('state is not imprinted')
        }

        tattoo_data.procedure.push(procedure);
        tattoo_data.state = 'removing'
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, using_items, date }
    async endRemove(ctx, key, procedure) {
        const tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        if (tattoo_data.state !== 'removing') {
            throw new Error('state is not removing')
        }

        tattoo_data.procedure.push(procedure);
        tattoo_data.state = 'removed'
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo_data)));
    }

    // params : { procedure }
    // procedure = { activator_id, symptom }
    async addSideEffect(ctx, key, side_effect) {
        const tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattoo_data = JSON.parse(tattoo.toString());
        tattoo_data['side_effects'].push(side_effect)

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo_data)));
    }

    async getTattooLatest(ctx, key) {
        const tattoo = await ctx.stub.getState(key)
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        console.log(tattoo.toString());
        return tattoo.toString();
    }

    async getTattooHistory(ctx, key) {
        const history_data = await ctx.stub.getHistoryForKey(key)
        let tattoo_histories = []
        let iter = { done : false }

        while(!iter.done) {
            iter = await history_data.next();

            try {
                if (iter && iter.value && iter.value.value) {
                    let history = iter.value.value.toString('utf8')
                    if (history.length > 0) {
                        tattoo_histories.push({ Key : key, Record : JSON.parse(history) })
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