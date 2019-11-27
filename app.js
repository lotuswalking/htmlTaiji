
var n0 = [];
var n1 = [];
var n2 = [];
var n3 = [];
var n4 = [];
for(i=1;i<=30;i++)
{
  var bintext=Dec2Bin(i,5);
  console.log('text: ',i,bintext);    
  if(bintext[0]===1) n0.push(i);  
  if(bintext[1]===1) n1.push(i);
  if(bintext[2]===1) n2.push(i);
  if(bintext[3]===1) n3.push(i);
  if(bintext[4]===1) n4.push(i);

}
document.getElementById('n0').innerText="Zone1: "+n0;
document.getElementById('n1').innerText="Zone2: "+n1;
document.getElementById('n2').innerText="Zone3: "+n2;
document.getElementById('n3').innerText="Zone4: "+n3;
document.getElementById('n4').innerText="Zone5: "+n4;
  console.log('arrary0:',n0);
  console.log('arrary1:',n1);
  console.log('arrary2:',n2);
  console.log('arrary3:',n3);
  console.log('arrary4:',n4);
// console.log("text: ",Dec2Bin(4,5))
function handleClick(cb) {
    // alert("Clicked, new value = " + cb.id);
    var result=0;
    if(document.getElementById('ck1').checked) result+=1;
    if(document.getElementById('ck2').checked) result+=2;
    if(document.getElementById('ck3').checked) result+=4;
    if(document.getElementById('ck4').checked) result+=8;
    if(document.getElementById('ck5').checked) result+=16;
    document.getElementById('result').innerText = result;

  }
function Dec2Bin(number,bits)
{
    var num=number;
    var resArry = [];
    for (; num > 0;) {
        resArry.push(num % 2);
        num = parseInt(num / 2);
        
    }
    while(resArry.length< bits)   {       
            resArry.push(0);
    }
    // console.log(resArry.length);
    return resArry;
}