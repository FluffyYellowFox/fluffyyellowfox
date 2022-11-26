//Arrays
var Arr1 = [(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100),(Math.floor(Math.random()*1000)+100)];
var Arr2 = [(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200),(Math.floor(Math.random()*400)-200)];
var Arr3 = [
  {fname: "John", lname: "Adams", title: "President", suffix: "elect", age: 225},
  {fname: "Joseph", lname: "Johnson", title: "President", suffix: "elect", age: 117},
  {fname: "Joe", lname: "James", title: "President", suffix: "elect", age: 186},
  {fname: "Bob", lname: "Jones", title: "President", suffix: "elect", age: 214},
  {fname: "Sam", lname: "Adams", title: "President", suffix: "elect", age: 197}
  ];
let Arr4 = [-100, 0, 100, 1900, 1904, 2000];
let Arr5 = [1, 4, 5, 7];
let Arr6 = [2, 4, 6, 8, 10];

//Arrow functions
let pyth = (a,b) => a*a+b*b;
let quadratic = (a,b,c) => {
  let root1 = (-b-Math.sqrt((b*b) - (4*a*c)))/(2*a)
  let root2 = (-b+Math.sqrt((b*b) - (4*a*c)))/(2*a)
  return [root1, root2]
}
let sphrad = (r) => (4/3)*(Math.PI)*r*r*r;
let ftok = (f) => ((f-32)*(5/9))+273.15;
let arctan = (x,y) => Math.atan(x/y);
let sumandsqr = (n) => n+n*n;
let isleapyear = (n) => {if ((n%4)==0){return true;} else {return false;}}
let timefallen = (d) => Math.sqrt((2*d)/9.807)

//Map, Filter, Reduce
let allLeapYears = Arr4.reduce((accumulator, years) => accumulator + years, 0);
let fullNames = Arr3.map(e => e.fname+" "+e.lname);
let dot = Arr1.map((e, i) => Arr1[i] * Arr2[i]).reduce((accumulator, n) => accumulator + n);
let sumEven = Arr2.filter(e => e%2==0).reduce((accumulator, n) => accumulator + n);
let fourVol = Arr5.map(e => sphrad(e));
let fallTimes = Arr6.map(e => timefallen(e));
let arcsum = Arr5.map(e => arctan(Math.PI,e)).reduce((accumulator, n) => accumulator + n);

//Part 2
let ctr = 0;
function loadData() {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      covidData = this.responseText
      covidData = JSON.parse(covidData);
      document.getElementById("text").value = covidData.Countries[ctr].ID;
      document.getElementById("text1").value = covidData.Countries[ctr].Country;
      document.getElementById("text2").value = covidData.Countries[ctr].CountryCode;
      document.getElementById("text3").value = covidData.Countries[ctr].Slug;
      document.getElementById("text4").value = covidData.Countries[ctr].NewConfirmed;
      document.getElementById("text5").value = covidData.Countries[ctr].TotalConfirmed;
      document.getElementById("text6").value = covidData.Countries[ctr].NewDeaths;
      document.getElementById("text7").value = covidData.Countries[ctr].TotalDeaths;
      document.getElementById("text8").value = covidData.Countries[ctr].NewRecovered;
      document.getElementById("text9").value = covidData.Countries[ctr].TotalRecovered;
      document.getElementById("text10").value = covidData.Countries[ctr].Date;
    }
  };
  let url = "https://api.covid19api.com/summary";
  xhttp.open("GET", url, true);
  xhttp.send();
}

function previous (x) {
  if (x > 0) {
    ctr -=1;
      document.getElementById("text").value = covidData.Countries[x].ID;
      document.getElementById("text1").value = covidData.Countries[x].Country;
      document.getElementById("text2").value = covidData.Countries[x].CountryCode;
      document.getElementById("text3").value = covidData.Countries[x].Slug;
      document.getElementById("text4").value = covidData.Countries[x].NewConfirmed;
      document.getElementById("text5").value = covidData.Countries[x].TotalConfirmed;
      document.getElementById("text6").value = covidData.Countries[x].NewDeaths;
      document.getElementById("text7").value = covidData.Countries[x].TotalDeaths;
      document.getElementById("text8").value = covidData.Countries[x].NewRecovered;
      document.getElementById("text9").value = covidData.Countries[x].TotalRecovered;
      document.getElementById("text10").value = covidData.Countries[x].Date;
  }
  
}
function next (x) {
  ctr +=1;
  document.getElementById("text").value = covidData.Countries[x].ID;
  document.getElementById("text1").value = covidData.Countries[x].Country;
  document.getElementById("text2").value = covidData.Countries[x].CountryCode;
  document.getElementById("text3").value = covidData.Countries[x].Slug;
  document.getElementById("text4").value = covidData.Countries[x].NewConfirmed;
  document.getElementById("text5").value = covidData.Countries[x].TotalConfirmed;
  document.getElementById("text6").value = covidData.Countries[x].NewDeaths;
  document.getElementById("text7").value = covidData.Countries[x].TotalDeaths;
  document.getElementById("text8").value = covidData.Countries[x].NewRecovered;
  document.getElementById("text9").value = covidData.Countries[x].TotalRecovered;
  document.getElementById("text10").value = covidData.Countries[x].Date;
}
