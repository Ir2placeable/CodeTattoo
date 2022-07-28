// SPDX-License-Identifier: UNLICENSED
//
pragma solidity ^0.8.13;

contract codeTattoo {
    // Section : Structures
    enum TattooState {
        Created, // 0
        Reserved, // 1
        Tattooing, // 2
        Tattooed, // 3
        Retouched, // 4
        Covered_up, // 5
        Suspended // 6
    }

    // Activator would be an owner or a tattooist
    struct Activator {
        string id;
        string nickname;
    }

    // Tattoo is a main data structure changing every Transaction.
    struct TattooInfo {
        TattooState state;
        Activator activator;

        uint scheduled_date;
        uint cost;
        string[2] image;
        string body_part;
        string[] inks;
        string niddle;
        uint8 setting_depth;
        string machine;
    }

    struct SideEffect {
        string image;
        string symptom;
        uint date;
    }

    // Section : Initiating Attributes
    Activator private owner;
    Activator[] private tattooists;
    uint tattooist_index;
    TattooInfo private tattoo;
    SideEffect[] private side_effect;

    // Section : modifiers
    modifier IsTattooistSet() {
        require(tattooists.length != 0);
        _;
    }
    modifier isTattooDone() {
        require(tattoo.state < TattooState(3));
        _;
    }

    // Section : functions
    constructor (string memory owner_id, string memory owner_nickname) {
        owner.id = owner_id;
        owner.nickname = owner_nickname;
        tattoo.state = TattooState(0);
    }

    function newTattooist (string memory tattooist_id, string memory tattooist_nickname) public {
        // initalize Array "Tattooists"
        if (tattooists.length == 0) {
            tattooist_index = 0;
        }

        tattooists.push(Activator(tattooist_id, tattooist_nickname));
    }

    function setTattooist(uint index) public {
        tattooist_index = index;
    }

    function getTattooists() public view returns(Activator[] memory) {
        return tattooists;
    }

    function makeReservation(uint date, uint cost, string[2] memory image, string memory body_part) public IsTattooistSet {
        if (tattoo.state != TattooState(0)) {
            revert();
        }
        // changing the state of tattoo into "Reserved".
        tattoo.state = TattooState(1);
        // using the last item of list "tattooists"
        tattoo.activator = tattooists[tattooist_index];

        tattoo.scheduled_date = date;
        tattoo.cost = cost;
        tattoo.image = image;
        tattoo.body_part = body_part;
    }

    function startTattoo(uint date, uint cost, string[2] memory image, string memory body_part,
        string[] memory inks, string memory niddle, uint8 depth, string memory machine) public {
        if (tattoo.state != TattooState(1)) {
            revert();
        }
        tattoo.state = TattooState(2);

        tattoo.activator = tattooists[tattooist_index];
        tattoo.scheduled_date = date;
        tattoo.cost = cost;
        tattoo.image = image;
        tattoo.body_part = body_part;
        tattoo.inks = inks;
        tattoo.niddle = niddle;
        tattoo.setting_depth = depth;
        tattoo.machine = machine;
    }

    function endTattoo(uint date, uint cost, string[2] memory image, string memory body_part,
        string[] memory inks, string memory niddle, uint8 depth, string memory machine) public {
        if (tattoo.state != TattooState(2)) {
            revert();
        }
        tattoo.state = TattooState(3);

        tattoo.activator = tattooists[tattooist_index];
        tattoo.scheduled_date = date;
        tattoo.cost = cost;
        tattoo.image = image;
        tattoo.body_part = body_part;
        tattoo.inks = inks;
        tattoo.niddle = niddle;
        tattoo.setting_depth = depth;
        tattoo.machine = machine;
    }

    function stackProcedure(uint state_index, uint date, uint cost, string[2] memory image, string memory body_part,
        string[] memory inks, string memory niddle, uint8 depth, string memory machine) public isTattooDone {
        tattoo.state = TattooState(state_index);

        tattoo.activator = tattooists[tattooist_index];
        tattoo.scheduled_date = date;
        tattoo.cost = cost;
        tattoo.image = image;
        tattoo.body_part = body_part;
        tattoo.inks = inks;
        tattoo.niddle = niddle;
        tattoo.setting_depth = depth;
        tattoo.machine = machine;
    }

    function addSideEffect(string memory image, string memory symptom, uint date) public isTattooDone {
        side_effect.push(SideEffect(image, symptom, date));
    }
    function getSideEffects() public view returns(SideEffect[] memory) {
        return side_effect;
    }
}