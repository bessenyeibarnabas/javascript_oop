/**
 * @import {FormFieldType, HeaderArrayType, ColspanType, RowspanType} from './functions.js'
 */
/**
 * @callback AddCallback
 * @param {ColspanType | RowspanType} type
 * @return {void}
 */

export class Manager{
    /**
     * @type {ColspanType[] | RowspanType[]}
     */
    #dataArray
    /**
     * @type {AddCallback}
     */
    #addCallback

    /**
     * @param {AddCallback} value
     */
    set addCallback(value){
        this.#addCallback = value;
    }

    constructor() {
        this.#dataArray = [];
    }

    /**
     * @param {ColspanType | RowspanType} element
     */
    addElement(element){
        this.#dataArray.push(element);
        if (!this.#addCallback) return;
        this.#addCallback(element);
    }
}