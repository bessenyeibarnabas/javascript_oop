import { createRadioButton } from "./gomszab.min.js";
import {ViewElement} from "./viewElement.js"
class NavBar extends ViewElement{
    /**
     * @type {ViewElement[]}
     */
    #viewElementList;
    /**
     * @override
     * @param {string} value 
     */
    activate(value){
        for(const elemnt of this.#viewElementList){
            elemnt.activate(value);
        }
        this.div.querySelector(`#${value}`).checked = true;
    }
    /**
     * 
     * @param {ViewElement} element 
     * @param {string} label 
     */
    addViewElement(label ,element){
        this.#viewElementList.push(element);
        const div = createRadioButton({id: element.id, name: this.id, label : label})
        this.div.appendChild(div);
    }
    constructor(){
        super("navbar");
        this.#viewElementList = [];
        this.div.addEventListener('change', (e) =>{
            const radioValue = e.target.value;
            this.activate(radioValue);
        })
    }
}

export {NavBar}