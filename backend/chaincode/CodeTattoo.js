/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');
const { TattooState, Activator, SideEffect, TattooInfo } = require('./WorldStateSchema')

class CodeTattoo extends Contract {

    // owner_info example : { id : "0x123abc", nickname : "ato" }
    async newTattoo(ctx, key, owner_info) {
        let new_tattoo = new TattooInfo();

        const owner = new Activator(owner_info);
        new_tattoo['activator'] = owner;
        new_tattoo['state'] = TattooState[0];
        new_tattoo['timestamp'] = Date.now();

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(new_tattoo)));
    }

    // tattooist_info example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back" }
    async makeReservation(ctx, key, tattooist_info, params) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        if(tattoo['state'] !== TattooState[0]) {
            throw new Error('wrong state, now : ' + tattoo['state']);
        }

        const tattooist = new Activator(tattooist_info);
        params['activator'] = tattooist;
        params['state'] = TattooState[1];
        params['timestamp'] = Date.now();

        tattoo = params;
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // tattooist_info example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back", inks : ["indigo_black", "real_red"], niddle : ["round_shader", "magnum"], depth : 3, machine : "coil" }
    async startTattoo(ctx, key, tattooist_info, params) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        if(tattoo['state'] !== TattooState[1]) {
            throw new Error('wrong state, now : ' + tattoo['state']);
        }

        const tattooist = new Activator(tattooist_info);
        params['activator'] = tattooist;
        params['state'] = TattooState[2];
        params['timestamp'] = Date.now();

        tattoo = params;
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // tattooist_info example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back", inks : ["indigo_black", "real_red"], niddle : ["round_shader", "magnum"], depth : 3, machine : "coil" }
    async endTattoo(ctx, key, tattooist_info, params) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        if(tattoo['state'] !== TattooState[2]) {
            throw new Error('wrong state, now : ' + tattoo['state']);
        }

        const tattooist = new Activator(tattooist_info);
        params['activator'] = tattooist;
        params['state'] = TattooState[3];
        params['timestamp'] = Date.now();

        tattoo = params;
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // state_index should be 4(Retouched), 5(Covered-up)
    // tattooist_info example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back", inks : ["indigo_black", "real_red"], niddle : ["round_shader", "magnum"], depth : 3, machine : "coil" }
    async addProcedure(ctx, key, state_index, tattooist_info, params) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const tattooist = new Activator(tattooist_info);
        params['activator'] = tattooist;
        params['state'] = TattooState[state_index];
        params['timestamp'] = Date.now();

        tattoo = params;
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // owner_info example : { id "0x123abc", nickname : "ato" }
    async suspend(ctx, key, owner_info) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const owner = new Activator(owner_info);
        tattoo['activator'] = owner;
        tattoo['state'] = TattooState[6];
        tattoo['timestamp'] = Date.now();

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    async getTattooInfo(ctx, key) {
        const tattoo = await ctx.stub.getState(key)
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

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

    // params example : { image : "url", symptom : "rash" }
    async addSideEffect(ctx, key, params) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const side_effect = new SideEffect(params);
        side_effect['date'] = Date.now();

        tattoo['side_effects'].push(side_effect);
        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    async getSideEffects(ctx, key) {
        const tattoo = await ctx.stub.getState(key)
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        return tattoo['side-effects'].toString();
    }
}

module.exports = CodeTattoo;
