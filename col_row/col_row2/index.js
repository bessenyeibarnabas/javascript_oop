import { createTable, createInputField, createForm, tbodyRenderColspan, tbodyRenderRowspan } from './function.js';
import data from './data.json' with { type: 'json' };





/**
 * @typedef {Object} FormFieldType
 * @property {string} label
 * @property {string} name
 * @property {string} id
 * @property {string} [type]
 * @property {boolean} [required]
 */

/**
 * @typedef {Object} HeaderDef
 * @property {string} name
 * @property {number} [colspan]
 */

/**
 * @typedef {Object} AnyDataModel
 */


class Manager {
    constructor() {
        /**
         * @type {AnyDataModel[]}
         */
        this.array = []
        this.selectCallback = null
    }

    setAddCallback(callback){
        this.selectCallback = callback
    }

    add(element){
        this.array.push(element)

        if (this.selectCallback){
            this.selectCallback(element)
        }
    }
}

// formfield class


class FormField {
    /**
     * @param {HTMLElement} parent
     * @param {string} id
     * @param {string} name neve
     * @param {string} label mező tartalma
     * @param {boolean} required kötelező
     */
    constructor(parent, id, name, label, required) {
        this.id = id;
        this.name = name;
        this.required = required;
        
        const elements= createInputField({ 
            parent: parent, 
            id: id, 
            name: name, 
            labelContent: label 
        });
        
        this.input = elements.input;
        this.errorElement = elements.errorElement;
    }

    /** @returns {string} */
    get value() {
        return this.input.value;
    }

    /** @param {string} val */
    set value(val) {
        this.input.value = val;
    }

    /** @param {string} message */
    set error(message) {
        this.errorElement.innerText = message;
    }
}




// formcontroller

class FormController {
    /**
     * @param {Manager} manager
     * @param {FormFieldType[]} fieldList
     */
    constructor(manager, fieldList){
        this.manager = manager;
        this.fieldList = fieldList;
        /** 
         * @type {FormField[]}
         * 
         */
        this.fields = []; 
        
        this.form = createForm(
            (formElement) => { this.renderFields(formElement) },
            (e) => { this.handleSubmit(e) }
        );
        document.body.appendChild(this.form);
    }

    /**
     * def => mezők
     * @param {HTMLFormElement} formElement 
     */
    renderFields(formElement){
        for (const def of this.fieldList){
            const field = new FormField(formElement, def.id, def.name, def.label, def.required)
            this.fields.push(field)
        }
    }

//validal
    validateFields(){
        let valid = true
        for (const field of this.fields){
            field.error = ""

            if (field.required && field.value === ""){
                field.error = "kötelező"
                valid = false
            }
        }
        return valid;
    }

    /**
     * @param {Event} e 
     */
    handleSubmit(e){
        e.preventDefault();
        
        if (!this.validateFields()) {
            return;
        }
        const dataObj = {};
        

        /**
         * @type {FormField } 
         * 
        */
        let szerzo2Field = null;
        /**
         * @type {FormField}
         * 
        */
        let mu2Field = null;

        for (const field of this.fields){
            dataObj[field.name] =field.value;
            
            if (field.name === "szerzo2") szerzo2Field = field
            if (field.name === "mu2") mu2Field = field
        }

        if (szerzo2Field && mu2Field) {
            if (szerzo2Field.value !== "" && mu2Field.value === ""){
                mu2Field.error = "add meg a művet"
                return
            }
            if (mu2Field.value !== "" && szerzo2Field.value === ""){
                szerzo2Field.error = "add meg a szerzőt"
                return
            }
        }

        this.manager.add(dataObj)
        
        for (const field of this.fields){
            field.value = "";
        }
    }
}






// table
class Table{
    constructor(manager, headerArray, renderRowCallback){
        this.manager = manager;
        this.headerArray = headerArray;
        this.renderRowCallback = renderRowCallback;
        
        this.tbody = createTable(document.body, (row) =>{
            this.renderHeader(row);
        });

        this.manager.setAddCallback((element) =>{
            this.renderRowCallback(this.tbody, element);
        });
    }

    /**
     * table header show
     * @param {HTMLTableRowElement} row
     */
    renderHeader(row){
        for (const cellDef of this.headerArray){
            const th = document.createElement("th")
            th.innerText = cellDef.name


            if (cellDef.colspan){
                th.colSpan = cellDef.colspan
            }
            row.appendChild(th)
        }
    }
}



//colspanos
const manager1 = new Manager()
const table1 = new Table(manager1, data.colspanHeaderArray, tbodyRenderColspan);
const form1 = new FormController(manager1, data.colspanFormFieldList);

for (const item of data.colspanDataArr){
    manager1.add(item);
}

document.body.appendChild(document.createElement("hr"));

//eowspanos
const manager2 = new Manager()
const table2 = new Table(manager2, data.rowspanHeaderArray, tbodyRenderRowspan);
const form2 = new FormController(manager2, data.rowspanFormFieldList)

for (const item of data.rowspanTableArray){
    manager2.add(item)
}




