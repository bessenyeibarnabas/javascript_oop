import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class FormView extends ViewElement{ // leszármazunk a view elementből és def a formcontroller osztályt
   /**
    * @type {FormField[]}
    */
   #formInputList; //privát tulajdonság a form mezőinek listájának
   /**
    * @type {AuthorManager}
    */
   #manager; //privát tulajdonság a managernek
   /**
    * @type {HTMLFormElement}
    */
   #form; //privát tulajdonság a form elemének
   /**
    * 
    * @param {string} id 
    * @param {import("./index.js").FormFieldType[]} formFieldList 
    * @param {AuthorManager} manager 
    */
 constructor(id, formFieldList, manager){ //def a konstruktor
    super(id); //meghívjuk a szülő konstruktorát az id-vel
    this.#manager = manager; //értékül adjuk a privát manager tulajdonságnak a bemeneti manager értékét
    this.#formInputList = []; //értékül adjuk a privát formInputList tulajdonságnak egy üres tömböt
    const form = document.createElement("form"); //létrehozunk egy form elemet
    for (const field of formFieldList) {//végigiterálunk a bemeneti formFieldList-en
      const formField = new FormField(field.id, field.label, field.name, form); //minden mezőhöz létrehozunk egy FormField példányt a mező id-jével, labeljével, name-jével és a form elemmel
      this.#formInputList.push(formField); //a létrehozott FormField példányt hozzáadjuk a formInputList-hez
    }
    const button = document.createElement("button"); //létrehozunk egy button elemet
    button.innerText = "küldés"; //a button szövegét "küldés"-re állítjuk
    form.appendChild(button); //a form elemhez hozzáadjuk a button elemet
    const res = document.createElement("div"); //létrehozunk egy div elemet, amiben megjelenítjük az eredményt
    this.div.appendChild(res); //a view elemhez hozzáadjuk az eredmény div elemét
    form.addEventListener('submit', (e) => { //hozzáadunk egy submit eseményfigyelőt a form elemhez
      e.preventDefault(); //akadály - defért működését
      const elem = this.#createElement(); //létrehozunk egy elemet a #createElement függvény segítségével, ami egy AuthorType objektumot ad vissza a form mezőinek értékeiből
      this.#manager.addElement(elem); //az így létrehozott elemet átadjuk a manager addElement metódusának, hogy hozzáadja a szerzők listájához
    })
    this.div.appendChild(form); //a view elemhez hozzáadjuk a form elemet
    this.#manager.addElementResultCallback = (result) =>{ //beállítjuk a manager addElementResultCallback-jét egy függvényre, ami megkapja az eredményt
      res.innerText = result; //az eredmény div elem szövegét beállítjuk a kapott eredményre
    }
    setTimeout(() =>{ //beállítunk egy időzítőt, ami 1.5 másodap múlva lefut
      res.innerText = ""; //és töröljük az eredmény div elem szövegét
    }, 1500) //1,5s múlva
 }
 /**
  * @returns {import("./index.js").AuthorType}
  */
 #createElement(){ //def a #createElement metódust, ami visszaad egy AuthorType objektumot
   /**
    * @type {import("./index.js").AuthorType}
    */
   let result = {} // authortype típusú obj-t
   for (const field of this.#formInputList) { //végigiterálunk a form mezőinek listáján
      if(field.validate()){ //ha a mező valid akkor a result objektum egy új tulajdonságát létrehozzuk a mező nevével, és értékül adjuk a mező értékét
      result[field.name] = field.value; //a result obj formfield name értékével megeggyező nevű tulajdonságának megadjuk a forminput beviteli mezőjének az értékét
      }
   }
   return result;
 }
}





class FormField{ //def a FormField osztályt
   /**
    * @type {string}
    */
   #name; //privát tulajdonság a mező nevének
   /**
    * @type {string}
    */
   #name; //privát tulajdonság a mező nevének
   /**
    * @type {HTMLInputElement}
    */
   #inputElement; //privát tulajdonság a mező input elemének
   /**
    * @type {HTMLDivElement}
    */
   #errorDiv; //privát tulajdonság a mező hibaüzenetét megjelenítő div elemének

   get name(){
      return this.#name; //getter a mező nevéhez
   }

    get value(){
      if(this.#inputElement.value){ //getter a mező értékéhez, ha van érték akkor visszatérünk az input elem értékével
         return this.#inputElement.value; //ha van érték akkor visszatérünk az input elem értékével
      }
      else{
         return undefined;
      }
    }

    /**
     * 
     * @param {string} id 
     * @param {string} label 
     * @param {string} name 
     * @param {HTMLFormElement} parent 
     */
    constructor(id, label, name, parent){ //def a konstruktor, ami egy id-t, egy label-t, egy name-t és egy parent elemet vár bemenetként
      const {input, errorDiv} = createInputAndErrorDiv({id, label, name, parent}) //létrehozzuk az input elemet és a hibaüzenet div elemét a createInputAndErrorDiv függvény segítségével, ami egy objektumot ad vissza, amiben van egy input és egy errorDiv tulajdonság
      this.#name = name; //értékül adjuk a privát name tulajdonságnak a bemeneti name értékét
      this.#inputElement = input; //értékül adjuk a privát inputElement tulajdonságnak a létrehozott input elemet
      this.#errorDiv = errorDiv;    //értékül adjuk a privát errorDiv tulajdonságnak a létrehozott hibaüzenet div elemét
    }
    /**
     * @returns {boolean}
     */
    validate(){
      let result = true; //def egy result változót, ami true értékkel van inicializálva
      if(!this.value){ //létrehozunk egy result változót (true)
         this.#errorDiv.innerText = "Kötelező"; //ha a mező értéke nincs megadva akkor a hibaüzenet div elemének a szövegét "Kötelező"-re állítjuk, és a
         result = false //result értékét false-ra állítjuk
      }
      else{
         this.#errorDiv.innerText = ""; //töröljük az error div szövegét
      }
      return result; //visszatérünk a result változó értékével, ami true, ha a mező értéke meg van adva, és false, ha nincs megadva
    }
}

export {FormView}