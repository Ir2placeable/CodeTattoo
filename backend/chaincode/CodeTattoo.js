/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Chaincode } = require('fabric-contract-api');
const { Tattoo_procedure } = require('./ProcedureSchema');

class CodeTattoo extends Chaincode {
    async newProcedure(cc, data, key) {
        const tattoo_procedure = new Tattoo_procedure(data);

        await cc.stub.putState(key, Buffer.from(JSON.stringify(tattoo_procedure)));
    }

    async addSideEffect(cc, data, key) {
        const procedure_data = await cc.stub.getState(key);
        if (!procedure_data || procedure_data.length === 0) {
            throw new Error(`${key} does not exist`);
        }

        const temp_procedure = JSON.parse(procedure_data.toString());
        temp_procedure['side_effect'].push(data);

        await cc.stub.putState(key, Buffer.from(JSON.stringify(temp_procedure)));
    }

    async getProcedure(cc, key) {
        const procedure_data = await cc.stub.getState(key);
        if (!procedure_data || procedure_data.length === 0) {
            throw new Error(`${key} does not exist`);
        }
        return procedure_data.toString();
    }
}

module.exports = CodeTattoo;

