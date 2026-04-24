import { createTableCell, createTableHeader } from "./gomszab.min.js";
import { ViewElement } from "./viewElement.js";

class TableView extends ViewElement{ //table-t tartalmazó view element def. viewelementből leszármazó
    /**
     * @type {AuthorManager} //privát tulajdonság a table törzsének
     */
    #manager;
    /**
     * @type {HTMLTabelsectionElement} //privát tulajdonság a table törzsének
     */
    #tbody;
    /**
     * 
     * @param {string} id 
     * @param {string[]} headerArray 
     * @param {authorManager} manager
     */
    constructor(id, headerArray, manager){
        super(id); //szülő konstruktor meghívása
        this.#manager = manager; //manager értéke a bemeneti manager példány
        const table = document.createElement("table"); //table elem létrehozása
        this.div.appendChild(table); //table hozzáadása a view elem div-jéhez
        const thead = createTableHeader(headerArray); //thead létrehozása a headerArray alapján
        table.appendChild(thead); //table-hez adása
        this.#tbody = document.createElement("tbody"); //tbody létrehozása
        table.append(this.#tbody); //table-hez adása

        this.#manager.tableCallback = (authorList) =>{ //definiáljuk a manager table callback-jét a setter meghívásával. lásd  AuthorManager.tableCallback
            if(authorList.length == 0){ //ha a lista üres
                const tr = document.createElement("tr"); //új sor létrehozása
                this.#tbody.appendChild(tr); //sor hozzáadása a tbody-hoz
                createTableCell(tr, "Nincs megjelenítendő sor.", tr).colSpan=3; //cell létrehozása a sorban, szöveggel és a colspan értékét 3-ra állítjuk, hogy a cella három oszlopot foglaljon el
            }
            for (const author of authorList) { //végigiterálunk a szerzők listáján
                const tr = document.createElement("tr"); //új sor létrehozása
                this.#tbody.appendChild(tr); //sor hozzáadása a tbody-hoz

                createTableCell(tr, author.name); //cella létrehozása a szerző nevével
                createTableCell(tr, author.work); //cella létrehozása ző munkájával
                createTableCell(tr, author.concept); //cella létrehozása a szerző konceptjával
            }
        }
        this.activateCallback = () =>{ //def az activate callbacket
            this.#tbody.innerHTML = ""; //töröl a tbody tartalmát
            this.#manager.getAllElement(); //meghívjuk a manager getAllElement (ami meghívja a table callbacket)
        }
    }
}
export { TableView }; //exportáljuk a TableView