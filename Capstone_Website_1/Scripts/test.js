
// let currentTime = () => {
//     let time = new Date().toLocaleString("it-IT")
//     console.log(time)
// }

// setInterval(currentTime, 1000) 

let clock = () => {
    const formattedDate = new Date().toLocaleString("en-EN", {
        weekday: "long",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
      });
    
    
    console.log(formattedDate)
}

setInterval(clock, 1000) 
