//https://stackoverflow.com/questions/221294/how-do-you-get-a-timestamp-in-javascript#221297
if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

class Task {
    constructor(name, duration) {
        this.name = name;
        this.duration = 60*duration;
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

init = document.getElementsByClassName("button gradientbutton");
for (var i = 0; i < init.length; i++){
    targetHeight = Number(init[i].innerText.slice(-2,-1));
    init[i].style['line-height'] = targetHeight*20 + "vh";
}

function displayTime(inst=null) {
    if (inst.counting === true) {
        document.getElementById(inst.name).style.background =
            "linear-gradient(#00E0B0 " + ((inst.duration-inst.cumulativeTime)/inst.duration)*100 +
            "%, #00BA92 " + ((inst.duration-inst.cumulativeTime)/inst.duration)*100 + "%)";
        inst.countUp(.1);
        if (inst.cumulativeTime > inst.duration) {
            document.getElementById(inst.name).style['line-height'] = (inst.cumulativeTime/inst.duration)*30 + "vh";
            document.getElementById(inst.name).style['background'] = "#4F0080";
        }
        setTimeout(displayTime,100,inst); // https://www.w3schools.com/jsref/met_win_settimeout.asp
    }
    else {
        //document.getElementById(inst.outputId).innerHTML = inst.cumulativeTime;// + " " + inst.name;//h+":"+m+":"+s;
        setTimeout(displayTime,100,inst); // https://www.w3schools.com/jsref/met_win_settimeout.asp
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
        T = document.getElementById(ev.target.id).innerText; // Grab the time budget for the task
        T = T.slice(-2,-1);
        tasks[ev.target.id] = new Task(ev.target.id, Number(T)); // if the key does not exist, instantiate a new button
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
