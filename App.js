import {roomMaster} from './modules/Rooms.js'

//Constants

//----------------------------------------------- 
//DOM Variables
//----------------------------------------------- 
const domOutputBox = document.getElementById("outputcontainer");
const domRoomTitle = document.getElementById("roomTitle");
const domScoreElem = document.getElementById("score");
const domInputField = document.getElementById("input");
const domConsoleMessage = document.getElementById("inputMessage");
const domAnchor = document.getElementById("anchor");

//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
let world = [];
let bag = [];

let boolDebug = false;
let score = 0;
let dummyCommandCount = 0;
let equippedItem = [];
let currentEnemy = '';
let currentRoom ={};

//----------------------------------------------- 
//Event Functions
//----------------------------------------------- 
window.onload = (event) => {
  startGame();
};

function startGame(){
  world = roomMaster;
  bag = [];
  equippedItem = [];
  scoreInc(0);
  dummyCommandCount = 0;
  printIntro();
  printHelp();
  enterRoom("StartingRoom");
  console.log(world);
}

//event on enter listener, takes text in input box and passes it as playerController(input).
domInputField.addEventListener("keydown", function (e) {
  if (e.code === 'Enter') {
    userInput();
  }
});

//parses user command, passes it to userCommand
function userInput(){
  let userCommand = domInputField.value.toLowerCase();
  console.log("userCommand= " + userCommand)
  domInputField.value = ""
  printLine(userCommand);
  playerController(userCommand);
  domOutputBox.scrollBy(0, 1000);
}



//----------------------------------------------- 
//Game Functions
//----------------------------------------------- 
//Checks if the room that the currentRoom points to exists. If not, cannot find room. PLAYER SHOULD NEVER SEE CANNOT FIND ROOM
function enterRoom(roomName)
{
    let r = findRoom(roomName);
    if (!r)
    {
      printLine("Cannot find room " + roomName);
        return;
    }
    
    currentRoom = r;

    printRoom(currentRoom);
    updateRoomName(currentRoom.title);
}

//checks if the room is in world list. Returns availible room by name.
function findRoom(roomName)
{
  console.log(world);
    for(var r of world)
    {
        if (r.title === roomName)
            return r;
    }
    
    return null;
}

//prints room Description
function printRoom(){

  printLine('');
  //prints the desc that matches the index of the first array value
  let i = currentRoom.desc[0];
  printLine(currentRoom.desc[i]);

    // if desc2 is 'on', prints the desc that matches the index of the first array value
  if(currentRoom.desc2[0] == 1){
    printLine('');
    printLine(currentRoom.desc2[i]);
  } 
  else if (currentRoom.desc2[0] == 2){
    printLine('');
    printLine(currentRoom.desc2[i]);
  }

  //prints if enemy in the room
  if('enemy' in currentRoom){
    if(currentRoom.enemy[2] == true){
      currentEnemy = currentRoom.enemy[0];
      printLine(currentRoom.enemy[1]);
    } else {
        printLine(currentRoom.enemy[3]);
        currentEnemy = '';
    }
  }




  (boolDebug) ? console.log(currentRoom.desc[1]) : null;
  (boolDebug) ? console.log(currentRoom.desc2[1]) : null;
  (boolDebug) ? console.log(currentRoom.desc[2]) : null;
  (boolDebug) ? console.log(currentRoom.desc2[2]) : null;

  printLine('');

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


    //player input could be one or two words. slice into array, first word is action, second is argument. 
    let inputstr = input;
  
    let inputArray = inputstr.split(/\s+/);
  
    let inputCommand = inputArray[0];
    //console.log("input command= " + inputCommand);
  
    let inputArg = inputArray[1];
    //console.log("input argument= " + inputArg);
  
    //console.log("dummyCommandCount= " + dummyCommandCount);
  
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

      case 'bag':
        printBag();
        dummyCommandCount = 0;
      break;

      case 'newgame':
        printLine("");
        printLine("");
        startGame();
      break;

      default: 
          if(dummyCommandCount === 3){
            consoleMsg("You're being silly");
            dummyCommandCount++;
          } else if ( dummyCommandCount === 5){
            consoleMsg('I can not tell if you are dumb or forgot how to play');
            dummyCommandCount++;
          } else if ( dummyCommandCount > 6){
            printHelp();
            dummyCommandCount = 0;
          } else {
            printLine('Please input an acceptable command');
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
  domOutputBox.appendChild(para);
  domOutputBox.lastChild.innerHTML = '> ' + msg;
}


//changes message bellow user input
function consoleMsg(msg){
  domConsoleMessage.innerHTML = msg;
}

//changes the name displayed in the top left corner
function updateRoomName(name){
  domRoomTitle.innerHTML = name;
}

//scorechanger function, num determines score change. Displayed in top right corner
function scoreInc(num){
  if(num > 1){
    score = score + num;
    domScoreElem.innerHTML = "score: " + score;
    
  } else if (num == 0){
    score = 0;
    domScoreElem.innerHTML = "score: " + score;
  } else {
    domScoreElem.innerHTML = score;
  }
}



function printIntro(){
  printLine("Welcome to Cable's adventure game");
}


function printHelp(){
  //print controls to game
    
  printLine("Available commands\n");
  printLine("<span class='important'>new</span>             - Start a new game");
  printLine("<span class='important'>help</span>            - Display this help information");
  printLine("<span class='important'>look</span>            - Look in the room");
  printLine("<span class='important'>(go) n/s/w/n</span>    - Go in the specified direction. Read room description to understand where you can go.");
  printLine("<span class='important'>grab object</span>     - Grab specified object from the room");
  printLine("<span class='important'>drop object</span>     - Drop specified object from the bag");
  printLine("<span class='important'>bag</span>             - Shows the content of the bag");
  printLine("");

}





//----------------------------------------------- 
//Character Functions
//----------------------------------------------- 


function controlMove(dir){
  let newroom = currentRoom[dir];
  //does room exist?
  if (!newroom)
  {
      printLine("Cannot go " + dir +". There is nowhere to go in that direction");
      return;
  }
  scoreInc(10);
  enterRoom(newroom);
}

function controlLook(){
  printRoom();
}

function controlTake(inputArg){
  let roomItems = currentRoom.items;

  if (roomItems.includes(inputArg)){
    bag.push(inputArg);
    let x = currentRoom.items.indexOf(inputArg);
    currentRoom.items.splice(x,1);
    printLine('You now have ' + bag + " in your bag");
    (boolDebug) ? console.log('bag items= ' + bag) : null;
    (boolDebug) ? console.log('room items= ' + roomItems) : null;
    scoreInc(10);
  }else{
    printLine('No item found with that name')
  }

}

function controlDrop(inputArg){
  let roomItems = currentRoom.items;

  if (bag.includes(inputArg)){
    roomItems.push(inputArg);
    let x = bag.indexOf(inputArg);
    bag.splice(x,1);
    printLine('You have dropped ' + inputArg + " it is no longer in your bag");
    (boolDebug) ? console.log('bag items= ' +bag): null;
    (boolDebug) ? console.log('room items= ' +roomItems): null;

    if (inputArg == equippedItem[0]){
      equippedItem.pop();
      printLine("You have dropped your equipped " + inputArg);      
    }
    scoreInc(10);
    }else{
      printLine('No item found with that name')
    }


}

function controlEquip(inputArg){
  //check if in bag, if not, 
  if (bag.includes(inputArg)){
    
    if (equippedItem.length == 0){
      equippedItem.push(inputArg)
      printLine("You have equipped your " + inputArg)
      (boolDebug) ? console.log("equipped item " + equippedItem[0]) : null;
    } else if(equippedItem.length == 1){
      equippedItem.pop();
      equippedItem.push(inputArg);
      printLine("You already have something equipped...   " + equippedItem + " equipped instead")
    }
  }else {
    printLine("You dont have anything by the name of " + inputArg + " in your bag")

  }
 
  //if nothing equipped, check if item is in bag, if it is, add item to equipped. If not nothing. If holding something 

}

function printBag(){
  if(bag.length == 0){
    printLine('You have nothing in your bag');
    (boolDebug) ? printLine('inventory check success') : null;
  }else if(equippedItem.length > 0){
    printLine('You have ' + bag + " in your bag, and " + equippedItem +" is equipped");
  } else{
    printLine('You have ' + bag + " in your bag");
  }
}


function controlAttack(){
}

function debugMode(){
  if(!boolDebug){
    console.log('debug is true');
    boolDebug = true;
    (boolDebug) ? printLine('debug mode activated') : null;
  }else{
    console.log('debug is false');
    boolDebug = false;
  }
}



