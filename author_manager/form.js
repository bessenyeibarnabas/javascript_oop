import { ViewElement } from "./viewelment.js";

class FormView extends ViewElement{
    constructor(id){
        super(id)
        this.div.innerText = "Form"
    }
}

export {FormView}