let request = require("request");
let cheerio=require("cheerio");

let scoreCardObj=require("./scorecard");



function allMatchPageCb(url) {
   request(url,function(error, response, html) {

    if(error){
        console.log(error);
    }if(response.statusCode==404){
        console.log("Page not found");
    }
    else{
        getAllScoreCardLink(html);
    }
})
    }

    function getAllScoreCardLink(html){

        let searchTool=cheerio.load(html);
        let scorecardArr=searchTool('a[data-hover="Scorecard"]');
        for(let i=0;i<scorecardArr.length;i++){
            let link=searchTool(scorecardArr[i]).attr("href");
          
            let fullAllScoreCardLink =`https://www.espncricinfo.com${link}`;
        console.log(fullAllScoreCardLink);
            scoreCardObj.process(fullAllScoreCardLink);
            
        }
        console.log("````````````````````````````````````````");
    
        
    }

    module.exports={
        getAllmatch:allMatchPageCb
    }