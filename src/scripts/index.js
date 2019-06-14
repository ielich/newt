import { play } from './sonification';
import { create, visualize } from './visualization';

const response = JSON.parse(localStorage.getItem('responseData'));
let totalTime = 0;

response.forEach((item, index) => {
    totalTime += response[index].time;
})

response.forEach((item, index) => {
    if(index === 0 ) {
        play(item);
        create(item, index);
        visualize(index);
    } else {
        setTimeout(() => {
            play(item);
            create(item, index);
            visualize(index);
        }, response[index-1].time);
    }
});

export { totalTime };