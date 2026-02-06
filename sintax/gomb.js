import { muvelet, muveletLetrehoz } from "./function.js"

class Inputs_oszt{

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

    #calculate(input1, input2, eredmenyDiv) {
        return () => {
            const a = Number(input1.value);
            const b = Number(input2.value);
 
            const { result } = muvelet(
                a,
                b,
                muveletLetrehoz(this.muveletStr)
            );
 
            eredmenyDiv.innerText = result;
        }
    }
}

export { Inputs_oszt }
