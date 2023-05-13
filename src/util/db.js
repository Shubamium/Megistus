export default function saveData(gameResult){
    
    const route = "https://megistusleaderboard-47e0.restdb.io/rest";
    const key = "645f5ee00b60fc42f4e19579";

    const urlRes = new URL(route + "/leaderboard");
    urlRes.searchParams.append('apikey',key);

    const result = fetch(urlRes,{
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(gameResult)
    })
    result.then((data)=>{
        console.log(data);
    });

}