const levelBase = [
    {
        pairCount: 3,
        difficulty: 0,
        mode:'casual',
        levelType:'campaign',
        duration:0
    }, {
        pairCount: 7,
        difficulty: 1,
        mode:'casual',
        levelType:'campaign',
        duration:0
    },{
        pairCount: 12,
        difficulty: 2,
        mode:"attack",
        levelType:'campaign',
        duration:120
    },{
        pairCount:26,
        difficulty: 3,
        mode:"attack",
        levelType:'campaign',
        duration:180
    },{
        pairCount: 35,
        difficulty: 4,
        mode:"attack",
        levelType:'campaign',
        duration:300
    },{
        pairCount: 48,
        difficulty: 4,
        mode:"attack",
        levelType:'campaign - EX',
        duration:600
    },
    {
        pairCount: 50,
        difficulty: 4,
        mode:"timed",
        levelType:"campaign - ZEN",
        duration:600
    }

];


export function getBaseGameStartData(level,cardStyle){
    return {...levelBase[level],cardStyle}
}