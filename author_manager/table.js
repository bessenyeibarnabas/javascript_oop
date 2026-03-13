import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement{
    /**
     * @type {AuthorManager}
     */
    #manager;
    /**
     * @type {HTMLTabelsectionElement}
     */
    #tbody;
    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray 
     */
    constructor(id, headerArray, manager){
        super(id);
        this.#manager = manager;
        const table = document.createElement("table");
        this.div.appendChild(table);
        const thead = createTableHeader(headerArray);
        table.appendChild(thead);
        this.#tbody = document.createElement("tbody");
        table.append(this.#tbody);
        this.#manager.tableCallback = (authorList) =>{
            if(authorList.length == 0){
                const tr = document.createElement("tr")
                this.#tbody.appendChild(tr)
                createTableCell(tr, "Nincs megjeleníthető sor")
                    
            }

            for (const author of authorList) {
                const tr = document.createElement("tr");
                this.#tbody.appendChild(tr);

                createTableCell(tr, author.name);
                createTableCell(tr, author.work);
                createTableCell(tr, author.concept);
            }
        }
        this.activateCallback = () => {
            this.#tbody.innerHTML = "";
            this.#manager.getAllElement()
        }
    }
}

export {TableView}