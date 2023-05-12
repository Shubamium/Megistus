const levelBase = [
    {
        pairCount: 3,
        difficulty: 0,
        mode:0,
        duration:0
    }, {
        pairCount: 7,
        difficulty: 1,
        mode:0,
        duration:0
    },{
        pairCount: 12,
        difficulty: 2,
        mode:"attack",
        duration:120
    },{
        pairCount:26,
        difficulty: 3,
        mode:"attack",
        duration:180
    },{
        pairCount: 35,
        difficulty: 4,
        mode:"attack",
        duration:300
    },{
        pairCount: 48,
        difficulty: 4,
        mode:"attack",
        duration:600
    },
    {
        pairCount: 50,
        difficulty: 4,
        mode:"timed",
        duration:600
    }

];


export function getBaseGameStartData(level,cardStyle){
    return {...levelBase[level],cardStyle}
}