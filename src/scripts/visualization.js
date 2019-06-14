import { totalTime } from './index';

let sheet = document.styleSheets[0];
let segarray = [];
let marginTotal = 0;

class Segment {
    constructor(length, margin = 0) {
        this._length = length;
        this._margin = margin;
    }

    get length() {
        return this._length;
    }

    set length(value) {
        this._length = value;
    }

    get margin() {
        return this._margin;
    }

    set margin(value) {
        this._margin = value;
    }
}

const create = (item, index) => {
    let width = 100 * (item.time/totalTime);
    segarray[index] = new Segment(width, marginTotal);
    marginTotal = segarray[index].margin + width;
}

const visualize = (index) => {
    const segment = document.createElement('div');
    segment.classList.add(`waterfall__segment--${index + 1}`);
    sheet.insertRule(`.waterfall__segment--${index + 1} {
        height: 50px; 
        width: ${segarray[index].length}vw;
        margin-left: ${segarray[index].margin}vw;
     }`, index+1);
    document.querySelector('.waterfall').appendChild(segment);
}

export { create, visualize };

