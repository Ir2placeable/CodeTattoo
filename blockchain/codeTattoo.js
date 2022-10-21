/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

// chaincode file
// 코드 목적 : 블록체인에 본 코드를 배포하여, 타투 시술에 사용되는 데이터를 블록체인에 기록하는 역할을 수행한다.
// 타투 시술 상태(state)에 따라 다른 기능을 수행한다.

const { Contract } = require('fabric-contract-api');

class CodeTattoo extends Contract {
    // 네트워크 개설 시에만 작동
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    async newTattoo(ctx, key, owner_info, timestamp, cost, image, body_part) {
        const new_tattoo = {
            state : 1,
            activator_id : owner_info,
            timestamp : timestamp,
            cost : cost,
            image : image,
            body_part : body_part,
            inks : "",
            niddle : "",
            depth : "",
            machine : "",
            side_effects : { image : "", symptom : "" }
        }

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(new_tattoo)))
    }

    async startTattoo(ctx, key, tattooist_info, timestamp, cost, image, body_part, inks, niddle, depth, machine) {
        let tattoo = await ctx.stub.getState(key);

        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        tattoo = JSON.parse(tattoo.toString())

        if(tattoo.state !== 1) {
            throw new Error('wrong state, now state : ' + tattoo.state);
        }

        tattoo.activator_id = tattooist_info
        tattoo.state = 2
        tattoo.timestamp = timestamp
        tattoo.cost = cost
        tattoo.image = image
        tattoo.body_part = body_part
        tattoo.inks = inks
        tattoo.niddle = niddle
        tattoo.depth = depth
        tattoo.machine = machine

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // id example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back", inks : ["indigo_black", "real_red"], niddle : ["round_shader", "magnum"], depth : 3, machine : "coil" }
    async endTattoo(ctx, key, tattooist_info, timestamp, cost, image, body_part, inks, niddle, depth, machine) {
        let tattoo = await ctx.stub.getState(key);

        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        tattoo = JSON.parse(tattoo.toString())

        if(tattoo.state !== 2) {
            throw new Error('wrong state, now state : ' + tattoo.state);
        }

        tattoo.activator_id = tattooist_info
        tattoo.state = 3
        tattoo.timestamp = timestamp
        tattoo.cost = cost
        tattoo.image = image
        tattoo.body_part = body_part
        tattoo.inks = inks
        tattoo.niddle = niddle
        tattoo.depth = depth
        tattoo.machine = machine

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // state_index should be 4(Retouched), 5(Covered-up)
    // id example : { id : "0x456def", nickname : "john" }
    // params example : { cost : 50000, image : ["url1", "url2"], body_part : "back", inks : ["indigo_black", "real_red"], niddle : ["round_shader", "magnum"], depth : 3, machine : "coil" }
    async addProcedure(ctx, key, tattooist_info, timestamp, state_index, cost, image, body_part, inks, niddle, depth, machine) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        tattoo = JSON.parse(tattoo.toString())

        // tattoo is not ended or tattoo is suspended
        if(tattoo.state < 4) {
            throw new Error('wrong state, now state : ' + tattoo.state);
        }

        // wrong procedure
        if(state_index !== 4 || state_index !== 5) {
            throw new Error('wrong state, state should be 4(retouched) or 5(covered_up)');
        }

        tattoo.activator_id = tattooist_info
        tattoo.state = state_index
        tattoo.timestamp = timestamp
        tattoo.cost = cost
        tattoo.image = image
        tattoo.body_part = body_part
        tattoo.inks = inks
        tattoo.niddle = niddle
        tattoo.depth = depth
        tattoo.machine = machine

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    // id example : { id "0x123abc", nickname : "ato" }
    async suspend(ctx, key, owner_info, timestamp) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        tattoo = JSON.parse(tattoo.toString())

        tattoo.activator_id = owner_info
        tattoo.state = 0
        tattoo.timestamp = timestamp

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
    async addSideEffect(ctx, key, founder_info, timestamp, image, symptom) {
        let tattoo = await ctx.stub.getState(key);
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        tattoo = JSON.parse(tattoo.toString())

        tattoo.activator_id = founder_info
        tattoo.side_effects = { image: image, symptom: symptom }
        tattoo.timestamp = timestamp

        await ctx.stub.putState(key, Buffer.from(JSON.stringify(tattoo)));
    }

    async getSideEffects(ctx, key) {
        const tattoo = await ctx.stub.getState(key)
        if (!tattoo || tattoo.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        return tattoo.side_effects.toString();
    }
}

module.exports = CodeTattoo;
