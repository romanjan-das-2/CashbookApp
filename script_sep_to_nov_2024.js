const dataArray = [
    [45567,100],
    [45572,-28840],
    [45573,1530],
    [45574,2000],
    [45580,2200],
    [45581,-150200],
    [45581,-155000],
    [45581,-25518],
    [45581,382400],
    [45583,-302400],
    [45583,-146000],
    [45583,40000],
    [45586,-254353],
    [45586,-384918],
    [45587,100],
    [45587,-28.42],
    [45588,-58000],
    [45588,-22000],
    [45589,-11.8],
    [45590,2000],
    [45591,1200],
    [45594,-31046],
    [45594,-28228],
    [45594,-110413],
    [45595,-4350],
    [45595,1200],
    [45601,236206],
    [45602,600],
    [45608,-12400],
    [45608,-236206],
    [45608,500],
    [45609,-23.5],
    [45610,-50000],
    [45610,-252423.6],
    [45616,1200],
    [45617,1200],
    [45618,600],
    [45619,2500],
    [45626,-31046],
    [45626,-139254]
];
//const initialBalance = 10653292.34; // on 31 march 2024
//const initialBalance = 7539962.73; // on 31 july 2024
const initialBalance = 4774277.73; // on 30 september 2024
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