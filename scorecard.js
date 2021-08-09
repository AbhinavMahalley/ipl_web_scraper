let request = require("request");
let cheerio=require("cheerio");
let fs=require("fs");

// let url='https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard';

function processSinglematch(url){

    request(url,cb);
}
function cb(error, response, html) {
    
    if(error){
        console.log(error);
    }if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        dataExtracter(html);
    }

    };

    // .name-link

    function dataExtracter(html){
        // search tool
    let searchTool=cheerio.load(html);
    // css selector
    
        let  descElem=searchTool(".event .description");
        let result =searchTool(".event .status-text");
        let stringArr=descElem.text().split(",");
        let venue=stringArr[1].trim();
        let date=stringArr[2].trim();
        result =result.text();

        // console.log(venue+" "+date);
        // console.log(result);

        let bothIningArr=searchTool(".Collapsible");

    for(let i=0;i<bothIningArr.length;i++){

        let teamNameElem=searchTool(bothIningArr[i]).find("h5");
        let teamName=teamNameElem.text();

        teamName=teamName.split("INNINGS")[0];
        teamName=teamName.trim();
        // console.log(" \t",teamName);

        let opponetIndex=i==0?1:0;
        let opponentName=searchTool(bothIningArr[opponetIndex]).find("h5").text();
        opponentName=opponentName.split("INNINGS")[0].trim();
        

        console.log(`${venue} ${date} ||  ${teamName}  vs  ${opponentName} || ${result}`)


        let batsManTableBodyAllRows=searchTool(bothIningArr[i]).find(".table.batsman tbody tr");
        for(let j=0;j<batsManTableBodyAllRows.length;j++){
            let allCols=searchTool(batsManTableBodyAllRows[j]).find("td");
            let isWorthy=searchTool(allCols[0]).hasClass("batsman-cell");
            // console.log(isWorthy);
            if(isWorthy==true){
                //valid
                let playerName=searchTool(allCols[0]).text().trim();
                let runs=searchTool(allCols[2]).text().trim();
                let balls=searchTool(allCols[3]).text().trim();
                let fours=searchTool(allCols[5]).text().trim();
                let sixes=searchTool(allCols[6]).text().trim();
                let sr=searchTool(allCols[7]).text().trim();
                console.log(`${playerName}  ${runs} ${balls} ${fours} ${sixes} ${sr}`);
            }
        }
        console.log("```````````````````````````````````````");
    }
    

    console.log("/////////////////////////////////////////////////////");

    }



    module.exports={
        process:processSinglematch
    }