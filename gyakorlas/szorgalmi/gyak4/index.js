import { createTable, createTableCell, tbodyRenderColspan, tbodyRenderRowspan } from "./functions.js";
import data from "./data.json" with { type: "json" };

/**
 * @callback AddCallback
 * @param {import("./function.js").ColspanType | import("./function.js").RowspanType} type
 * @returns {void}
 */
class Manager {
    #dataArray = [];
    #addCallBack;
    
    set addCallback(value) {
        this.#addCallBack = value; 
    }
    
    addElement(colRowType) {
        this.#dataArray.push(colRowType);
        if (this.#addCallBack) {
            this.#addCallBack(colRowType);
        }
    }
}

/** * @callback Tablecallback
 * @param {HTMLTableSectionElement} tbody
 * @param {import("./function.js").ColspanType | import("./function.js").RowspanType} type
 * @returns {void}
 */
class Table {
    /**@type {HTMLTableSectionElement} */
    #tbody;
    /**@type {Manager} */
    #manager;
    
    /**
     * @param {import("./function.js").HeaderArrayType} headerArray 
     * @param {Manager} manager 
     */
    constructor(headerArray, manager) {
        this.#manager = manager;
        this.#tbody = createTable(document.body, (tr) => {
            for (const h of headerArray) {
                const th = createTableCell("th", h.name, tr);
                if (h.colspan) {
                    th.colSpan = h.colspan; 
                }
            }
        });
    }
    
    setAppendRow(callback) {
        this.#manager.addCallback = (elem) => {
            callback(this.#tbody, elem);
        };
    }
}

class FormField {
    #input; #name; #required; #errordiv;

    constructor(id, name, label, required, parent) {
        this.#name = name;
        this.#required = required;

        const div = document.createElement("div");
        parent.appendChild(div);

        const lbl = document.createElement("label");
        lbl.innerText = label;
        div.appendChild(lbl);
        div.appendChild(document.createElement("br"));

        this.#input = document.createElement("input");
        this.#input.type = "text";
        this.#input.id = id;
        this.#input.name = name;
        div.appendChild(this.#input);

        this.#errordiv = document.createElement("div");
        this.#errordiv.classList.add("error");
        div.appendChild(this.#errordiv);
    }

    get input() {
        if (this.#input.value) {
            return this.#input.value;
        } else {
            return undefined;
        }
    }

    get name() { return this.#name; }

    validate() {
        if (this.#required && !this.#input.value.trim()) {
            this.#errordiv.innerText = "Kötelező mező!";
            return false;
        } else {
            this.#errordiv.innerText = "";
            return true;
        }
    }
}

class FormController {
    #manager;
    #formFields = [];

    constructor(fieldList, manager) {
        this.#manager = manager;

        const form = document.createElement("form");
        document.body.appendChild(form);

        for (const field of fieldList) {
            this.#formFields.push(new FormField(field.id, field.name, field.label, field.required, form));
        }

        const btn = document.createElement("button");
        btn.type = "submit";
        btn.innerText = "Küldés";
        form.appendChild(btn);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const elem = this.#createElement();
            if (elem) {
                this.#manager.addElement(elem);
                e.target.reset();
            }
        });
    }

    #createElement() {
        let result = {};
        let valid = true;

        for (const field of this.#formFields) {
            if (field.validate()) {
                result[field.name] = field.input;
            } else {
                valid = false;
            }
        }

        if (valid) {
            return result;
        } else {
            return null;
        }
    }
}

// ==========================================

// --- Colspan táblázat és űrlap ---
const man = new Manager();
const tab = new Table(data.colspanHeaderArray, man);
tab.setAppendRow(tbodyRenderColspan);

for (const d of data.colspanDataArr) {
    man.addElement(d);
}
new FormController(data.colspanFormFieldList, man);

// --- Rowspan táblázat és űrlap ---
const man2 = new Manager();
const tab2 = new Table(data.rowspanHeaderArray, man2);
tab2.setAppendRow(tbodyRenderRowspan);

for (const d of data.rowspanTableArray) {
    man2.addElement(d);
}
new FormController(data.rowspanFormFieldList, man2);

export { Manager, Table, FormController, FormField };