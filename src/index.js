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

// use time to create data visualization

console.log(response);

