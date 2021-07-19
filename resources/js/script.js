'use strict';
//will let us know about errors

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 2: CODING CHALLENGE 1 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

//TEST DATA 1
//mark info
const markMass1 = 78;
const markHeight1 = 1.69;

//john info
const johnMass1 = 92;
const johnHeight1 = 1.95;

//TEST DATA 2
//mark info
const markMass2 = 95;
const markHeight2 = 1.88;

//john info
const johnMass2 = 85;
const johnHeight2 = 1.76;

//BMI CALCULATION
const markBMI1 = markMass1 / markHeight1 ** 2;
const johnBMI1 = johnMass1 / johnHeight1 ** 2;
const markHigherBMI1 = markBMI1 > johnBMI1;
console.log("Mark's BMI using test data 1:\n"+markBMI1);
console.log("John's BMI using test data 1:\n"+johnBMI1);
console.log("Does Mark have a higher BMI than John?\n"+markHigherBMI1);

const markBMI2 = markMass2 / markHeight2 ** 2;
const johnBMI2 = johnMass2 / johnHeight2 ** 2;
const markHigherBMI2 = markBMI2 > johnBMI2;
//applied appending of variables learned during Lesson 17
console.log(`Mark's BMI using test data 2:
${markBMI2}`);
console.log(`John's BMI using test data 2:
${johnBMI2}`);
console.log(`Does Mark have a higher BMI than John?
${markHigherBMI2}`);

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 2: CODING CHALLENGE 2 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

if (markHigherBMI1 == true) {
    console.log(`Mark's BMI is higher than John's!
    This is Mark's BMI: ${markBMI1}
    This is John's BMI: ${johnBMI1}`);
} else {
    console.log(`Mark's BMI is lower than John's.
    This is Mark's BMI: ${markBMI2}
    This is John's BMI: ${johnBMI2}`);
}

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 2: CODING CHALLENGE 3 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

// calculating average score
let dolphinsScore = (96+108+89)/3;
let koalasScore = (88+91+110)/3;

if (dolphinsScore>koalasScore) {
    console.log(`Congratulations to Dolphines for winning!
    They have won with an average score of ${dolphinsScore},
    beating Koalas who have ${koalasScore}!`);
} else if (dolphinsScore<koalasScore) {
    console.log(`Congratulations to Koalas for winning!
    They have won with an average score of ${koalasScore},
    beating Dolphines who have ${dolphinsScore}!`);
} else {
    console.log(`There is a tie! Both teams have gotten an average score of ${dolphinsScore}!`);
}

console.log(`
/*+++++++++++ BONUS 1 ++++++++++++++++++++++*/
 `);

// updating scores using test data of BONUS 1
dolphinsScore = (97+112+101)/3;
koalasScore = (109+95+129)/3;

if ((dolphinsScore>koalasScore) && (dolphinsScore >= 100)) {
    console.log(`Congratulations to Dolphines for winning!
    They have won with an average score of ${dolphinsScore},
    beating Koalas who have ${koalasScore}!`);
} else if ((dolphinsScore<koalasScore) && (koalasScore >= 100)) {
    console.log(`Congratulations to Koalas for winning!
    They have won with an average score of ${koalasScore},
    beating Dolphines who have ${dolphinsScore}!`);
} else if ((dolphinsScore===koalasScore) && (dolphinsScore >= 100)) {
    console.log(`There is a tie! Both teams have gotten an average score of ${dolphinsScore}!`);
} else {
    console.log(`Unfortunately for everyone, neither of the teams have achieved minimum score to advance through the finals.
    Dolphins: ${dolphinsScore}
    Koalas: ${koalasScore}`);
}

console.log(`
/*+++++++++++ BONUS 2 ++++++++++++++++++++++*/
 `);
// updating scores using test data of BONUS 2
dolphinsScore = (97+112+101)/3;
koalasScore = (109+95+106)/3;

if ((dolphinsScore>koalasScore) && (dolphinsScore >= 100)) {
    console.log(`Congratulations to Dolphines for winning!
    They have won with an average score of ${dolphinsScore},
    beating Koalas who have ${koalasScore}!`);
} else if ((dolphinsScore<koalasScore) && (koalasScore >= 100)) {
    console.log(`Congratulations to Koalas for winning!
    They have won with an average score of ${koalasScore},
    beating Dolphines who have ${dolphinsScore}!`);
} else if ((dolphinsScore===koalasScore) && (dolphinsScore >= 100)) {
    console.log(`There is a tie! Both teams have gotten an average score of ${dolphinsScore}!`);
} else {
    console.log(`Unfortunately for everyone, neither of the teams have achieved minimum score to advance through the finals.
    Dolphins: ${dolphinsScore}
    Koalas: ${koalasScore}`);
}

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 2: CODING CHALLENGE 4 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

//test data 1
let bill = 275;
let tip = (bill>=50) && (bill<=300) ? bill*0.15 : bill*0.2;
console.log(`The bill is ${bill}, which means the tip should be ${tip}.
The total value is ${tip+bill}`);

//test data 2
bill = 40;
tip = (bill>=50) && (bill<=300) ? bill*0.15 : bill*0.2;
console.log(`The bill is ${bill}, which means the tip should be ${tip}.
The total value is ${tip+bill}`);

//test data 3
bill = 430;
tip = (bill>=50) && (bill<=300) ? bill*0.15 : bill*0.2;
console.log(`The bill is ${bill}, which means the tip should be ${tip}.
The total value is ${tip+bill}`);

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 3: CODING CHALLENGE 1 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

const aveScore = (score1,score2,score3) => {
    return (score1+score2+score3)/3;
} 

const dolphinsAverage = aveScore(44,23,71);
const koalasAverage = aveScore(65,54,49);

function checkWinner (aveScore1,aveScore2) {
    if (aveScore1 >= (aveScore2*2)) {
        return `Dolphins win (${aveScore1} - ${aveScore2})`;
    }
    else if (aveScore2 >= (aveScore1*2)) {
        return `Koalas win (${aveScore1} - ${aveScore2})`;
    }
    else if (aveScore1 === aveScore2) {
        return `It's a tie (${aveScore1} - ${aveScore2})`;
    }
    else {
        return `There is no victor (${aveScore1} - ${aveScore2})`;
    }
}

console.log(checkWinner(dolphinsAverage,koalasAverage));

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 3: CODING CHALLENGE 2 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);

function calcTip(billAmount){
    if ((billAmount>=50) && (billAmount<=300)) {
        return billAmount*0.15;
    } else {
        return billAmount*0.2;
    }
}

//test data
const bills = [125,555,44];
const tips = [calcTip(bills[0]),calcTip(bills[1]),calcTip(bills[2])];
let total;
var i;

for(i=0;i<bills.length;i++){
    total = bills[i]+tips[i];
    console.log(`Bill: ${bills[i]}
    Tip: ${tips[i]}
    Total Amount: ${total}`);
}

console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/* Section 3: CODING CHALLENGE 3 +++++++++*/
/*++++++++++++++++++++++++++++++++++++++++*/`);