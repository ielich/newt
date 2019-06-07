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
   segarray[index] = new Segment();
   segarray[index].margin = marginTotal;
   console.log(marginTotal);
   let len = 100 * (item.time/(totalTime));
   marginTotal = segarray[index].margin + len;
   segarray[index].length = len;
   const segment = document.createElement('div');
   segment.classList.add(`waterfall__segment--${index + 1}`);
   sheet.insertRule(`.waterfall__segment--${index + 1} {
       height: 50px; 
       width: ${len}vw;
       margin-left: ${segarray[index].margin}vw;
    }`, index+1);
   document.querySelector('.waterfall').appendChild(segment);
});