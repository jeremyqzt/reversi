class timerHelper{
    static convertSecondMin(second){
        if (second < 0){
            second = 0;
        }

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

export default timerHelper; 