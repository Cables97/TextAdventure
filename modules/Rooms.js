
//----------------------------------------------- 
//roomMaster List -The original state of the game. Can be edited in realtime under world variable
//----------------------------------------------- 


let roomMaster = [

    /*
        title: "template",
        desc: [1, "the normal description index#=1", "alternate description i#=2"],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "east link",
        west: "west link",
        north: "north link",
        south: "south link",
        enemy: ['enemyName', 'desc1', false, 'desc2'] 
    
*/
    {
        title: "StartingRoom",
        desc: [1, "You find yourself in a damp room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room2",
        west: "Room3",
        enemy: ['Orc', 'A large orc stands facing the wall', true, 'An orc lays bleeding and dead on the floor'] 
    
    },
    {
        title: "Room2",
        desc: [1, "You find yroom2ourself in a dry room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room3",
        west: "StartingRoom",
        
    },
    {
        title: "Room3",
        desc: [1, "You find room3 yourself in a dry room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room1",
        west: "StartingRoom",
        
    },



        ]

//----------------------------------------------- 
//enemyMaster List - holds all of the enemy units. Templates to be dynamically called in game-time
//----------------------------------------------- 
let enemyMaster = [
    {
        name: "Orc",
        health: 4,
        damage: 1,
        reward: ['chain'],
        killMsg: "The Orc swings it's giant club at your face surprisingly fast" 
    },
    {
        name: "Dog",
        health: 2,
        damage: 2,
        reward: ['collar'], 
    },
    {
        name: "Bats",
        health: 1,
        damage: 1,
        reward: [], 
    },



]
    
let itemMaster = [
    {
        name: "lamp",
        damage: 1,
        atkMsg: 'Sparks fly as your lamp collides with ', 
        value: 20
    },
    {
        name: "sword",
        damage: 4,
        atkMsg: 'You swing, and the blade slices through the flesh of the ', 
        value: 20
    },
    {
        name: "key",
        damage: 0,
        atkMsg: 'Sparks fly as your lamp collides with ', 
        value: 20 
    },



]

export {roomMaster, enemyMaster, itemMaster};