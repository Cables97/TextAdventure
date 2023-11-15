import './App.css';

const ui = require("UI");
const definitions = require("Rooms");


const bagSize = 2;

var world;
var bag;
var room;

function enter()
{
    ui.createUI();
    startGame();
}




function startGame()
{
    ui.clear();
    
    world = definitions.getWorld();
    bag = [];

    handleHelp();
    enterRoom("Living room");
}




function keyPressed()
{
    ui.checkCommand(keyCode, handleInput);
}




function handleInput(s)
{
    if (!s)
        return;
        
    var ar = s.split(" ");
    if (ar.length === 0)
        return;

    ui.println("> " + s);

    var cmd = ar[0].toLowerCase();
    ar.shift();
    
    switch(cmd)
    {
        case "new":
            startGame();
            break;
        case "help":
            handleHelp();
            break;
        case "look":
            handleLook();
            break;
        case "go":
            handleGo(ar);
            break;
        case "grab":
            handleGrab(ar);
            break;
        case "drop":
            handleDrop(ar);
            break;
        case "bag":
            handleBag();
            break;
    }
}




(direction) - move player to next room. direction argument changes the room to matching key-value (eg, north : "room2") (go/move optional)
look - reprints room description
take (item) - add availible item in room to inventory, delete key-value from room
drop (item) - add item key-value to room, remove from inventory
equip (item) - add item to equipped value
attack (enemy) - attacks enemy with equipped item
this is god - debug mode (shows print.logs) 


//event on enter, takes text in input box and passes it as playerController(input).

var input = document.getElementById("inputString");

//onEnter activates 

input.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
      playerController(input);
    }
});






playerController(input);

 function playerController(input){

  //player input could be one or two words. slice into array, first word is action, second is argument. 
  var inputArray = input.split(/\s+/);
  var inputCommand = inputArray[0];
  var inputArg = inputArray[1];
  var dummyCommandCount = 0;


    switch(inputCommand.toLowerCase()) {
      //All player commands go within this switch statement. Simplify as much as possible. KISS.

      case 'go':
      case 'move':
        controlMove(inputArg);
      break;

      case 'n':
      case 'north':
        controlLook("north");
      break;

      case 's':
      case 'south':
        controlLook("south");
      break;

      case 'w':
      case 'west':
        controlLook("west");
      break;

      case 'e':
      case 'east':
        controlLook("east");
      break;

      case 'look':
        controlLook();
      break;

      case 'take':
        controlTake(inputArg);
      break;

      case 'drop':
        controlDrop(inputArg);
      break;

      case 'equip':
        controlEquip(inputArg);
      break;

      case 'attack':
        controlAttack(inputArg);
      break; 

      case 'thisisgod':
        debugMode();
      break;


      default: 
        dummyCommandCount++;

        if(dummyCommandCount === 3){
          printLine("You're being silly");
        } else if ( dummyCommandCount === 5){
          printLine('I can not tell if you are dumb or forgot how to play');
        } else if ( dummyCommandCount === 6){
          controlHelp();
        } else {
          printLine('Please input an acceptable command');
        }
      break;
    }
}




function controlMove(dir){

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

function controlHelp(){
  //print controls to game
  function handleHelp()
{
    printLine("Welcome to 'Escape the lab' adventure game\n");
    printLine("Available commands\n");
    printLine("new             - Start a new game");
    printLine("help            - Display this help information");
    printLine("look            - Look in the room");
    printLine("go direction    - Go in the specified direction. Read room description to understand where you can go.");
    printLine("grab object     - Grab specified object from the room");
    printLine("drop object     - Drop specified object from the bag");
    printLine("bag             - Shows the content of the bag");
    
    printLine("");
}
}


function printLine(arg){
  //add arg to <p>{arg}</p> to Output Div

}



