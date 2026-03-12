const autoArr = [
    {
        name: 'A autó',
        brand: 'Ford',
        color: "piros",
        price: 2
    },
    {
        name: 'B autó',
        brand: 'BMW',
        color: "zöld",
        price: 63
    },
    {
        name: 'C autó',
        brand: 'BMW',
        color: "piros",
        price: 18
    },
    {
        name: 'D autó',
        brand: 'Opel',
        color: "piros",
        price: 17
    },
    {
        name: 'E autó',
        brand: 'Mercedes',
        color: "kék",
        price: 19
    },
    {
        name: 'F autó',
        brand: 'Ford',
        color: "kék",
        price: 9
    }
]

//Összegezze az autók árait!
let ossz = 0
for(let i = 0; i < autoArr.length; i++){
    ossz+= autoArr[i].price
}
console.log(ossz)

//Számolja meg kék autókat!
count = 0
for(let i = 0; i < autoArr.length; i++){
    if(autoArr[i].color === "kék"){
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

//Keresse meg azt a BMW-t aminek az ára nagyobb 20-nál!
let i = 0
while(i < autoArr.length && !(autoArr[i].brand === 'BMW' && autoArr[i].price > 20)){
    i++
}
if(i < autoArr.length){
    console.log(autoArr[i])
}

//Keresse meg a legdrágább autót!
let max = 0
for(let i = 0; i < autoArr.length; i++){
    if(autoArr[i].price > autoArr[max].price){
        max = i
    }
}
console.log(autoArr[max])

//Rendezze az autókat ár szerint csökkenő sorrendbe!
for(let i = 0; i< autoArr.length; i++){
    for(let j = i+1; j < autoArr.length; j++){
        if(autoArr[i].price >autoArr[j].price){
            let tmp = autoArr[i];
            autoArr[i] = autoArr[j];
            autoArr[j] = tmp;
        }
    }
}
console.log(autoArr)