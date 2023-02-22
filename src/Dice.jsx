import React from "react"

export default function Dice(props){
    //create a variable to hold the 2 different color possibilities
    const background = {
        backgroundColor: props.keep ? '#59E391' : '#FFFFFF'
    }
// create a variable to hold the class to be used as the die number. Use conditional statements to check what current props.value is, when found, assign the
//created variable the corresponding class name.

if (props.value === 1){
  return (
    <div className="first-Face" onClick={props.hold} style={background}>
      <span className="dot"></span>
    </div>
 )
}
else if (props.value === 2) {
    return (
        <div className="second-Face" onClick={props.hold} style={background}>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
     )
 }
  else if (props.value === 3) {
    return (
        <div className="third-Face" onClick={props.hold} style={background}>
          <span className="dot"></span>
          <span className="dot"></span>
          <span className="dot"></span>
        </div>
     )
} 
else if (props.value === 4) {
    return (
        <div className="fourth-Face" onClick={props.hold} style={background}>
          <div className="fourth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="fourth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
     )
} 
else if (props.value === 5) {
    return (
        <div className="fifth-Face" onClick={props.hold} style={background}>
          <div className="fifth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="fifth-Face-Column">
            <span className="dot"></span>
          </div>  
          <div className="fifth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
     )
} else {
    return (
        <div className="fourth-Face" onClick={props.hold} style={background}>
          <div className="fourth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <div className="fourth-Face-Column">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
        </div>
     )
}


    // else {
    //     // number instead of dots
    // return (
    //    <div className="eachDie" onClick={props.hold} style={background}>
    //    <h2 className="h2die">{props.value}</h2>
    //    </div>
    // )
    // }
}