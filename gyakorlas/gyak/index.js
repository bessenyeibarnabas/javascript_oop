import { createTable, createInputField, createForm, tbodyRenderColspan, tbodyRenderRowspan } from "./function.js"
import data from "./data.json" with { type: "json" }



/**
 * @typedef {Object} HeaderDefinition
 * @property {string} name
 * @property {number} [colspan]
 */


class Manager {
    constructor() {
        this.array = []
        this.selectCallback = null
    }

    /**
     * @param {function} callback 
     */
    setAddCallback(callback) {
        this.selectCallback = callback
    }

    /**
     * @param {Object} element 
     */
    add(element) {
        this.array.push(element)
        if (this.selectCallback) {
            this.selectCallback(element);
        }
    }
}


class FormField {
    /**
     * @param {HTMLElement} parent
     * @param {string} id 
     * @param {string} name 
     * @param {string} label 
     * @param {boolean} required 
     */
    constructor(parent, id, name, label, required) {
        this.id = id
        this.name = name;
        this.required = required
        
        const elements = createInputField({ 
            parent: parent, 
            id: id, 
            name: name, 
            labelContent: label 
        })
        
        this.input = elements.input
        this.errorElement = elements.errorElement;
    }

    get value() {
        return this.input.value
    }

    set value(val) {
        this.input.value = val;
    }

    set error(message) {
        this.errorElement.innerText = message
    }
}


class FormController {
    /**
     * @param {Manager} manager 
     * @param {FieldDefinition[]} fieldList 
     */
    constructor(manager, fieldList){
        this.manager = manager;
        this.fieldList = fieldList
        this.fields = []
        
        this.form = createForm(
            (formElement) => { this.renderFields(formElement)},
            (e) => { this.handleSubmit(e) }
        );
        document.body.appendChild(this.form)
    }

    /**
     * @param {HTMLFormElement} formElement 
     */
    renderFields(formElement){
        for (const def of this.fieldList) {
            const field = new FormField(formElement, def.id, def.name, def.label, def.required);
            this.fields.push(field)
        }
    }


    validateFields(){
        let valid = true
        for (const field of this.fields) {
            field.error = ""

            if (field.required) {
                if (field.value === ""){
                    field.error = "kötelező"
                    valid = false;
                }
            }
        }
        return valid
    }



    /**
     * @param {Event} e 
     */
    handleSubmit(e){
        e.preventDefault()
        
        if (!this.validateFields()){
            return
        }

        const dataObj ={}
        
        let szerzo2Field = null
        let mu2Field = null;

        for (const field of this.fields){
            dataObj[field.name] = field.value
            
            if (field.name === "szerzo2") szerzo2Field = field;
            if (field.name === "mu2") mu2Field = field
        }

        if (szerzo2Field && mu2Field) {
            if (szerzo2Field.value !== "" && mu2Field.value === ""){
                mu2Field.error = "A művet is meg kell adni!"
                return 
            }

            if (mu2Field.value !== "" && szerzo2Field.value === ""){
                szerzo2Field.error = "A szerzőt is meg kell adni!"
                return; 
            }
        }

        this.manager.add(dataObj)
        
        for (const field of this.fields){
            field.value = ""
        }
    }
}


class Table {
    /**
     * @param {Manager} manager 
     * @param {HeaderDefinition[]} headerArray 
     * @param {function} renderRowCallback 
     */
    constructor(manager, headerArray, renderRowCallback){
        this.manager = manager
        this.headerArray = headerArray;
        this.renderRowCallback = renderRowCallback
        
        this.tbody = createTable(document.body, (row) =>{
            this.renderHeader(row)
        });

        this.manager.setAddCallback((element) =>{
            this.renderRowCallback(this.tbody, element)
        })
    }

    renderHeader(row) {
        for (const cellDef of this.headerArray) {
            const th = document.createElement("th")
            th.innerText = cellDef.name;
            if (cellDef.colspan) {
                th.colSpan = cellDef.colspan
            }
            row.appendChild(th)
        }
    }
}

const manager1 = new Manager()
const table1 = new Table(manager1, data.colspanHeaderArray, tbodyRenderColspan);

const form1 = new FormController(manager1, data.colspanFormFieldList);

for (const item of data.colspanDataArr) {
    manager1.add(item)
}

document.body.appendChild(document.createElement("hr"));

const manager2 = new Manager()
const table2 = new Table(manager2, data.rowspanHeaderArray, tbodyRenderRowspan)
const form2 = new FormController(manager2, data.rowspanFormFieldList);

for (const item of data.rowspanTableArray) {
    manager2.add(item)
}


