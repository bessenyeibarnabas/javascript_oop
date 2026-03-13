import { createInputAndErrorDiv } from "./gomszab.min.js";
import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";
 
class FormView extends ViewElement{
   /**
    * @type {FormField[]}
    */
   #formInputList;
   /**
    * @type {AuthorManager}
    */
   #manager;
   /**
    * @type {HTMLFormElement}
    */
   #form;
   /**
    *
    * @param {string} id
    * @param {import("./index.js").FormFieldType[]} formFieldList
    * @param {AuthorManager} manager
    */
 constructor(id, formFieldList, manager){
    super(id);
    this.#manager = manager;
    this.#formInputList = [];
    const form = document.createElement("form");
    for (const field of formFieldList) {
      const formField = new FormField(field.id, field.label, field.name, form);
      this.#formInputList.push(formField);
    }
    const button = document.createElement("button");
    button.innerText = "küldés";
    form.appendChild(button);
    const res = document.createElement("div");
    res.innerText = "div";
    this.div.appendChild(res);
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const elem = this.#createElement();
      this.#manager.addElement(elem);
    })
    this.div.appendChild(form);
    this.#manager.addElementResultCallback = (result) => {
      res.innerText = result;
    }
 }
 /**
  * @returns {import("./index.js").AuthorType}
  */
 #createElement(){
   /**
    * @type {import("./index.js").AuthorType}
    */
   let result = {}
   for (const field of this.#formInputList) {
      if(field.validate){
      result[field.name] = field.value;
      return result;
      }
   }
   return result;
 }
}
 
 
 
 
 
class FormField{
   /**
    * @type {string}
    */
   #name;
   /**
    * @type {HTMLInputElement}
    */
   #inputElement;
   /**
    * @type {HTMLDivElement}
    */
   #errorDiv;
 
   get name(){
      return this.#name;
   }
 
    get value(){
      if(this.#inputElement.value){
         return this.#inputElement.value;
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
    constructor(id, label, name, parent){
      const {input, errorDiv} = createInputAndErrorDiv({id, label, name, parent})
      this.#name = name;
      this.#inputElement = input;
      this.#errorDiv = errorDiv;
    }
    /**
     * @returns {boolean}
     */
    validate(){
      let result = true;
      if(!this.value){
         this.#errorDiv.innerText = "mat";
         result = false
      }
      else{
         this.#errorDiv.innerText = "";
      }
      return result;
    }
}
 
export {FormView}