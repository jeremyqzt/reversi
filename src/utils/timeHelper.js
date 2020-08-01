class timerHerlpe{
    static convertSecondMin(second){
        const secInMin = 60;
        let min = Math.floor(second/secInMin);
        let sec = Math.round(second % secInMin);
        return {
            min: min,
            sec: sec,
        }
    }

    static convertMinToSeconds(min){
        return min.min*60 + min.sec;
    }
}