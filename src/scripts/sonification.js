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

export { play };