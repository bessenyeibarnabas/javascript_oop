/**
 * @import {FormFieldType, HeaderArrayType, ColspanType, RowspanType} from './functions.js'
 * @import {Manager} from './manager.js'
 */
/**
 * @callback TableCallback
 * @param {HTMLTableSectionElement} tbody
 * @param {ColspanType | RowspanType} type
 * @return {void}
 */

export class Table{
    /**
     * @type {HTMLTableElement}
     */
    #table
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody
    /**
     * @type {HTMLTableSectionElement}
     */
    #thead
    /**
     * @type {Manager}
     */
    #manager

    /**
     *
     * @param {HeaderArrayType} headerArr
     * @param {Manager} manager
     */
    constructor(headerArr, manager){
        //Setup
        this.#manager = manager;
        this.#table = document.createElement('table');
        this.#thead = document.createElement('thead');
        this.#tbody = document.createElement('tbody');

        //Add to table
        this.#table.appendChild(this.#thead);
        this.#table.appendChild(this.#tbody);

        //Render
        this.#renderHeader(headerArr);

        //Append to HTML body
        document.body.appendChild(this.#table);
    }

    /**
     *
     * @param {HeaderArrayType} headerArr
     */
    #renderHeader(headerArr){
        if (!this.#thead) return
        const tr = document.createElement('tr');
        for (const obj of headerArr){
            const th = document.createElement('th');
            th.innerText = obj.name;
            th.colSpan = obj.colspan;
            tr.appendChild(th);
        }
        this.#thead.appendChild(tr);
    }

    /**
     * @param {TableCallback} callback
     * @return {void}
     */
    setAppendRow(callback){
        this.#manager.addCallback = (element) => {
            callback(this.#tbody, element);
        }
    }
}