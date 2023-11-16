
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
        title: "Room1",
        desc: [1, "You find yourself in a damp room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room2",
        west: "Room3",
        enemy: ['enemyName', 'desc1', false, 'desc2'] 
    
    },
    {
        title: "Room2",
        desc: [1, "You find yourself in a dry room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room3",
        west: "Room1",
        enemy: ['enemyName', 'desc1', false, 'desc2'] 
    },
    {
        title: "Room3",
        desc: [1, "You find yourself in a dry room, <span class='important'>light</span> gently streams in through a crack in the wall", "Your lamp throws "],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item(s) required to do action in room"], 
        items: ["lamp", "item2"],
        east: "Room1",
        west: "Room2",
        enemy: ['enemyName', 'desc1', false, 'desc2'] 
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
        reward: [], 
    },
    {
        title: "Room2",
        desc: "You find yourself in a damp room, a <span class='important'>room2</span> by your feet throws a dim light against the walls",
        items: [],
        north: "Room3",
        west: "Room1",
        enemy: "weed"
    },
    {
        title: "Room3",
        desc: "You find yourself in a damp room, a <span class='important'>woom3</span> by your feet throws a dim light against the walls",
        items: [],
        east: "Room1",
        west: "Room2"
    },



]
    


export {roomMaster};