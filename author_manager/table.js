import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { ViewElement } from "./viewelment.js";
 
class TableView extends ViewElement{

    #manager;
    #tbody;
    /**
     *
     * @param {string} id
     * @param {string[]} headerArray
     */
    constructor(id, headerArray, manager){
        super(id);
        this.#manager = manager
        const table = document.createElement("table")
        this.div.appendChild(table)
        const thead = createTableHeader(headerArray)
        table.appendChild(thead)
        this.#tbody = document.createElement("tbody")
        table.appendChild(this.#tbody)
        this.#manager.tableCallback = (authorList) =>{
            const tr = document.createElement("tr")
            this.#tbody.appendChild(tr)


            createTableCell(tr, authorList.name)
            createTableCell(tr, authorList.name)
            createTableCell(tr, authorList.name)
        }
    }
}
 
export {TableView}