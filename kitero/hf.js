class Tanyer{
    constructor(szin, meret){
        this.szin = szin;
        this.meret = meret;
    }
}

class Pohar{
    constructor(szin){
        this.szin = szin;
    }
}

const tanyer = new Tanyer("zöld", "nagy")
const tanyer2 = new Tanyer("piros", "nagy")
const tanyer3 = new Tanyer("kék", "kicsi")

const pohar = new Pohar("lila")

console.log(tanyer)
console.log(tanyer2)
console.log(tanyer3)
console.log(pohar)



//----------------------------------
console.log("Másik megoldás")

function Tanyer2(szin, meret){
    this.szin = szin
    this.meret = meret
}

function Pohar2(szin){
    this.szin = szin
}

const tanyere = new Tanyer("zöldes", "kics")
const tanyer2e = new Tanyer("pirosas", "kicsi")
const tanyer3e = new Tanyer("kékes", "nagy")

const pohare = new Pohar("lilás")

console.log(tanyere)
console.log(tanyer2e)
console.log(tanyer3e)
console.log(pohare)