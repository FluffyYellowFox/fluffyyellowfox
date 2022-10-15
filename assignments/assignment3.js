let gcdCalc = () => {   
  let x = parseFloat(document.getElementById("numberOne").value);
  let y = parseFloat(document.getElementById("numberTwo").value);
  x = Math.abs(x);
  y = Math.abs(y);
  while(y) {
    var t = y;
    y = x % y;
    x = t;
  }
  document.getElementById("gcdFinal").value = (x);
/*
  takes the two entered numbers, turns them into numbers, converts them to positive numbers, and loops by using modulo to find any common denominators until the largest is found, making y zero after using modulu, and ending the loop.
*/
}

let sumCalc = () => {
  n = parseInt(document.getElementById("sumNum").value); 
  var sum = 0;
    while (n != 0) {
        sum = sum + n % 10;
        n = parseInt(n / 10);
    }
    document.getElementById("sumFinal").value = sum;
/*
  takes entered number, divides number by ten and adds it to sum until there all digits were added together.
*/
}