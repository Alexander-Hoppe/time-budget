//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.counting = false;
        this.resumeTime = 0;
        this.cumulativeTime = 0;
        this.outputId = "output";
    }
    countUp(refreshRate) {
        this.cumulativeTime += refreshRate;
        return this.cumulativeTime;
    }
}

let tt = new Task("paper", 120);

//app object for initialization
// do this individually for each button? (replacing "tt" with "this")
const app = {
    running : false,
    start: function(taskInstance = null) {
        displayTime(taskInstance);
    }
};

function displayTime(inst=null) {
    if (inst.counting === true) {
        document.getElementById(inst.outputId).innerHTML = inst.countUp(1) + " " + inst.name;//h+":"+m+":"+s;
        setTimeout(displayTime,1000,inst); // https://www.w3schools.com/jsref/met_win_settimeout.asp
    }
    else {
        document.getElementById(inst.outputId).innerHTML = inst.cumulativeTime;// + " " + inst.name;//h+":"+m+":"+s;
        setTimeout(displayTime,1000,inst); // https://www.w3schools.com/jsref/met_win_settimeout.asp
    }
}

// https://stackoverflow.com/questions/13893138/javascript-click-event-listener-on-multiple-elements-and-get-target-id
buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length; i++){
    buttons[i].addEventListener('click',redirect,false);//(buttons[i]),false);
}

function redirect(task){
    // alert(task.target.id);
    //--------------------------------------------------------------------------
    // does a button instance for the clicked on innerHTML already exist?
    // make a dictionary and see if the respective key exists
    // if the key does not exist, instantiate a new button
    // check, whether the app is running
    if (app.running === false) {
        app.start(tt);
        app.running = true;
    }
    // start counting
    if (tt.counting === false) {
        tt.resumeTime = Math.floor(Date.now() / 1000);
        tt.counting = true;
        console.log(tt.counting)
        return;
    }
    // stop counting
    if (tt.counting === true) {
        tt.counting = false;
        console.log(tt.counting)
        return;
    }
}
