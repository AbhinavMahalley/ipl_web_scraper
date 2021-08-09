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
    let bothIningArr=searchTool(".Collapsible");

    for(let i=0;i<bothIningArr.length;i++){

        let teamNameElem=searchTool(bothIningArr[i]).find("h5");
        let teamName=teamNameElem.text();

        teamName=teamName.split("INNINGS")[0];
        teamName=teamName.trim();
        console.log(" \t",teamName);

        let batsManTableBodyAllRows=searchTool(bothIningArr[i]).find(".table.batsman tbody tr");
        for(let j=0;j<batsManTableBodyAllRows.length;j++){
            let numberofTds=searchTool(batsManTableBodyAllRows[j]).find("td");
            // console.log(numberofTds);
            if(numberofTds.length==8){
                //valid
                let playerName=searchTool(numberofTds[0]).text();
                console.log(playerName);
            }
        }
        console.log("```````````````````````````````````````");
    }
    

    }

    module.exports={
        pro:processSinglematch
    }