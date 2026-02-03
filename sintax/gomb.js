import { muvelet, muveletLetrehoz } from "./function.js"

class Inputs_oszt{

    #calculate

    constructor(input1, input2, muveletStr, eredmenyDiv){
        this.input1 = input1;
        this.input2 = input2;
        this.muveletStr = muveletStr;
        this.eredmenyDiv = eredmenyDiv;

        this.button = document.createElement("button")
        this.button.textContent = muveletStr;
        document.body.appendChild(this.button)


        this.button.addEventListener("click", () => {
            const inp1 = Number(this.input1.value);
            const inp2 = Number(this.input2.value);

            const { result } = muvelet(inp1, inp2, muveletLetrehoz(this.muveletStr))

            this.eredmenyDiv.innerText = result;
        })

        
    }

    #calculate(input1, input2, eredmenyDiv){
        return () => {
            const inp = 
        }
    }
}

export { Inputs_oszt }
