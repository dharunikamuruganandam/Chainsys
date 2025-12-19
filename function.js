//basic function
/*function greet(name){
  console.log("Name :"+name);
}
greet("Dharu");*/
//Write a function add(a, b) that returns the sum of two numbers. Then call it with 5 and 7.
/*function add(a,b){
  console.log(a+b);
}
add(5,7);*/
//Use a while loop to print numbers from 1 to 5.
/*function whille(n){
  var n=1;
  while(n<=5){
    console.log(n);
    n=n+1;
  }
}
whille();*/
//Use a do...while loop to print numbers from 5 down to 1.
/*function numm(n){
  var n=5;
  do{
    console.log(n);
    n=n-1;
  }while(n>0)
}
numm();*/
//Use for...in to print all keys and their values.
/*const obj={name :"Dharu",age:"20",city:"Theni"};
function forin(obj){
  for(let key in obj){
    console.log(obj[key]);
  }
}
forin(obj);*/
//Use for...of to print each color.
/*const color=["Blue","Green","Yellow"];
function forof(arr){
  for(let value of color){
    console.log(value);
  }
}
forof();*/
//Write a function processNumber(num, callback) that prints the number and then calls the callback to print "Done".
/*function processNumber(num,callback){
  console.log(num);
  callback();
}
function done(){
  console.log("Done");
}
processNumber(5,done);*/
//calculator with callback function
/*function calc(a,b,callback){
  return callback(a,b);
}
function add(a,b){
  return a+b;
}
function sub(a,b){
  return a-b;
}
function operation(){

}
console.log(calc(2,1,add));
console.log(calc(8,4,sub));*/
