import data from "./data.json" with { type: "json" };
import { 
    createTable, 
    createInputField, 
    createForm, 
    tbodyRenderColspan, 
    tbodyRenderRowspan 
} from './function.js';

// =======================================================================
// 1. OSZTÁLYOK
// =======================================================================

class Manager {
    #dataArray = [];
    #addCallback;

    set addCallback(cb) { this.#addCallback = cb; }

    addElement(element) {
        this.#dataArray.push(element);
        if (this.#addCallback) this.#addCallback(element);
    }
}

class Table {
    #tbody;
    #manager;

    constructor(headerArr, manager) {
        this.#manager = manager;
        this.#tbody = createTable(document.body, (tr) => {
            headerArr.forEach(obj => {
                const th = document.createElement('th');
                th.innerText = obj.name;
                if (obj.colspan) th.colSpan = obj.colspan;
                tr.appendChild(th);
            });
        });
    }

    setAppendRow(callback) {
        this.#manager.addCallback = (element) => callback(this.#tbody, element);
    }
}

// AZ ÓRAI MUNKÁNAK MEGFELELŐ FormField OSZTÁLY
class FormField {
    #input; 
    #name; 
    #required; 
    #errordiv;

    // Érték lekérése itt implementálva
    get input() { 
        return this.#input.value ? this.#input.value : undefined; 
    }
    
    get name() { return this.#name; }
    get required() { return this.#required; }

    constructor(id, name, labelContent, required, parent) {
        this.#name = name;
        this.#required = required;
        const els = createInputField({ id, name, labelContent, parent });
        this.#input = els.input;
        this.#errordiv = els.errorElement;
    }

    // Validáció implementálása itt
    validate() {
        let result = true;
        if (this.#required && !this.#input.value) {
            result = false;
            this.#errordiv.innerText = "Kötelező";
        } else {
            this.#errordiv.innerText = "";
        }
        return result;
    }

    // Egyedi hibaüzenet (pl. a keresztvalidációhoz)
    setError(msg) { 
        this.#errordiv.innerText = msg; 
    }
}

class FormController {
    #manager; 
    #formFieldElemList = [];

    constructor(formFieldList, manager) {
        this.#manager = manager;
        
        const form = createForm(
            (formElement) => {
                formFieldList.forEach(field => {
                    this.#formFieldElemList.push(
                        new FormField(field.id + "JS", field.name, field.label, field.required, formElement)
                    );
                });
            },
            // A submit listener lecsökkentve!
            (e) => {
                e.preventDefault();
                const elem = this.#createElement();
                if (elem) {
                    this.#manager.addElement(elem);
                    e.target.reset();
                }
            }
        );
        document.body.appendChild(form);
    }

    #createElement() {
        let valid = true;
        const result = {};

        // 1. Objektum összeállítása és alap validáció a FormField-ek segítségével
        for (const inputField of this.#formFieldElemList) {
            if (inputField.validate()) {
                result[inputField.name] = inputField.input;
            } else {
                valid = false;
            }
        }

        // 2. Keresztvalidáció a két opcionális mezőre (ha az egyik ki van töltve, a másik is kötelező)
        const opt = this.#formFieldElemList.filter(f => !f.required);
        if (opt.length === 2 && Boolean(opt[0].input) !== Boolean(opt[1].input)) {
            if (!opt[0].input) opt[0].setError("Kötelező");
            if (!opt[1].input) opt[1].setError("Kötelező");
            valid = false;
        }

        return valid ? result : null;
    }
}

// =======================================================================
// 2. INICIALIZÁLÁS
// =======================================================================

// Segédfüggvény, hogy ne kelljen kétszer leírni a példányosítást
const initApp = (header, tableData, formFields, renderCb) => {
    const manager = new Manager();
    const table = new Table(header, manager);
    table.setAppendRow(renderCb);
    new FormController(formFields, manager);
    tableData.forEach(item => manager.addElement(item));
};

// Colspan generálása
initApp(data.colspanHeaderArray, data.colspanDataArr, data.colspanFormFieldList, tbodyRenderColspan);

document.body.appendChild(document.createElement("hr")); // Elválasztó

// Rowspan generálása
initApp(data.rowspanHeaderArray, data.rowspanTableArray, data.rowspanFormFieldList, tbodyRenderRowspan);