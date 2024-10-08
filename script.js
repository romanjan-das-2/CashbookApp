const dataArray = [
    [45384,175],
    [45384,-6240],
    [45384,-48910],
    [45385,1620],
    [45385,-3000],
    [45386,2050],
    [45386,730],
    [45386,515],
    [45386,305],
    [45386,265],
    [45386,230],
    [45386,130],
    [45386,15],
    [45387,1800],
    [45387,1129],
    [45387,-5000],
    [45388,-184650],
    [45389,810],
    [45391,760],
    [45393,460],
    [45394,109502],
    [45398,-20000],
    [45399,460],
    [45400,-12806],
    [45401,140432],
    [45402,800],
    [45404,-9623],
    [45404,-21000],
    [45404,-25500],
    [45404,-63000],
    [45404,-121976],
    [45405,2230],
    [45405,-14.16],
    [45408,100],
    [45412,-31046],
    [45412,-146890],
    [45414,3405],
    [45414,3000],
    [45414,845],
    [45416,900],
    [45419,1000],
    [45421,-26000],
    [45422,430],
    [45423,230],
    [45426,1840],
    [45426,-600],
    [45426,-2134],
    [45426,-15000],
    [45427,2540],
    [45428,2080],
    [45429,1600],
    [45430,3380],
    [45432,690],
    [45433,460],
    [45434,460],
    [45434,-5000],
    [45435,1030],
    [45436,2110000],
    [45436,1610],
    [45438,6400],
    [45439,-4420],
    [45440,2860],
    [45442,1820],
    [45442,-23000],
    [45442,-28228],
    [45442,-31046],
    [45442,-81442],
    [45443,330],
    [45444,630],
    [45445,2750],
    [45447,900],
    [45447,-50000],
    [45447,-67700],
    [45448,3800],
    [45448,-66954.72],
    [45448,-254200],
    [45449,1380],
    [45449,-23330],
    [45450,3290],
    [45451,3100],
    [45452,3190],
    [45453,1675],
    [45453,230],
    [45453,-265.5],
    [45453,-29500],
    [45453,-50000],
    [45454,125629],
    [45454,2860],
    [45455,100],
    [45455,-21310],
    [45456,1320],
    [45456,-10000],
    [45456,-11330],
    [45458,760],
    [45459,230],
    [45461,-14.16],
    [45461,-48000],
    [45461,-156652],
    [45461,-158348],
    [45461,-178000],
    [45462,230],
    [45462,-4090],
    [45462,-5500],
    [45463,230],
    [45464,22400],
    [45464,660],
    [45468,74624],
    [45469,230],
    [45470,127500],
    [45470,690],
    [45470,-5000],
    [45470,-21000],
    [45470,-25500],
    [45470,-45405],
    [45470,-63000],
    [45470,-125500],
    [45470,-170000],
    [45471,-29500],
    [45471,-81990],
    [45471,-100000],
    [45472,330],
    [45472,-11.8],
    [45473,230],
    [45474,-28228],
    [45474,-31046],
    [45474,-120100],
    [45475,-120228],
    [45476,-5000],
    [45477,28396],
    [45477,230],
    [45477,-15517],
    [45477,-45981.74],
    [45477,-48343.29],
    [45477,-70000],
    [45478,-82.6],
    [45478,-103271],
    [45478,-116161],
    [45479,19891],
    [45479,405],
    [45479,-27800],
    [45481,181],
    [45481,-576000],
    [45482,860],
    [45482,-5000],
    [45482,-15300],
    [45482,-114908],
    [45483,252400],
    [45483,230],
    [45483,-28396],
    [45484,1610],
    [45484,-28150],
    [45485,2000],
    [45485,-21200],
    [45485,-28150],
    [45486,1190],
    [45488,-15300],
    [45488,-28727],
    [45489,480],
    [45489,-354],
    [45489,-28727],
    [45490,127500],
    [45490,-7.08],
    [45490,-5000],
    [45490,-19500],
    [45490,-19891],
    [45490,-25500],
    [45490,-64500],
    [45490,-122315],
    [45490,-125500],
    [45490,-170000],
    [45491,-11.8],
    [45491,-25.96],
    [45491,-5825],
    [45491,-15300],
    [45491,-28727],
    [45491,-28727],
    [45491,-28727],
    [45491,-36449],
    [45492,1885],
    [45492,-6064.36],
    [45492,-42420],
    [45493,-15300],
    [45493,-15300],
    [45493,-28150],
    [45493,-28150],
    [45493,-28150],
    [45495,18283],
    [45495,1830],
    [45495,200],
    [45495,-2.36],
    [45495,-5000],
    [45495,-40840],
    [45496,530],
    [45497,-4.72],
    [45497,-1502.36],
    [45497,-3278],
    [45497,-12221],
    [45498,200],
    [45498,-922875],
    [45500,2140],
    [45503,2110],
    [45503,-28228],
    [45503,-31046],
    [45503,-104442],
    [45504,-16700]
];
const initialBalance = 10653292.34;
var grandTotal = initialBalance;
var closingBalance = grandTotal;

function startProgram(){
    generateDateValues();
    findUniqueDates();
    arrangeValuesByDates();
    formatDataToCashbook();
    createTable();
}

var dateAndDateValue=[];

// use dateAndDateValue[number-2] to get date for the specific number
// generates upto 21-11-2036
function generateDateValues(){
    const nonLeapYearMonths=[31,28,31,30,31,30,31,31,30,31,30,31];
    const LeapYearMonths=[31,29,31,30,31,30,31,31,30,31,30,31];
    var tempDay=0,tempMonth=1,tempYear=1900;
    var daysInMonth=0;
    var dateFormat="";
    for(i=1;i<50000;i++){
        if(tempYear%4==0 && tempYear%100!=0 || tempYear%400==0){
            console.log("LeapYear:"+tempYear);
            daysInMonth=LeapYearMonths[tempMonth-1];
        }
        else{
            daysInMonth=nonLeapYearMonths[tempMonth-1];
        }
        if(tempDay<daysInMonth){
            tempDay=tempDay+1;
        }
        else{
            tempDay=1;
            if(tempMonth<12){
                tempMonth=tempMonth+1;
            }
            else{
                tempMonth=1;
                tempYear=tempYear+1;
            }
        }
        //dateAndDateValue.push([i,tempDay,tempMonth,tempYear]);
        dateFormat=tempDay+"-"+tempMonth+"-"+tempYear;
        dateAndDateValue.push(dateFormat);
    }
}

var uniqueDates = new Array();

function findUniqueDates(){
    var tempDate;
    var ifdateexists=false;
    for(i=0;i<dataArray.length;i++){
        tempDate=dataArray[i][0];
        if(i==0){
            uniqueDates.push(tempDate);
        }
        else{
            for(j=0;j<uniqueDates.length;j++){
                if(uniqueDates[j]==tempDate){
                    ifdateexists=true;
                }
            }
            if(ifdateexists){
                ifdateexists=false;
            }
            else{
                uniqueDates.push(tempDate);
            }
        }
    }
    console.log(uniqueDates);
}

var valuesByDates = new Array();

function arrangeValuesByDates(){
    var tempDate;
    var tempArray = new Array();
    for(i=0;i<uniqueDates.length;i++){
        tempDate=uniqueDates[i];
        tempArray.push(tempDate);
        for(j=0;j<dataArray.length;j++){
            if(tempDate==dataArray[j][0]){
                tempArray.push(dataArray[j][1]);
            }
        }
        valuesByDates.push(tempArray);
        tempArray=[];
    }
    console.log(valuesByDates);
}

var cashbookArray = new Array();

function formatDataToCashbook(){
    var tempArray = new Array();
    var tempArrayCredit = new Array();
    var tempArrayDebit = new Array();
    var totalCredit=0;
    var totalDebit=0;
    for(i=0;i<valuesByDates.length;i++){
        tempArray.push(valuesByDates[i][0]);
        for(j=1;j<valuesByDates[i].length;j++){
            if(valuesByDates[i][j]>=0){
                tempArrayCredit.push(valuesByDates[i][j]);
                totalCredit=totalCredit+valuesByDates[i][j];
            }
            else{
                tempArrayDebit.push(valuesByDates[i][j]);
                totalDebit=totalDebit+valuesByDates[i][j];
            }
        }
        grandTotal=closingBalance+totalCredit;
        closingBalance=grandTotal+totalDebit;
        closingBalance=parseFloat(closingBalance.toFixed(2));
        tempArray.push(tempArrayCredit);
        tempArray.push(tempArrayDebit);
        tempArray.push(totalCredit);
        tempArray.push(totalDebit);
        tempArray.push(grandTotal);
        tempArray.push(closingBalance);
        cashbookArray.push(tempArray);
        tempArray=[]; tempArrayCredit=[]; tempArrayDebit=[]; totalCredit=0; totalDebit=0;
    }
    console.log(cashbookArray);
}

function createTable(){
    const table_structure=document.getElementById("table_structure");
    var clone_table;
    for(i=0;i<cashbookArray.length;i++){
        clone_table=table_structure.cloneNode(true);
        document.body.appendChild(clone_table);
    }
    table_structure.remove();
    insertDataToTable();
}

function insertDataToTable(){
    for(i=0;i<cashbookArray.length;i++){
        document.getElementsByClassName("dateOfReceipt")[i].innerHTML=dateAndDateValue[cashbookArray[i][0]-2];
        document.getElementsByClassName("dateOfExpenditure")[i].innerHTML=dateAndDateValue[cashbookArray[i][0]-2];
        for(j=0;j<cashbookArray[i][1].length;j++){
            document.getElementsByClassName("amountReceipt")[i].innerHTML=document.getElementsByClassName("amountReceipt")[i].innerHTML+cashbookArray[i][1][j]+"<br>";
        }
        for(k=0;k<cashbookArray[i][2].length;k++){
            document.getElementsByClassName("amountExpenditure")[i].innerHTML=document.getElementsByClassName("amountExpenditure")[i].innerHTML+cashbookArray[i][2][k]+"<br>";
        }
        document.getElementsByClassName("totalReceived")[i].innerHTML=cashbookArray[i][3];
        document.getElementsByClassName("totalExpenditure")[i].innerHTML=cashbookArray[i][4];
        document.getElementsByClassName("grandTotalA")[i].innerHTML=cashbookArray[i][5];
        document.getElementsByClassName("grandTotalB")[i].innerHTML=cashbookArray[i][5];
        document.getElementsByClassName("closingBalance")[i].innerHTML=cashbookArray[i][6];
    }
}