const procedure = {
    activator_id : {
        type : String
    },
    using_items : {
        type : [String]
    },
    date : {
        type : Number
    }
}

const side_effect = {
    activator_id : {
        type : String
    },
    symptom : {
        type : String
    }
}

const world_state = {
    // tattoo_id : {
    //     type : String
    // },
    owner_id : {
        type : String
    },
    procedure : {
        type: procedure
    },
    // state : { created, imprinting, imprinted, removing, removed }
    state : {
        type : String,
        default : 'created'
    },
    side_effects : {
        type : [side_effect]
    }
}


module.exports = { world_state }