
let roomMaster = [
            {
                title: "Room1",
                desc: "You find yourself in a damp room, a <span class='important'>lantern</span> by your feet throws a dim light against the walls",
                items: ["item1", "item2"],
                east: "Room2",
                west: "Room3",
            },
            {
                title: "Room2",
                desc: "You find yourself in a damp room, a <span class='important'>lantern</span> by your feet throws a dim light against the walls",
                items: ["item1", "item2"],
                east: "Room3",
                west: "Room1",
            },
            {
                title: "Room3",
                desc: "You find yourself in a damp room, a <span class='important'>lantern</span> by your feet throws a dim light against the walls",
                items: ["item1", "item2"],
                east: "Room1",
                west: "Room2",
            },



        ]

export default roomMaster;