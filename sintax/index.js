import { muvelet, muveletLetrehoz } from "./function.js"

const input1 = document.createElement("input")
document.body.appendChild(input1)

const input2 = document.createElement("input")
document.body.appendChild(input2)

const div = document.createElement("div")
document.body.appendChild(div)

const button = document.createElement("button")
document.body.appendChild(button)
button.innerText = "gombocska"

//eventlistener
button.addEventListener("click", function(){
    const sz1 = Number(input1.value);
    const sz2 = Number(input2.value);
    const {result} = muvelet(sz1, sz2, muveletLetrehoz("+")); //destructuring
    div.innerText = result;
})
 

