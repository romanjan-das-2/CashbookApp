const dataArray = [
    [45505,-255000],
    [45505,-42500],
    [45505,230],
    [45506,-25500],
    [45506,-5000],
    [45506,-19500],
    [45506,-64500],
    [45506,-122294],
    [45507,-11.8],
    [45507,1480],
    [45510,-5002.36],
    [45510,-33815],
    [45510,-49747],
    [45510,-172362],
    [45510,3200],
    [45511,460],
    [45513,1360],
    [45514,630],
    [45516,-1000000],
    [45517,660],
    [45518,800],
    [45519,1800],
    [45520,-62315],
    [45520,-57170],
    [45521,-5000],
    [45521,-2.36],
    [45521,-151.04],
    [45523,-20310],
    [45523,-21225],
    [45523,-80.24],
    [45523,1800],
    [45523,335],
    [45523,2335],
    [45523,8255],
    [45524,230],
    [45524,4080],
    [45525,-2500],
    [45525,-14280],
    [45525,230],
    [45526,460],
    [45527,2800],
    [45527,7740],
    [45528,2000],
    [45532,-172362],
    [45533,-73700],
    [45533,600],
    [45535,-137250],
    [45535,-31046],
    [45535,560],
    [45536,800],
    [45538,-29875],
    [45539,230],
    [45540,-114908],
    [45540,-35510],
    [45540,270],
    [45540,180],
    [45540,80],
    [45541,-136.88],
    [45541,690],
    [45542,2230],
    [45542,7900],
    [45544,-36285],
    [45544,-1115],
    [45544,1600],
    [45544,110],
    [45544,9200],
    [45545,-87.32],
    [45545,55],
    [45545,1030],
    [45546,-13415],
    [45546,1950],
    [45546,375],
    [45547,230],
    [45551,-75000],
    [45552,460],
    [45555,-10300],
    [45556,400],
    [45557,230],
    [45559,800],
    [45560,1360],
    [45560,48060],
    [45561,2230],
    [45562,-14550],
    [45563,630],
    [45565,-31046],
    [45565,-28228],
    [45565,-105750]
];
//const initialBalance = 10653292.34; // on 31 march 2024
const initialBalance = 7539962.73; // on 31 july 2024
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