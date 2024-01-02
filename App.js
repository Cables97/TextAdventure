import {roomMaster, enemyMaster, } from './modules/Data.js'
//------------------------------------------------
//Constants
//------------------------------------------------
const enemyBank = enemyMaster;
//const itemBank = itemMaster; --not used
const roomBank = roomMaster;

//----------------------------------------------- 
//DOM Variables
//----------------------------------------------- 
const domOutputBox = document.getElementById("outputcontainer");
const domRoomTitle = document.getElementById("roomTitle");
const domScoreElem = document.getElementById("score");
const domInputField = document.getElementById("input");
const domInputButton = document.getElementById("inputbtn");
const domConsoleMessage = document.getElementById("inputMessage");

//----------------------------------------------- 
//Game Variables
//----------------------------------------------- 
let world = [];
let currentEnemy = '';
let currentRoom ={};

let boolDebug = false;

let score = 0;
let dummyCommandCount = 0;

let bag = [];
let equippedItem = [];

let darkCount = 0;

//----------------------------------------------- 
//Event Functions
//----------------------------------------------- 

//start game onload
window.onload = (event) => {
  startGame();
  domInputField.focus();
};

//clear variables, set room
function startGame(){
  world = roomBank;
  bag = [];
  equippedItem = [];
  scoreInc(0);
  dummyCommandCount = 0;
  printIntro();
  printHelp();
  enterRoom("StartingRoom");
}

//event on touch listener, takes text in input box and passes it as playerController(input) **for mobile.
domInputButton.addEventListener("touchstart", function (e) {
    prompt()
    userInput();
}
);

//event on enter listener, takes text in input box and passes it as playerController(input).
domInputField.addEventListener("keydown", function (e) {
  if (e.code === 'Enter') {
    userInput();
    
  }
}
);

//parses user command, passes it to userCommand
function userInput(){
  let userCommand = domInputField.value.toLowerCase();
  domInputField.value = ""
  printLine(userCommand);
  playerController(userCommand);
  
}

//----------------------------------------------- 
//Game Functions
//----------------------------------------------- 
//Checks if the room that the currentRoom points to exists. If not, cannot find room. PLAYER SHOULD NEVER SEE CANNOT FIND ROOM
function enterRoom(roomName)
{
  //does the room that we are directed to exist
    let r = findRoom(roomName);
    if (!r)
    {
      //printLine("Cannot find room " + roomName);
        return;
    }
    
    let deathCheck = isDarkCounter();

    if(!deathCheck){
        currentRoom = r;
        darkCheck();
        printRoom(currentRoom);
        updateRoomName(currentRoom.title);
    } else{
      killPlayer();
    }

}

//checks if the room is in world list. Returns availible room by name.
function findRoom(roomName)
{
    for(var r of world)
    {
        if (r.title === roomName)
            return r;

    }
    
    return null;
}

//prints room Description
function printRoom(){

  //prints the desc that matches the index of the first array value
  let i = currentRoom.desc[0];
  printLine(currentRoom.desc[i]);

    // if desc2 is 'on', prints the desc that matches the index of the first array value
    if('desc2' in currentRoom){
      //set current string index to whether has item or not
      //let crItems = currentRoom.items;
      //(crItems.length == 1) ? currentRoom.desc2[0] = 1 : currentRoom.desc2[0] = 2; 
      let descIndex = currentRoom.desc2[0];
      printLine(currentRoom.desc2[descIndex]);
    }


  //prints if enemy in the room
  if('enemy' in currentRoom){
    if(currentRoom.enemy[2] == true){
      mountEnemy(currentRoom.enemy[0]);
      printEnemy();
    } else {
        unmountEnemy() 
    }
  }
}

//checks for a locked door in room  
function lockedDoor(inputArg){
  if ('lockedExit' in currentRoom){
  let lockedExits = currentRoom.lockedExit; //[0[0], 0[1]], [1[0], 1[1]],
  let desiredDirection = inputArg;
  //for every 'locked door' in the current room
  for(let i = 0; i < lockedExits.length; i++){
      //if the input direction matches where the locked door is
    if (lockedExits[i][0] == desiredDirection){
      let requiredItem = lockedExits[i][1]
      //check if they have a matching item to the required item
      if(bag.includes(requiredItem)){
            lockedDoorRemoval(desiredDirection);
            printLine("After unlocking, the key snaps off in the door.")
            printLine("Key removed from bag")
           
            return false;
      }else{
            return true;
        }

        } 
      }
    }
}

//removes the locked door when key in inventory
function lockedDoorRemoval(inputArg){
  //iterate through locked doors
  let lockedExits = currentRoom.lockedExit; //[0[0], 0[1]], [1[0], 1[1]],
  for(let i = 0; i < lockedExits.length; i++){
      //if the input direction matches where the locked door is
    if (lockedExits[i][0] == inputArg){
      let requiredItem = lockedExits[i][1]
      //check if they have a matching item to the required item
      if(bag.includes(requiredItem)){
          //remove key from bag
          let x = bag.indexOf('key');
          bag.splice(x,1);

          console.log('bag= '+ bag);
          //remove lockedExit from Room
          currentRoom.lockedExit.splice(i, 1);
          console.log(currentRoom.lockedExit);
          
      }
    }
    }
}
//looks in room for enemy,
function findEnemy(enemyName)
{
    for(var r of enemyBank)
    {
        if (r.name === enemyName)
            return r;
    }
    
    return null;
}

//mounts enemy that matches from enemybank
function mountEnemy(enemy){
    let r = findEnemy(enemy);
    if (!r)
      {
        printLine("Cannot find enemy " + enemy);
          return;
      }
      
    currentEnemy = r;
    


}

// if enemy in room, prints the enemy details
function printEnemy(){
  if(currentRoom.enemy[2] == true){
    printLine(currentRoom.enemy[1]);
  } else if (currentRoom.enemy[2] === false) {
    printLine(currentRoom.enemy[4]);
  }
}

// Removes enemy from room, adds reward, prints kill line - instant kill removed need to store past enemies
function killEnemy(){
  //if the player has a weapon
  if (equippedItem[0] == 'knife'){
    //set isalive value to false
    currentRoom.enemy[2] = false;

    //print killing line
    printLine(currentRoom.enemy[3]);
    //add reward to roomitems

    currentRoom.items = currentRoom.items.concat(currentEnemy.reward);

    unmountEnemy();
    printEnemy();
  } else {
    printLine("You have no weapon, that is ill advised")
  }
}

//remove the enemy from current enemy
function unmountEnemy() {
  currentEnemy = "";
}

/* Controls
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
  
    let inputArgument = inputArray[1];

    switch(inputCommand) {
        //All player commands go within this switch statement. Simplify as much as possible. KISS.
  
      case 'go':
      case 'move':
        switch(inputArgument){
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
            }
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
        controlLook(inputArgument);
        dummyCommandCount = 0;
        break;
  
      case 'take':
        controlTake(inputArgument);
        dummyCommandCount = 0;
        break;
  
      case 'drop':
        controlDrop(inputArgument);
        dummyCommandCount = 0;
        break;
  
      case 'equip':
        controlEquip(inputArgument);
        dummyCommandCount = 0;
        break;
  
      case 'attack':
        controlAttack(inputArgument);
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
        newGame();
        break;

      default: 
          if(dummyCommandCount === 3){
            printLine('Please input an acceptable command');
            consoleMsg("You're being silly");
            dummyCommandCount++;
          } else if ( dummyCommandCount >= 6){
            consoleMsg('Maybe this will help?');
            printHelp();
            dummyCommandCount = 0;
          } else {
            printLine('Please input an acceptable command');
            dummyCommandCount++;
            consoleMsg("Console <span class='important'>Message</span>");
          }
        break;
      }
}
  
// reloads the browser. Cleanest way to clear the game
function newGame(){
  window.location.reload();
}

//----------------------------------------------- 
//Basic Functions
//----------------------------------------------- 

//print a line on the output - and scrolls to bottom of output
function printLine(msg){

  const para = document.createElement("p");
  domOutputBox.appendChild(para);
  domOutputBox.lastChild.innerHTML = '> ' + msg;
  domOutputBox.scrollBy(0, 1000);
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

//prints intro
function printIntro(){
  printLine("Welcome to Cable's adventure game");
}

//prints the controls prompts
function printHelp(){
  //print controls to game
    
  printLine("Available commands: \n");
  printLine("<span class='important'>newgame</span>             - Start a new game");
  printLine("<span class='important'>help</span>            - Display this help information");
  printLine("<span class='important'>look (target)</span>            - Look in the room");
  printLine("<span class='important'>(go) n/s/w/e / north/south/west/east</span>    - Go in the specified direction. Read room description to understand where you can go.");
  printLine("<span class='important'>take (object)</span>     - Grab specified object from the room");
  printLine("<span class='important'>drop (object)</span>     - Drop specified object from your bag");
  printLine("<span class='important'>bag</span>             - Shows the content of the bag");
  printLine("");

}

//print bag contents
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

//----------------------------------------------- 
//Character Functions
//----------------------------------------------- 

function controlMove(dir){
  //dir == room movement direction

  let newroom = currentRoom[dir];
  //if the room in that direction is locked, print cant move, if can point to enter room. 

  //if the door is locked, and you dont have item, door is locked
  let lockedBool = lockedDoor(dir);

  //does path in that direction exist?
  if (!newroom)
  {
      printLine("Cannot go " + dir +". There is nowhere to go in that direction");
      return;
  } else{

    if(!lockedBool){
      scoreInc(10);
      enterRoom(newroom);

      
    }else if(lockedBool){
      printLine("The door is locked, you probably need a key to open it.");
}

  }
}

// look command - allows target - contains indiv look targets
function controlLook(inputArg){

  let lookTarget = inputArg;
  if (!lookTarget){
    printRoom();

  }else{  switch(lookTarget) {
    //All look checks
    case 'key':
      if (bag.includes('key')){
        printLine("An iron key, the bow is noticibly more than the rest of the key.. it must get a lot of use.");
      } else {printLine("You can't see what you're trying to look at");}
      break;

    case 'knife':
      if (bag.includes('knife')){
        printLine("An old kitchen knife. The large flat blade is fairly dull, and large chips in the cutting edge mean this blade is best used for stabbing.. or tetanus poisoning");
      } else {printLine("You can't see what you're trying to look at");}
      break;

    case 'key2':
      if (bag.includes('key2')){
        printLine("A modern key, looks like it's for a deadbolt.");
      } else { printLine("You can't see what you're trying to look at");}
      break;
      
    case 'guard':
      if (currentEnemy == 'guard'){
        printLine(currentEnemy.desc);
      } else { printLine("Who?");}
      break;

    case 'lamp':
      if (bag.includes('lamp')){
        printLine("A small brass lamp");
      } else { printLine("You can't see what you're trying to look at");}
      break;

    case 'tray':
    case 'foodtray':
    case 'glint':
    case 'slop':
    case 'food':
      if(currentRoom.title == 'StartingRoom'){
      if (currentRoom.desc2[0] == 1){
        printLine("You flip the tray over, spilling the slop on the floor. A key clatters onto the floor, it was hidden under the excuse for food.")
        currentRoom.items.push('key');
        currentRoom.desc2[0] = 2;
      } else if (currentRoom.desc2[0] == 2 && currentRoom.items.includes('key')){
        printLine('A key lays on the floor beside the slop.')
        printLine()
      }
    }
      break;

    case 'room':
    case 'around':
      printRoom();
      break;

    default:
      printLine("You can't see what you're trying to look at");
      break;
    } 
}

}

//adds target item to players bag, removes from room
function controlTake(inputArg){
  let roomItems = currentRoom.items;

  if (roomItems.includes(inputArg)){
    //let i = findRoom(currentRoom.title);
    //add item to bag
    bag.push(inputArg);
    //remove item with that name from the current room items
    let x = currentRoom.items.indexOf(inputArg);
    currentRoom.items.splice(x,1);
    printLine('You now have ' + bag + " in your bag");
    scoreInc(10);

    if(equippedItem.length == 0 && inputArg == 'knife'){
      controlEquip('knife');
    }



  }else{
    printLine('No item found with that name');
  }

}

// drop command - drops item in room. Adds to items list, adds dropped desc2 to room
function controlDrop(inputArg){
  let roomItems = currentRoom.items;

  if (bag.includes(inputArg)){
    roomItems.push(inputArg);
    let x = bag.indexOf(inputArg);
    bag.splice(x,1);
    printLine('You have dropped ' + inputArg + " it is no longer in your bag");

    let desc2Bool = 1 ;
    let desc2Prompt = 'A ' + inputArg + ' lays on the floor by your feet.';
    currentRoom['desc2'] = [desc2Bool, desc2Prompt];

    if (inputArg == equippedItem[0]){
      equippedItem.pop();
      printLine("You have dropped your equipped " + inputArg);      
    }
    scoreInc(10);
    }else{
      printLine('No item found with that name');
    }


}

// equip command
function controlEquip(inputArg){
  //check if in bag, if not, 
  if (bag.includes(inputArg)){
    
    if (equippedItem.length == 0){
      equippedItem.push(inputArg);
      printLine("You have equipped your " + inputArg);
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

// attack command
function controlAttack(inputArg){
 if(inputArg == currentEnemy.name){
  killEnemy();
 } else{
  printLine("You swing at the air");
 }

}

//counts how many rooms the player has been in without a lightsource. more than 2 and insta-death
function isDarkCounter(){
  if('isDark' in currentRoom){
    if (bag.includes('lamp')){
      darkCount = 0;
      return false
    }else{
      darkCount++;
      if(darkCount == 2){
        return true;
    }
      else{
        return false;
  }}}
}

//if there is lamp in bag, and I'm its isDark is true, the room desc prints the first desc. if the dark is true, but no lamp, desc2,
function darkCheck(){ 
  if ('isDark' in currentRoom){
  let lampCheck = bag.includes('lamp')
  if(lampCheck == false && currentRoom.isDark == true){
    //change desc to dark desc
    currentRoom.desc[0] = 2;
  } else if(lampCheck == true)
    currentRoom.desc[0] = 1;

    }
}

//Pushes player into dead 'room'
function killPlayer(){
  console.log('you dead')
  enterRoom('dead');
}

//debug console, obsolete
function debugMode(){
  if(!boolDebug){
    boolDebug = true;
    (boolDebug) ? printLine('debug mode activated') : null;
  }else{
    boolDebug = false;
  }
}
