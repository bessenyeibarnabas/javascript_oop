/**
 * @import {functions.js}
 * @callback tableCallback
 * @param {HTMLTableSectionElement} tbody
 * @returns {void}
 *
 */
import { Manager } from './manager.js';
import data from './data.json' with {type:'json'};
import("functions.js").headerArray;
 
class Table{
    /**
     * @type {HTMLTableSectionElement}
     */
    #tbody;
    /**
     * @type {Manager}
     */
    #manager;
    /**
     *
     * @param {HeaderArrayType} headerArray
     * @param {Manager} manager
     */
constructor(headerArray, manager){
        this.#manager = manager;
 
        const table = document.createElement("table");
        document.body.appendChild(table);
 
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        thead.appendChild(tr);
 
        for(const item of headerArray){
            const th = document.createElement("th")
            th.innerText = item;
            tr.appendChild(th);
        }
 
        const tbody = document.createElement("tbody");
        table.appendChild(tbody);
        this.#tbody = tbody;
    }
  /**
     * @param {TableCallback} callback
     */
    setAppendRow(callback)
    {
        this.#manager.Setter = (elem) => {
            callback(this.#tbody, elem);

        }
    }
}