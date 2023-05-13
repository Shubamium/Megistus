const route = "https://megistusleaderboard-47e0.restdb.io/rest";
const key = "645f5ee00b60fc42f4e19579";

function getApiRoute() {
    const urlRes = new URL(route + "/leaderboard");
    urlRes.searchParams.append('apikey', key);
    return urlRes;
}

export function saveData(gameResult){
    const urlRes = getApiRoute();
    const result = fetch(urlRes,{
        method:'POST', 
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(gameResult)
    })
    // result.then((data)=>{
    //     console.log(data);
    // });

}

export async function loadData(skip){

    const urlRes = getApiRoute();
    urlRes.searchParams.append('max',5);
    urlRes.searchParams.append('sort','_created');
    urlRes.searchParams.append('dir','-1');
    // if(skip){
        urlRes.searchParams.append('skip',skip);
    // }
    const result = await fetch(urlRes);
    const data = await result.json();
    console.log(result.data);
    
    return data;
}