import {show, hide} from "./gomszab.min.js"
/**
 * @callback activateCallback
 * @returns {void}
 */
class ViewElement{
    /**
     * @type {HTMLDivElement}
     */
    #div;
    /**
     * @type {string}
     */
    #id;
    /**
     * @type {activateCallback}
     */
    #activateCallback
 
    get div(){
        return this.#div
    }
 
    /**
     * @param {activateCallback} value
     */
    set activateCallback(value){
        this.#activateCallback = value;
    }
 
    /**
     *
     * @param {string} id
     */
    constructor(id){
        this.#id = id;
        this.#div = document.createElement("div");
        this.#div.id = id;
    }
 
    /**
     *
     * @param {HTMLElement} parent
     */
    appendTo(parent){
        parent.appendChild(this.#div);
    }
 
    /**
     *
     * @param {string} id
     */
    activate(id){
        if(this.#id == id){
            show(this.#div);
            if(this.#activateCallback){
                this.#activateCallback();
            }
        }
        else{
            hide(this.#div);
        }
    }
 
    get id(){
        return this.#id;
    }
}
 
export {ViewElement}