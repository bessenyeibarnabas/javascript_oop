/**
 * const cipoArr = [
    {
        name: 'A cipő',
        size: 36,
        color: "piros",
        price: 12000
    },
    {
        name: 'B cipő',
        size: 38,
        color: "zöld",
        price: 6300
    },
    {
        name: 'C cipő',
        size: 32,
        color: "piros",
        price: 18000
    },
    {
        name: 'D cipő',
        size: 40,
        color: "piros",
        price: 17000
    },
    {
        name: 'E cipő',
        size: 34,
        color: "kék",
        price: 19000
    },
    {
        name: 'F cipő',
        size: 37,
        color: "kék",
        price: 9000
    }
]

//Összegezze a cipők árait!
let ossz = 0
for(let i = 0; i < cipoArr.length; i++){
    ossz+= cipoArr[i].price
}
console.log(ossz)

//Számolja meg a piros cípőket!
let count = 0
for(let i = 0; i < cipoArr.length; i++){
    if(cipoArr[i].color === "piros"){
        count++
    }
}
console.log(count)

//Válogassa ki zöld cipőket!
let val = []
for(let i = 0; i < cipoArr.length; i++){
    if(cipoArr[i].color === "zöld"){
        val.push(cipoArr[i])
    }
}
console.log(val)

//Keresse meg azt a cipőt, aminek a mérete nagyobb 36-nál és a színe kék!
let i = 0
while(i < cipoArr.length && !(cipoArr[i].size > 36) && (cipoArr[i].color === "kék")){
    i++
}
if(i < cipoArr.length){
    console.log(cipoArr[i])
}

//Keresse meg a legkisebb méretű cipőt!
let min = 0
for(let i = 1; i < cipoArr.length; i++){
    if(cipoArr[i].size < cipoArr[min].size){
        min = i
    }
}
console.log(min)

//Rendezze a tömböt ár szerint nővekvő sorrendbe!
for(let i = 0; i< cipoArr.length; i++){
    for(let j = i+1; j < cipoArr.length; j++){
        if(cipoArr[i].price > cipoArr[j].price){
            tmp = cipoArr[i]
            cipoArr[i] = cipoArr[j]
            cipoArr[j] = tmp
        }
    }
}
console.log(cipoArr)
 */











/*
//Összegezze az autók árait!
let ossz = 0
for(let i = 0; i < autoArr.length; i++){
    ossz+=autoArr[i].price
}
console.log(ossz)

//Számolja meg kék autókat!
let count = 0
for(let i = 0; i < autoArr.length; i++){
    if(autoArr[i].color == "kék"){
        count++
    }
}
console.log(count)

//Válogassa ki a piros autókat!
const val = []
for(let i = 0; i < autoArr.length; i++){
    if(autoArr[i].color === "piros"){
        val.push(autoArr[i])
    }
}
console.log(val)

//Keresse meg a legdrágább autót!
let max = 0
for(let i = 1; i < autoArr.length; i++){
    if(autoArr[i].price > autoArr[max].price){
        max = i
    }
}
console.log(autoArr[max])

//Rendezze az autókat ár szerint csökkenő sorrendbe!
for(let i = 0; i < autoArr.length; i++){
    for(let j = i+1; j < autoArr.length; j++){
        if(autoArr[i].price < autoArr[j].price){
            let tmp = autoArr[i];
            autoArr[i] = autoArr[j];
            autoArr[j] = tmp;
        }
    }
}
console.log(autoArr)
*/