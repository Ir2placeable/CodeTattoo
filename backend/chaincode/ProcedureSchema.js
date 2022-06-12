// this is for Transaction Schema in CodeTattoo, chaincode.

const user = {
    name : {
        type : String
    },
    email : {
        type : String
    },
    user_id : {
        type : String
    }
}
const draft = {
    image : {
        type : String
    },
    width : {
        type : Number
    },
    height : {
        type : Number
    }
}
const equipment = {
    machine : {
        type : String
    },
    ink : {
        type : [String]
    },
    niddle : {
        type : [String]
    }
}

const tattoo_procedure = {
    tattooist : {
        type : user
    },
    customer : {
        type : user
    },
    date : {
        type : Date
    },
    draft : {
        type : draft
    },
    cost : {
        type : Number
    },
    equipment : {
        type : equipment
    },
    side_effect : {
        type : [String]
    }

}

module.exports = { tattoo_procedure }