//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = duration;
        this.active = false;
        this.counting = false;
        this.resumeTime = 0;
        this.cumulativeTime = 0;
        this.outputId = this.name + "Output";
    }
    start(inst) {
        displayTime(inst);
    }
    countUp(refreshRate) {
        this.cumulativeTime += refreshRate;
        return this.cumulativeTime;
    }
}

function displayTime(inst=null) {
    if (inst.counting === true) {
        document.getElementById(inst.outputId).innerHTML = inst.countUp(1);
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
    buttons[i].addEventListener('click',redirect);
}

// empty object to keep track of instantiated Tasks
tasks = {}

function redirect(ev){
    console.log("you clicked on "+ev.target.id);
    //--------------------------------------------------------------------------

    if (!(ev.target.id in tasks)) { // does a button instance for the clicked on id already exist?
        tasks[ev.target.id] = new Task(ev.target.id, 120); // if the key does not exist, instantiate a new button
    }

    // check, whether the task is active
    if (tasks[ev.target.id].active === false) {
        tasks[ev.target.id].start(tasks[ev.target.id]);
        tasks[ev.target.id].active = true;
    }

    // start counting
    if (tasks[ev.target.id].counting === false) {
        tasks[ev.target.id].resumeTime = Math.floor(Date.now() / 1000);
        Object.values(tasks).forEach(val => val.counting = false);
        tasks[ev.target.id].counting = true;
        console.log("started counting "+ev.target.id);
        return;
    }

    // stop counting
    if (tasks[ev.target.id].counting === true) {
        tasks[ev.target.id].counting = false;
        console.log("stopped counting"+ev.target.id);
        return;
    }
}
