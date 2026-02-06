/**
 * @import {FormFieldType, HeaderArrayType, ColspanType, RowspanType} from './functions.js'
 * @callback callback
 * @param {ColspanType || RowspanType}
 * @returns {void}
 */
 
class Manager{
    /**
     * @type {ColspanType[] || RowspanType[]}
     */
    #tableArray;
    /**
     * @type {callback}
     */
    #addCallback;
    constructor(){
        this.#tableArray = [];
    }

    /**
     *
     * @param {ColspanType || RowspanType} element
     * @returns {void}
     */
    addElement(element){
        this.#tableArray.push(element);
        if(this.#addCallback){
            this.#addCallback(element);
        }
    }

    /**
     *
     * @param {callback} callback
     */
    setCallback(callback){
        this.#addCallback = callback;
    }

    
}

//exports
export { Manager }