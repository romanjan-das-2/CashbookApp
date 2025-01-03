const dataArray = [
    [45629,-5000],
    [45630,1800],
    [45631,1000],
    [45632,1430],
    [45633,13000],
    [45634,1600],
    [45636,5600],
    [45637,5600],
    [45639,5200],
    [45640,7000],
    [45641,2200],
    [45642,3000],
    [45643,7800],
    [45643,-7700],
    [45645,1500],
    [45646,4400],
    [45650,13130],
    [45651,6500],
    [45651,24906],
    [45652,1000],
    [45653,2000],
    [45653,-32370],
    [45653,-45300],
    [45654,10300]    
];
//const initialBalance = 10653292.34; // on 31 march 2024
//const initialBalance = 7539962.73; // on 31 july 2024
//const initialBalance = 4774277.73; // on 30 september 2024
const initialBalance = 3027154.41; // on 30 november 2024
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