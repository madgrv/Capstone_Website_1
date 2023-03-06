// Write the code that will do the following:
/* 1. The user should be allowed to choose which calculation they want to do. The first output that the 
user sees when the program runs should say:
//             In which metric is the temperature you are converting?
//             C - Celsius
//             F - Fahrenheit
//             K - Kelvin
// 2. The user should then be asked to userValue the number they want to convert.
// 3. Next, the user should choose what they want to convert their current temperature to. For example:
//             To which metric would you like to convert the temperature?
//             C - Celsius
//             F - Fahrenheit
//             K - Kelvin
// 4. The program should print out the answer in the following format:
// -273°C is 0K. (there's a typo in the text here it should be 0.15K)
// 5. The program should be able to convert from any of the three metrics to any of the three metrics.
// Conversion formulae:

//● Celsius from:
○ Fahrenheit: C = (F -32) x 5/9
○ Kelvin: C = K - 273.15

● Fahrenheit from:
○ Celsius:F=Cx9/5+32
○ Kelvin:F=kx9/5-459.67

● Kelvin from:
○ Celsius: K = C + 273.15
○ Fahrenheit: K = (F + 459.67) x 5/9 */




// Error handling was not requested (nor taught yet)at the time of the assignment but I have added it doing my own research to make a complete program//



//Added a wrapper to have the script wait for the page to fully load event or it would return an error
window.onload = function() {
  document.querySelector('#tempConvert').addEventListener('click', tempConvert)
}

//Wrapped the full code into a single function to call from the webpage:
const tempConvert = () => {
  
  ///// PROGRAM START ////
  
  ////// USER INPUT //////

    do {
      //Ask for the original scale that needs to be converted
      let userScale = (prompt(`From which scale is the temperature you want to convert? 
      C - Celsius
      F - Fahrenheit
      K - Kelvin`))
    
      if (userScale == undefined) {
        break
      } //Exit program if cancelled by the user

      //Check if the value entered matches the required charachters for the start temperature scale
      //Create a boolean and a while loop to request input until values are correct
      let userInputCheck = false
      while (userInputCheck == false) {
        if (userScale == userScale.toLowerCase()) {
            userScale = userScale.toUpperCase();
        }
    
        if ((userScale == "C" || userScale == "F" || (userScale == "K"))) {
    
          userInputCheck = true
    
        } else {
          userScale = (prompt(`You entered an incorrect value, please enter a valid scale
      C - Celsius
      F - Fahrenheit
      K - Kelvin`)) //I had to remove indentation here or the prompt message displayed would not be consistent 
        }
      }
    
    
      //Ask for the temperature value to convert
      let userValue = (prompt("what's the temperature?"))

      //User value in this case is not null if cancelled but should still be a string hence:
      if (userValue == null) {
        break
      }
      
      let temp = Number(userValue)

      //Check if the input is a valid number and cast to Number
      while (isNaN(temp) || temp.length == 0 || temp == "" && temp != 0) {
        userValue = prompt("Please enter a numerical value for the temperature you are trying to convert")
        temp = Number(userValue)
      }
      
    
      //ask for scale you want to convert in
      let targetScale = (prompt(`To which scale do you want to convert? 
      C - Celsius
      F - Fahrenheit
      K - Kelvin`))
    
      if (targetScale == null) {
        break
      }

      //Check if the value entered matches the required charachters for the target temperature scale
      //repeat the check with the boolean and a while loop to request input until values are correct
      userInputCheck = false
      while (userInputCheck == false) {
        if (targetScale == targetScale.toLowerCase()) {
            targetScale = targetScale.toUpperCase();
        }
    
        if ((targetScale == "C" || targetScale == "F" || targetScale == "K")) {
    
          userInputCheck = true
    
        } else {
          targetScale = (prompt(`You entered an incorrect value, please enter a valid scale
      C - Celsius
      F - Fahrenheit
      K - Kelvin`)) //indentation as previous case
        }
      }
    
      ////// USER INPUT END //////
    
    
      //////   OPERATION   //////
    
      let cToF = function(n) {return n * 9/5 + 32;}
      let cToK = function(n) {return n + 273.15;}
      let fToC = function(n) {return (n - 32) * 5/9;}
      let fToK = function(n) {return (n - 32) * 5/9 + 273.15;} //Google conversion formula
      let kToC = function(n) {return n - 273.15;}
      let kToF = function(n) {return (n - 273.15) * 9/5 + 32;} //Google conversion formula
    
      if (userScale == "C" && targetScale == "F") {
        alert(cToF(userValue).toFixed(3) + "\u00B0" + targetScale)
        
      } else if (userScale == "C" && targetScale == "K") {
        alert(cToK(userValue).toFixed(3) + "\u00B0" + targetScale) 
        /* .toFixed() method to round conversions to 3 decimal points,
        it was discussed in group chat for a previous task*/
    
      } else if (userScale == "F" && targetScale == "C") {
        alert(fToC(userValue).toFixed(3) + "\u00B0" + targetScale)
    
      } else if (userScale == "F" && targetScale == "K") {
        alert(fToK(userValue).toFixed(3) + "\u00B0" + targetScale)
    
      } else if (userScale == "K" && targetScale == "C") {
        alert(kToC(userValue).toFixed(3) + "\u00B0" + targetScale)
    
      } else if (userScale == "K" && targetScale == "F") {
        alert(kToF(userValue).toFixed(3) + "\u00B0" + targetScale)
    
      } else {
        alert("The initial scale and the target scale can't be equal")
      }
    
      startAgain = prompt("Convert another (y/n)?")
    
    } while (startAgain.toLowerCase() == "y");
    
    alert("Stay warm!")
    
    ////// END OF PROGRAM //////
}



/* 
////// RESOURCES //////
 https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions
  [accessed on 29th Dec 2022] used to understand the use of a function to create and store a mathematical formula

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/while
  [accesses on 29th Dec 2022] used for the while loop 

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed
  [accessed on 29th Dec 2022] used to round Fahrenheit and Kelvin conversion to 3 decmal points maximum
*/
