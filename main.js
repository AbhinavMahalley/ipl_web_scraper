

let request = require("request");
let cheerio=require("cheerio");
let allMatchObj=require("./allMatch")

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
    console.log("````````````````````````````````````````");
    allMatchObj.getAllmatch(fullAllmatchPageLink);
    
}



    console.log("after");