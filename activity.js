//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

// We should use properties of the buttons that are updated by the functions
// instead of using global variables
//
// let counting = false;
// let resumeTime = 0;
// let cumulativeTime = 0;
// const button = "output";

const testButton = {
    taskName: "testTask",
    id       : 0,
    counting: false,
    resumeTime : 0,
    cumulativeTime : 0,
    outputId : "testOutput"
  // fullName : function() {
  //   return this.firstName + " " + this.lastName;
  // }
};

document.addEventListener("DOMContentLoaded", function() {
    displayTime();
});

// https://www.wikihow.com/Display-Time-in-HTML
function displayTime() {
    if (testButton.counting === true) {
        document.getElementById(testButton.outputId).innerHTML = countUp(1);//h+":"+m+":"+s;
        setTimeout('displayTime()',1000);
    }
    else {
        document.getElementById(testButton.outputId).innerHTML = testButton.cumulativeTime;//h+":"+m+":"+s;
        setTimeout('displayTime()',1000);
    }
}

// https://stackoverflow.com/questions/13893138/javascript-click-event-listener-on-multiple-elements-and-get-target-id
buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click',redirect,false);
}

function redirect(ev){
    // alert(ev.target.id);
    //--------------------------------------------------------------------------
    // start counting
    if (testButton.counting === false) {
        testButton.counting = true;
        testButton.resumeTime = Math.floor(Date.now() / 1000);
    }
    // stop counting
    else {
        testButton.counting = false;
    }
}

function countUp(refreshRate) {
    testButton.cumulativeTime += refreshRate;

    return testButton.cumulativeTime;
}
