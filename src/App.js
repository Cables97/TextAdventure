

//Constants

//----------------------------------------------- 
//DOM Variables
//----------------------------------------------- 
let outputBox = document.getElementById("outputcontainer");
let roomTitle = document.getElementById("roomTitle");
let scoreElem = document.getElementById("score");
let inputField = document.getElementById("input");
let consoleMessage = document.getElementById("inputMessage");
let anchor = document.getElementById("anchor");

//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
let world = " ";
let bag;

let score=0;
let dummyCommandCount = 0;


let currentRoom ={
  title: "Room1",
  desc: "You find yourself in a damp room, a lantern by your feet throws a dim light against the walls" +
  "line2",
  items: ["item1", "item2"],
  east: "Room2",
  west: "Room3",
  north: "Blocked",
  south: "Blocked"
}

//----------------------------------------------- 
//Event Functions
//----------------------------------------------- 
window.onload = (event) => {
  startGame();
};

function startGame(){
  displayHelp();
  world = roomMaster;
  bag = [];
  enterRoom("Room1");

}

//event on enter listener, takes text in input box and passes it as playerController(input).
inputField.addEventListener("keydown", function (e) {
  if (e.code === 'Enter') {
      //press enter
      //checks the typed command against playerController
      //player controller changes the current room.
      //print new room
    userInput();
  }
});

function userInput(){
  let userCommand = inputField.value.toLowerCase();
  console.log("userCommand= " + userCommand)
  inputField.value = ""
  printLine("> " + userCommand);
  playerController(userCommand);
}



//----------------------------------------------- 
//Game Functions
//----------------------------------------------- 

function enterRoom(roomName)
{
    let r = findRoom(roomName);
    if (!r)
    {
      printLine("Cannot find room " + roomName);
        return;
    }
    
    currentRoom = r;

    printRoom(room);
    roomName(room.title);
}

function printRoom(roomName)
{
    printLine("You are in the " + roomName.Name);
    
    if (roomName.desc)
        printLine(roomName.desc);
        
    printLine("");
}

function findRoom(roomName)
{
    for(var r of world.rooms)
    {
        if (r.Name === roomName)
            return r;
    }
    
    return null;
  }

  
/*
(direction) - move player to next room. direction argument changes the room to matching key-value (eg, north : "room2") (go/move optional)
look - reprints room description
take (item) - add availible item in room to inventory, delete key-value from room
drop (item) - add item key-value to room, remove from inventory
equip (item) - add item to equipped value
attack (enemy) - attacks enemy with equipped item
this is god - debug mode (shows print.logs) 
*/

function playerController(input){

    scoreInc(10);
    //player input could be one or two words. slice into array, first word is action, second is argument. 
    let inputstr = input;
  
    let inputArray = inputstr.split(/\s+/);
  
    let inputCommand = inputArray[0];
    console.log("input command= " + inputCommand);
  
    let inputArg = inputArray[1];
    console.log("input argument= " + inputArg);
  
    console.log("dummyCommandCount= " + dummyCommandCount);
  
    switch(inputCommand) {
        //All player commands go within this switch statement. Simplify as much as possible. KISS.
  
      case 'go':
      case 'move':
        controlMove(inputArg);
        dummyCommandCount = 0;
      break;
  
      case 'n':
      case 'north':
        controlMove("north");
        dummyCommandCount = 0;
      break;
  
      case 's':
      case 'south':
        controlMove("south");
        dummyCommandCount = 0;
      break;
  
      case 'w':
      case 'west':
        controlMove("west");
        dummyCommandCount = 0;
      break;
  
      case 'e':
      case 'east':
        controlMove("east");
        dummyCommandCount = 0;
      break;
  
      case 'look':
        controlLook();
        dummyCommandCount = 0;
      break;
  
      case 'take':
        controlTake(inputArg);
        dummyCommandCount = 0;
      break;
  
      case 'drop':
        controlDrop(inputArg);
        dummyCommandCount = 0;
      break;
  
      case 'equip':
        controlEquip(inputArg);
        dummyCommandCount = 0;
      break;
  
      case 'attack':
        controlAttack(inputArg);
        dummyCommandCount = 0;
      break; 
  
      case 'thisisgod':
        debugMode();
      break;
  
      default: 
          if(dummyCommandCount === 3){
            consoleMsg("> You're being silly");
            dummyCommandCount++;
          } else if ( dummyCommandCount === 5){
            consoleMsg('> I can not tell if you are dumb or forgot how to play');
            dummyCommandCount++;
          } else if ( dummyCommandCount > 6){
            displayHelp();
            dummyCommandCount++;
          } else {
            printLine('> Please input an acceptable command');
            dummyCommandCount++;
          }
        break;
      }
  }
  



//----------------------------------------------- 
//Basic Functions
//----------------------------------------------- 

//print a line on the output
function printLine(msg){

  const para = document.createElement("p");
  const element = document.getElementById("outputcontainer");
  element.appendChild(para);
  element.lastChild.innerHTML = msg;
}
//changes message bellow user input
function consoleMsg(msg){
  consoleMessage.innerHTML = msg;
}

//changes the name displayed in the top left corner
function roomName(name){
  roomTitle.innerHTML = name;
}

//scorechanger function, num determines score change. Displayed in top right corner
function scoreInc(num){
  if(num > 1){
    score = score + num;
    scoreElem.innerHTML = "score: " + score;
    
  } else if (num == 0){
    score = 0;
    scoreElem.innerHTML = "score: " + score;
  } else {
    scoreElem = score;
  }
}

function renderRoom(){
  printLine(currentRoom.desc);
}

function controlMove(dir){
  let newroom = currentRoom[dir];
  if (!newroom)
  {
      printLine("Cannot go " + dir);
      return;
  }

  // check if there is a door that requires an object in that direction
  let key = currentRoom["Door" + dir];
  if (key && bag.indexOf(key) < 0)
  {
    printLine("Cannot go " + dir + ". You need " + key);
      return;
  }

  enterRoom(newroom);
}

function controlLook(){

}

function controlTake(){

}

function controlDrop(){

}

function controlEquip(){

}

function controlAttack(){

}

function debugMode(){

}

function displayHelp(){
  //print controls to game
    printLine("> Welcome to Cable's adventure game\n");
    printLine("> Available commands\n");
    printLine("> <span class='important'>new</span>             - Start a new game");
    printLine("> <span class='important'>help</span>            - Display this help information");
    printLine("> <span class='important'>look</span>            - Look in the room");
    printLine("> <span class='important'>n/s/w/n</span>         - Go in the specified direction. Read room description to understand where you can go.");
    printLine("> <span class='important'>grab object</span>     - Grab specified object from the room");
    printLine("> <span class='important'>drop object</span>     - Drop specified object from the bag");
    printLine("> <span class='important'>bag</span>             - Shows the content of the bag");
    printLine("> ");

}




