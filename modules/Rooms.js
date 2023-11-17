
//----------------------------------------------- 
//roomMaster List -The original state of the game. Can be edited in realtime under world variable
//----------------------------------------------- 


let roomMaster = [

    /*
        title: "template",
        desc: [1, "the normal description index#=1", "alternate description i#=2"],
        desc2: [0, "the second description", "alternative second"],
        req_item: ["item required to exit"],
        itemDesc[index,] 
        items: ["lamp", "item2"],
        east: "east link",
        west: "west link",
        north: "north link",
        south: "south link",
        lockedExit: [[direction, item required]]
        enemy: ['enemyName', 'desc1', false, 'kill desc', 'desc2'] 
    
*/
    {
        title: "dead",
        desc: [1, "A Creature waiting in the dark jumps from the shadows and makes a quick meal out of you. Type <span class='important'> newgame </span> to try again", ""],

    }, 
    {
        title: "WinStateRoom",
        desc: [1, "Congrats, you win. This was a first attempt at getting the 'engine' to work. The functions and story will be more flushed out in time", ""],


    },
    {
        title: "StartingRoom",
        desc: [1, "You find yourself in a small room. a small stream of light pours in from a grated hole in a door to the <span class='important'>North</span>. Stained concrete walls block your other directions", "Your lamp throws "],
        desc2: [1, "A small tray of food lays on the ground before the door, a slight glint shines from beneath the slop", "Grey slop lay strewn across the floor. It has the consistency of dirt."],
        items: ["food tray"],
        north: "CellHallway",
        lockedExit: [['north', 'key']], 
    
    },
    {
        title: "CellHallway",
        desc: [1, "You stand in a hallway. Doors with grated windows lines the walls. You can hear gentle crying from one of the rooms to the <span class='important'>West</span> at the end of the hallway. A set of stairs on the <span class='important'>East</span> side of the stairs lead upwards", "Your lamp throws "],
        items: [],
        east: "Stairs",
        west: "End of Hall",
        south: "StartingRoom"
        
    },
    {
        title: "End of Hall",
        desc: [1, "As you approach, the crying stops, and the figure cowers in the corner of their room, hidden beneath a tattered blanket, the hallway continues to the <span class='important'>East</span> with a set of stairs on the other end", "Your lamp throws "],
        desc2: [1, "A small brass <span class='important'>lamp</span> sits on the stool. It's flame throwing shadows against the already dark walls", "At the end of the hall is a small stool. "],
        items: ['lamp'],
        east: "CellHallway"
    },
    {
        title: "Stairs",
        desc: [1, "The edges of the concrete stairs start to crumble as you step on them, the smell of iron burns your nostrils. The faint sound of sobbing can be heard to the <span class='important'>West</span> at the bottom of the stairs. A bright light illuminates an open door to the <span class='important'>North</span>", ""],
        items: [],
        west: "CellHallway",
        north: "TopOfStairs",
        
    },
    {
        title: "TopOfStairs",
        desc: [1, "You at the top of a set of stairs, an ajar door leads to the <span class='important'>North</span>, and the sound of gentle snoring can be heard to the <span class='important'>East</span>, <span class='important'>South</span> leads back down the stairs", ""],
        items: [],
        east: "GuardRoom",
        north: "Kitchen",
        south: 'Stairs'
        
    },
    {
        title: "Kitchen",
        desc: [1, "You're in what looks to be an empty kitchen, the smell of rot is almost overpowering. Large red stains cover the floor and countertops. An open door leading to the top of some stairs is to the <span class='important'>South</span>", ""],
        desc2: [0, "A large blood-covered <span class='important'>knife</span> sits on the counter top.", "alternative second"],
        items: ['knife'],
        south: "TopOfStairs",
        
    },
    {
        title: "GuardRoom",
        desc: [1, "You're in a small room with tables and chairs. A half eaten plate of meat sits on the table next to an interrupted card game. A large, bolted door sits on the <span class='important'>East</span> side of the room. A door stands ajar on the <span class='important'>West</span> side.", ""],
        items: [],
        west: "TopOfStairs",
        east: "SubwayTracks1",
        lockedExit: [['east', 'key2']],
        enemy: ['guard', "A man sits snoring, slumped in a chair next to the door on the <span class='important'>East</span> side of the room.", true, "as he lays dying, you see a key on a chain around their neck", 'A man lay bleeding on the floor. Unmoving.'] 
    },
    {
        title: "SubwayTracks1",
        desc: [1, "Standing in a large, long unused tunnel with metal tracks on the ground. Water is dripping from the ceiling into large puddles on the ground. Plant roots cover the walls, almost completely obscuring the decaying walls beyond. Giant boulders block the passage south, but light appears from the tunnels <span class='important'>North</span>. A red puddle seeps from below a door to the <span class='important'>East</span>", ""],
        items: [],
        isDark: true,
        west: "GuardRoom",
        north: "SubwayTracks2",
    },
    {
        title: "SubwayTracks2",
        desc: [1, "Standing in a large, long unused tunnel with metal tracks on the ground. The roots grow denser as you travel down the tunnel.  Suddenly it opens up, and you come across a room with stairs leading upward. The ceiling looked to have fallen in long ago. The base of a giant tree had burst through the tile floor, and was more than 3 arm spans wide. A section of grating had been used to block the stairs, roots holding it fast in place. The tunnel continues <span class='important'>North</span>", ""],
        items: [],
        isDark: true,
        south: "SubwayTracks1",
        north: "SubwayTracks3",
    },
    {
        title: "SubwayTracks3",
        desc: [1, "Giant metal tubes block the rest of the tunnel. Rusty water drips from various places, causing the sound to echo against the walls. A small service ladder to the <span class='important'>East</span> leads into a hole in the floor" , ""],
        items: [],
        isDark: true,
        south: "SubwayTracks2",
        east: "SewerTunnel",
    },
    {
        title: "SewerTunnel",
        desc: [1, "Giant metal tubes block the rest of the tunnel. Rusty water drips from various places, causing the sound to echo against the walls. A small service ladder to the <span class='important'>East</span> leads into a hole in the floor" , ""],
        items: [],
        isDark: true,
        north: "WinStateRoom",
        west: "SubwayTracks3",
    },





        ]

//----------------------------------------------- 
//enemyMaster List - holds all of the enemy units. Templates to be dynamically called in game-time
//----------------------------------------------- 
let enemyMaster = [
    {
        name: "orc",
        health: 4,
        damage: 1,
        reward: ['chain'],
        killMsg: "The Orc swings it's giant club at your face surprisingly fast" 
    },
    {
        name: "guard",
        health: 2,
        damage: 2,
        reward: ['key2'], 
        desc: "A man"
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