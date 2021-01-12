const ar1 = [43, 23, 13, 49];

let myFunc = a => {
    console.log(`The number is: ${a}`);
}

const ar2 = [...ar1, 35, 36, 37];

myFunc(ar2[1]);
alert("i am here");