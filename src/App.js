
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload. 
        </p>
        <form>
          <input type="text" id="inputString" placeholder="enter text here" size="20"></input>
        </form>
      </header>
    </div>
  );
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

//event on enter, takes text in input box and passes it as playerController(input).

var input = document.getElementById("inputString");

//onEnter activates 

input.addEventListener("keydown", function (e) {
    if (e.code === 'Enter') {
      playerController(input);
    }
});






playerController("Lorum Lipsum");

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
}


function printLine(){
  //print line above text box
}




export default App;
