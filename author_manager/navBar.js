import { createRadioButton } from "./gomszab.min.js";
import {ViewElement} from "./viewElement.js"
class NavBar extends ViewElement{ //NavBar osztály, ami a ViewElement osztályból öröklődik
    /**
     * @type {ViewElement[]}
     */
    #viewElementList; //privát tulajdonság, ami egy tömböt tárol, amiben a ViewElement példányokat tároljuk
    /**
     * @override
     * @param {string} value 
     */
    activate(value){
        for(const elemnt of this.#viewElementList){ // végigiterálunk a ViewElement példányokon
            elemnt.activate(value); // meghívjuk mindegyik példány activate függvényét a bemeneti paraméterrel
        }
        this.div.querySelector(`#${value}`).checked = true; // beállítjuk a kiválasztott rádiógombot
    }
    /**
     * 
     * @param {ViewElement} element 
     * @param {string} label 
     */
    addViewElement(label ,element){ // függvény, ami hozzáad egy ViewElement példányt a NavBar-hoz
        this.#viewElementList.push(element); // hozzáadjuk a ViewElement példányt a tömbhöz
        const div = createRadioButton({id: element.id, name: this.id, label : label}) // létrehozunk egy rádiógombot a ViewElement példány azonosítójával, a NavBar azonosítójával és a megadott labellel
        this.div.appendChild(div); // hozzáadjuk a rádiógombot a NavBar divjéhezs
    }
    constructor(){ // konstruktor
        super("navbar"); // meghívjuk a szülőosztály konstruktorát a "navbar" azonosítóval
        this.#viewElementList = []; // inicializáljuk a ViewElement példányokat tároló tömböt
        this.div.addEventListener('change', (e) =>{ // eseményfigyelő a NavBar divjére, ami akkor fut le, amikor megváltozik a rádiógombok állapota
            const radioValue = e.target.value; // lekérjük a kiválasztott rádiógomb értékét
            this.activate(radioValue);  // meghívjuk a NavBar activate függvényét a kiválasztott rádiógomb értékével
        })
    }
}

export {NavBar} // exportáljuk a NavBar osztályt