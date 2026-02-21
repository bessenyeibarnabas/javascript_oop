import { Manager } from "./manager.js";

class FormController{
    /**
     * @type {Manager}
     */
    #manager;

    /**
     * @type {FormField[]}
     */
    #formFieldElemList;

    /**
     * @type {HTMLFormElement}
     */
    #form;

    /**
     *
     * @param {FormFieldType[]} formFieldList
     * @param {Manager} manager
     */
    constructor(formFieldList, manager){
        this.#manager = manager;

        const form = document.createElement("form");
        document.body.appendChild(form);

        this.#formFieldElemList = [];

        for(const formField of formFieldList){
            const formFieldElem = new FormField(
                formField.id,
                formField.name,
                formField.label,
                formField.required,
                form
            );
            this.#formFieldElemList.push(formFieldElem);
        }

        const button = document.createElement("button");
        button.type = "submit";
        button.innerText = "Küldés";
        form.appendChild(button);

        form.addEventListener("submit", (e) =>{
            e.preventDefault();

            const elem = this.#createElement();

            if(elem){
                this.#manager.addElement(elem);
                e.target.reset();
            }
        });
    }

    /**
     *
     * @returns {Object | null}
     */
    #createElement(){
        let result = {};
        let valid = true;

        for (const inputField of this.#formFieldElemList) {
            if(inputField.validate()){
                result[inputField.name] = inputField.input;
            }
            else{
                valid = false;
            }
        }

        if(valid){
            return result;
        }

        return null;
    }
}

class FormField{

    /**
     * @type {HTMLInputElement}
     */
    #input;

    /**
     * @type {string}
     */
    #name;

    /**
     * @type {boolean}
     */
    #required;

    /**
     * @type {HTMLDivElement}
     */
    #errordiv;

    get input(){
        if(this.#input.value){
            return this.#input.value;
        }
        return undefined;
    }

    get name(){
        return this.#name;
    }

    get required(){
        return this.#required;
    }

    /**
     *
     * @param {string} id
     * @param {string} name
     * @param {string} labelContent
     * @param {boolean} required
     * @param {HTMLFormElement} parent
     */
    constructor(id, name, labelContent, required, parent){

        const div = document.createElement("div");
        parent.appendChild(div);

        const label = document.createElement("label");
        label.innerText = labelContent;
        div.appendChild(label);

        div.appendChild(document.createElement("br"));

        const input = document.createElement("input");
        input.id = id;
        input.name = name;
        div.appendChild(input);

        this.#input = input;
        this.#name = name;
        this.#required = required;

        const errordiv = document.createElement("div");
        errordiv.classList.add("error");
        div.appendChild(errordiv);

        this.#errordiv = errordiv;
    }

    /**
     *
     * @returns {boolean}
     */
    validate(){
        let result = true;

        if(this.#required && !this.#input.value){
            result = false;
            this.#errordiv.innerText = "Kötelező";
        }
        else{
            this.#errordiv.innerText = "";
        }

        return result;
    }
}

export { FormController };
