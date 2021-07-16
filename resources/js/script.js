console.log(`/*++++++++++++++++++++++++++++++++++++++++*/
/*++++++++++ CODING CHALLENGE 1 ++++++++++*/
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
/*++++++++++ CODING CHALLENGE 2 ++++++++++*/
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
/*++++++++++ CODING CHALLENGE 3 ++++++++++*/
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