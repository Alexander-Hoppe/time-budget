//app object for initialization
const app = {
    running : false,
    start: function() {
        displayTime(testButton);
    }
};

//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

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

// https://www.wikihow.com/Display-Time-in-HTML
function displayTime(inst) {
    if (inst.counting === true) {
        document.getElementById(inst.outputId).innerHTML = countUp(1);//h+":"+m+":"+s;
        setTimeout(displayTime,1000,inst);
    }
    else {
        document.getElementById(inst.outputId).innerHTML = inst.cumulativeTime;//h+":"+m+":"+s;
        setTimeout(displayTime,1000,inst);
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
    // check, whether the app is running
    if (app.running === false) {
        app.start();
        app.running = true;
    }
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
