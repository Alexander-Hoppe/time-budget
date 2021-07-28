//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

// We should use properties of the buttons that are updated by the functions
// instead of using global variables
let counting = false;
let resumeTime = 0;
let cumulativeTime = 0;
const button = "output";

document.addEventListener("DOMContentLoaded", function() {
    displayTime();
});

// https://www.wikihow.com/Display-Time-in-HTML
function displayTime() {
    if (counting === true) {
        document.getElementById(button).innerHTML = countUp(1);//h+":"+m+":"+s;
        setTimeout('displayTime(button)',1000);
    }
    else {
        document.getElementById(button).innerHTML = cumulativeTime;//h+":"+m+":"+s;
        setTimeout('displayTime(button)',1000);
    }
}

let task = document.getElementById("task");

task.addEventListener("click", async () => {
    // start counting
    if (counting === false) {
        counting = true;
        resumeTime = Math.floor(Date.now() / 1000);
    }
    // stop counting
    else {
        counting = false;
    }
});

function countUp(refreshRate) {
    cumulativeTime += refreshRate;

    return cumulativeTime;
}
