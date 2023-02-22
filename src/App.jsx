
import React from "react"
import Confetti from "react-confetti"
import Dice from "./Dice.jsx"

export default function App() {
    
    //things i need
    
    //use state to create the dice array, initializing using the diceCreator function
    const [diceArr, setDiceArr] = React.useState(diceCreator());
    //use state to create a wonYet variable, thata boolean, that indicates whether or not all the numbers match
    const [wonYet, setWonYet] = React.useState(false);

    const [currentRolls, setCurrentRolls] = React.useState(0);

    const [lowRollRecord, setLowRollRecord] = React.useState(
      JSON.parse(localStorage.getItem("lowRollRecord")) || 20
    );

    const [time, setTime] = React.useState(0);  //new for timer

    const [timeStarted, setTimestarted] = React.useState(false); //new for timer

    // const [timerOn, setTimerOn] = React.useState(setInterval(()=>setTime(prevTime =>{
    //     return prevTime + 1}), 1000));  //new for timer

    //react useEffect checks to see if dice array has changed.
    //everytime it changes, check to see if all the values are the same and see if all have the "keep" boolean set to true. if these check out, setWonYet to true
    React.useEffect(()=> {
    let allKept = true;
    let allSameValue = true;
    let checkedValue = diceArr[0].value;
    diceArr.forEach(die => {
        if(!die.keep) {
          allKept = false;
        }
        if(die.value !== checkedValue) {
            allSameValue = false;
        }
    });
    if (allKept && allSameValue) {
        setWonYet(true);
        if(currentRolls < lowRollRecord){
            setLowRollRecord(currentRolls);
            localStorage.setItem("lowRollRecord", JSON.stringify(currentRolls));
        }
    } 
    }, [diceArr]);

    // React.useEffect(()=> {
    //      if (!wonYet) {
    //         timerOn = setInterval(()=>setTime(prevTime =>{
    //             return prevTime + 1}), 1000);
    //             setTimestarted(true);
    //         }
    //     else if (wonYet){
    //     clearInterval(timerOn); //new for timer
    //     setTimestarted(false); //new for timer
    //     }
    // }, [wonYet]);

    //new for 
    // function timerFunc(){
    //     if(!timeStarted){
    //        timerOn = setInterval(()=>setTime(prevTime =>{
    //         return prevTime + 1}), 1000);
    //         setTimestarted(true);
    //     }
    //     return ""
    //   }
    
    
    //function radnomDiceNum, creates number 1-6
    function randomDiceNum(){
        return Math.floor(Math.random() * 6) + 1;
    }
    
    // func "diceCreator" creates an array of dice objects with random numbers
        //1-6 in the value key, a "keep" key that is a boolean indicating whether or not a dice has been chosen to keep, and an "id" key which will be its index value.
    function diceCreator(){
        const dice = [];
        for(let i=1; i<=10; i++){
            dice.push({
                value: randomDiceNum(),
                keep: false,
                id: i
            });
        }
        // timerFunc();
        return dice
    }

        
    //funciton holdDieClick(accepts id)
    //sets the dice array. here we check each die's id, if its the current id that was passed in, change the boolean "keep" value, then addd to return array. otherwise, add to return array. return the arrray
    function holdDieClick(id){
        setDiceArr(prevDiceArr => {
            const returnArr = [];
             prevDiceArr.forEach(die => 
                die.id === id ? returnArr.push({...die, keep: !die.keep}) : returnArr.push(die)
            );
            return returnArr
        })
    }
    
    // function rollDice ()
    function rollDice(){
    //if wonYet === true
    if (wonYet === true){
        //go create state for wonYet
    //setDice, run dice creater and also reset wonYet to false
    setCurrentRolls(0);
    setDiceArr(diceCreator());
    setWonYet(false);
    } else {
    //if wonYet !== true
    setCurrentRolls(prevRoll => prevRoll + 1);
    // setDice, for each dice, if the "keep" key is false, generate new random number 1-6 and add to return array, otherwise, add to return array as is
        setDiceArr(prevDice => {
            return prevDice.map(die => die.keep ? die : {...die, value: randomDiceNum()});
        });
      }
    }
    
    
    // use map to create an array of Dice compenents to be rendered
    const diceElements = diceArr.map(die =>(
            <Dice {...die} key={die.id} hold= {()=> holdDieClick(die.id)} />
        ))
    
    //down below in the return
        //see if wonYet is true, if so, confettie show
        
        //after </p>, create div that renders the array of Dice components
        
        //create button for rolling dice. button says "Roll Dive" or "Play again"

        //after game works, re-add this next conditional after main
        // {wonYet && <Confetti />}

    return (
        <main >
              {wonYet && <Confetti className="confetti" />}
            <div className="div1">
                <div className="top-div">
                    <h2 className="current-rolls">Current <br></br> Rolls: <br></br> {currentRolls}</h2>
                    <h1 className="tenzies">Tenzies</h1>
                    <h2 className="current-rolls">Current <br></br> time: <br></br> {time} sec</h2>
                </div>
                    {/* <h1 className="tenzies">Tenzies</h1> */}
                    <p className="description">
                    Roll until all dice are the same. Click each die to freeze
                    it at it current value between rolls.
                    </p>
                    <div className="Dice--Container">
                    {diceElements}
                    </div>
                    <div className="top-div">
                        <h2 className="current-rolls">Low Roll <br></br> Record:<br></br>{lowRollRecord}</h2>
                        <button onClick={rollDice} className="button">
                        {wonYet ? "Reset?" : "Roll"}
                        </button>
                        <h2 className="current-rolls">Low Time <br></br> Record:<br></br>0 sec</h2>
                    </div>
            </div>
        </main>
    )
}