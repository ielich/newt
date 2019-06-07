/*const fs = require('fs');
const harFile = 'stackoverflow.har';

// Use synchronous file reading to read HAR from json string into an object
const harContent = fs.readFileSync(harFile, 'utf8');
const contentObj = JSON.parse(harContent);
const entries = contentObj.log.entries;

// Array of response objects
const response = [];
entries.forEach((entry) => {
    response.push({
        time: entry.time,
        type: entry._resourceType,
        size: entry.response.content.size
    });
});*/

const response = [{time: 2000, type: "html", size: 261.6}, {time: 1000, type: "img", size: 440}, {time: 1500, type: "document", size: 698.5}];

// use web audio api to generate sound
const play = (obj) => {
    let context = new AudioContext();
    let osc = context.createOscillator();
    let ramp = context.createGain();
    osc.frequency.value = obj.size;
    osc.connect(context.destination);
    osc.start(0);
    setTimeout(() => {
        ramp.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.1);
        osc.stop();
    }, obj.time);
};

response.forEach((item, index) => {
    if(index === 0 ) {
        play(item);
    } else {
        setTimeout(() => {
            play(item);
        }, response[index-1].time);
    }
});

// calculate total time
let totalTime = 0;
let sheet = document.styleSheets[0];
console.log(sheet);
//sheet.addRule(`waterfall__segment--1`, `height: 50px;`, 1);
//sheet.insertRule(`.waterfall__segment--1 {height: 50px;}`, 1);

response.forEach((item) => {
    totalTime += item.time;
});

class Segment {
    constructor(length, margin = 0) {
        this._length = length;
        this._margin = margin;
    }

    get length() {
        return this._length;
    }

    get margin() {
        return this._margin;
    }

    set length(value) {
        this._length = value;
    }

    set margin(value) {
        this._margin = value;
    }
}

let segarray = [];
let marginTotal = 0;

// use time to create data visualization
response.forEach((item, index) => {
    let len = 100 * (item.time/(totalTime));
   segarray[index] = new Segment();
   segarray[index].length = len;
   segarray[index].margin = marginTotal;
   marginTotal = segarray[index].margin + len;
   const segment = document.createElement('div');
   segment.classList.add(`waterfall__segment--${index + 1}`);
   sheet.insertRule(`.waterfall__segment--${index + 1} {
       height: 50px; 
       width: ${len}vw;
       margin-left: ${segarray[index].margin}vw;
    }`, index+1);
   document.querySelector('.waterfall').appendChild(segment);
});