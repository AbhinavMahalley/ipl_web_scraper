

let request = require("request");
let cheerio=require("cheerio");
let scoreCardObj=require("./scorecard")

let url='https://www.espncricinfo.com/series/ipl-2020-21-1210595';
console.log("before");

request(url,cb);
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

    function dataExtracter(html){
        // search tool
    let searchTool=cheerio.load(html);
    // css selector
    let anchorrep=searchTool('a[data-hover="View All Results"]');
    let link=anchorrep.attr("href");
    let fullAllmatchPageLink =`https://www.espncricinfo.com${link}`;
    console.log(fullAllmatchPageLink);
    request(fullAllmatchPageLink,allMatchPageCb);

    }
function allMatchPageCb(error, response, html) {
    
    if(error){
        console.log(error);
    }if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        getAllScoreCardLink(html);
    }

    }

    function getAllScoreCardLink(html){

        let searchTool=cheerio.load(html);
        let scorecardArr=searchTool('a[data-hover="Scorecard"]');
        for(let i=0;i<scorecardArr.length;i++){
            let link=searchTool(scorecardArr[i]).attr("href");
          
            let fullAllScoreCardLink =`https://www.espncricinfo.com${link}`;
        console.log(fullAllScoreCardLink);
            scoreCardObj.pro(fullAllScoreCardLink);
            
        }
        console.log("````````````````````````````````````````");
    // let anchorrep=searchTool('.match-info-link-FIXTURES');
    // console.log(anchorrep.length);
    // for(let i=0;i<anchorrep.length;i++){
    //     let link=searchTool(anchorrep[i]).attr("href");
    //     let fullAllScoreCardLink =`https://www.espncricinfo.com${link}`;
    //     console.log(fullAllScoreCardLink);
    //     }
        
    }


    console.log("after");