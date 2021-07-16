/*     assignment 1: values and variables     */

let country = "Philippines";
let continent = "Asia";
let population = 7000000;

console.log(country);
console.log(continent);
console.log(population);

/*     assignment 2: data types     */

let isIsland = true;
let language;
console.log(country+" is an island: "+isIsland);
console.log("The people from "+country+" speak the language "+language);

/*     assignment 3: basic operators     */

const populationHalf = population/2;

console.log("If "+country+" was split in half, and each half would contain half the population, then how many people would live in each half?");
console.log(populationHalf);

//increasing population by 1
population+=1;
console.log(population);

const finlandPop = 6000000;
let isPopulationMore = population>finlandPop;
console.log("Finland has a population of "+finlandPop+". Does your country have more people than Finland? "+isPopulationMore);

/*     CODING CHALLENGE 1     */

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
const markBMI1 = markMass1 / markHeight1;
const johnBMI1 = johnMass1 / johnHeight1;
const markHigherBMI1 = markBMI1 > johnBMI1;
console.log("Mark's BMI using test data 1:\n"+markBMI1);
console.log("John's BMI using test data 1:\n"+johnBMI1);
console.log("Does Mark have a higher BMI than John?\n"+markHigherBMI1);

const markBMI2 = markMass2 / markHeight2;
const johnBMI2 = johnMass2 / johnHeight2;
const markHigherBMI2 = markBMI2 > johnBMI2;
console.log("Mark's BMI using test data 2:\n" + markBMI2);
console.log("John's BMI using test data 2:\n" + johnBMI2);
console.log("Does Mark have a higher BMI than John?\n"+markHigherBMI2);
