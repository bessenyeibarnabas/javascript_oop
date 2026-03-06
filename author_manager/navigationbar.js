import { createRadioButton } from "./gomszab.min.js";
import {ViewElement} from "./viewelment.js"
class NavBar extends ViewElement{
    /**
     * @type {ViewElement[]}
     */
    #viewElementList;
    /**
     *
     * @param {string} id
     */
    activate(id){
 
    }
    /**
     *
     * @param {ViewElement} element
     * @param {string} label
     */
    addViewElement(label ,element){
        this.#viewElementList.push(element);
        const radie = createRadioButton({id: element.id, name: this.id, label : label})
        this.div.appendChild(radie)
    }   
    constructor(){
        super("navBar");
        this.#viewElementList = [];
        this.div.addEventListener("change", (e)=> {
            const RadioButtonValue = e.target.value;
            this.activat(RadioButtonValue)
        })
    }

    /**
     * @overide
     * @param {string} value 
     */
    activat(value){
        for(const viewelement of this.#viewElementList){
            viewelement.activate(value);
        }
        this.div.querySelector(`#${value}`).checked = true
    }
}
export {NavBar}