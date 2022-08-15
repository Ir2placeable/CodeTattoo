/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class Delivery extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        console.info('============= END : Initialize Ledger ===========');
    }

    async ShowDeliverers(ctx, sn) {
        const deliveryAsBytes = await ctx.stub.getState(sn);
        if (!deliveryAsBytes || deliveryAsBytes.length === 0) {
            throw new Error(`${sn} does not exist`);
        }
        console.log(deliveryAsBytes.toString());
        return deliveryAsBytes.toString();
    }

    async delete(ctx, sn) {
        await ctx.stub.deleteState(sn);
        return;
    }

    async AddNewDeliverer(ctx, sn, maker) {
        let ts = Math.floor(Date.now() / 1000);
        const cur = [maker, ts];
        let deliveryAsBytes = await ctx.stub.getState(sn);
        let delivery = {};
        if (!deliveryAsBytes || deliveryAsBytes.length === 0) {
            delivery.sn = sn;
            delivery.deliverer = [cur];
            delivery.docType = 'delivery';
        } else {
            delivery = JSON.parse(deliveryAsBytes.toString());
            delivery.deliverer.push(cur);
        }
        await ctx.stub.putState(sn, Buffer.from(JSON.stringify(delivery)));
    }

    async AddNewDeliverer_Simple(ctx, sn, maker) {
        let ts = Math.floor(Date.now() / 1000);
        const cur = [maker, ts];
        let delivery = {};
        delivery.sn = sn;
        delivery.deliverer = [cur];
        delivery.docType = 'delivery';
        await ctx.stub.putState(sn, Buffer.from(JSON.stringify(delivery)));
    }

    async traceKey(ctx, key) {
        let historyIter = await ctx.stub.getHistoryForKey(key);
        let results = [];
        let res = {done : false};
        while(!res.done){
            res = await historyIter.next();
            try{
                if(res && res.value && res.value.value){
                    let val = res.value.value.toString('utf8');
                    console.log('val===================', val);
                    if(val.length > 0){
                        results.push({ Key: key, Record: JSON.parse(val)});
                        console.log('\ntraceKey=======res.value.value', val, '\n');
                    }
                }
            } catch(err) {
                console.log(err.message);
            }
            if(res && res.done){
                try{
                    historyIter.close();
                }catch(err){
                    console.log(err.message);
                }
            }
        }
        return JSON.stringify(results);
    }
}

module.exports = Delivery;