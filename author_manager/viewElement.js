import {show, hide} from "./gomszab.min.js"
/**
 * @callback activateCallback
 * @returns {void}
 */
class ViewElement{ //Ososztály a megjeleni tendČ sztályoknak
    /**
     * @type {HTMLDivElement}
     */
    #div; // pëldänyositäskor létrehozunk egy divet az elemnek, tároljuk el benne
    /**
     * @type {string}
     */
    #id;; // privat tulajdonság az osztály peldanyának

    /**
     * @type {activateCallback}
     */
    #activateCallback

    get div(){ //getter definiálása a divnek
        return this.#div
    }

    /**
     * @param {activateCallback} value 
     */
    set activateCallback(value){
        this.#activateCallback = value;//// akkor fut le, amikor megjelenik elem a képer•nyón (opc irnális lásd: activdt függvény)
    }

    /**
     * 
     * @param {string} id 
     */
    constructor(id){//konstruktor. hemenŕti azonos i tóval
        this.#id = id; //atonosító beállítása
        this.#div = document.createElement("div") //;div létrehozó',] és d div privát ueállit-ás
        this.#div.id = id; // div azonosítójának heÁ111thsa
    }

    /**
     * 
     * @param {HTMLElement} parent 
     */
    appendTo(parent){//// definiálunk egy függvény a példánynak. a bemeneti paraméter egv html el
        parent.appendChild(this.#div); //; / htmL elemhez hozzácsatoljuk a div tulajdonságot (lásd konstrukt
    }

    /**
     * 
     * @param {string} id 
     */
    activate(id){ //// függvényt definiólunk példánvoknak
        if(this.#id == id){// ha a példány azonosítója megegyezik a bemeneti paraméterrel, akkor megjelenítjük a divet
            show(this.#div); // megjelenítjük a divet
            if(this.#activateCallback){ // ha van aktiválási callback, akkor meghívjuk
                this.#activateCallback(); // meghívjuk a callbacket, ami akkor fut le, amikor megjelenik az elem a képernyőn (opcionális, lásd: activateCallback setter)
            }
        }
        else{ //egyébként
            hide(this.#div); //// h0zzáfüfűzzük az elemhez a hidden css osztályt
        }
    }

    get id(){
        return this.#id;
    }
}

export {ViewElement}