import { createTable, createInputField, createForm, tbodyRenderColspan, tbodyRenderRowspan } from './function.js';
import data from './data.json' with { type: 'json' };

// --- 1. Manager Osztály ---
class Manager {
    constructor() {
        this.array = [];
        this.selectCallback = null;
    }

    setAddCallback(callback) {
        this.selectCallback = callback;
    }

    add(element) {
        this.array.push(element);
        if (this.selectCallback) {
            this.selectCallback(element);
        }
    }
}

// --- 2. FormField Osztály ---
class FormField {
    constructor(parent, id, name, label, required) {
        this.id = id;
        this.name = name;
        this.required = required;
        
        const elements = createInputField({ 
            parent: parent, 
            id: id, 
            name: name, 
            labelContent: label 
        });
        
        this.input = elements.input;
        this.errorElement = elements.errorElement;
    }

    get value() {
        return this.input.value;
    }

    set value(val) {
        this.input.value = val;
    }

    set error(message) {
        this.errorElement.innerText = message;
    }
}

// --- 3. FormController Osztály ---
class FormController {
    constructor(manager, fieldList) {
        this.manager = manager;
        this.fieldList = fieldList;
        this.fields = []; 
        
        this.form = createForm(
            (formElement) => { this.renderFields(formElement); },
            (e) => { this.handleSubmit(e); }
        );
        document.body.appendChild(this.form);
    }

    renderFields(formElement) {
        for (const def of this.fieldList) {
            const field = new FormField(formElement, def.id, def.name, def.label, def.required);
            this.fields.push(field);
        }
    }

    // Alap validáció: kötelező mezők ellenőrzése
    validateFields() {
        let valid = true;
        for (const field of this.fields) {
            // Töröljük a korábbi hibaüzenetet
            field.error = ""; 

            if (field.required) {
                if (field.value === "") {
                    field.error = "Kötelező";
                    valid = false;
                }
            }
        }
        return valid;
    }

    handleSubmit(e) {
        e.preventDefault();
        
        // 1. lépés: Kötelező mezők ellenőrzése
        if (!this.validateFields()) {
            return;
        }

        // 2. lépés: Adatok kinyerése és Kereszt-validáció (Szerző2 <-> Mű2)
        const dataObj = {};
        
        // Segédváltozók a kereséshez
        let szerzo2Field = null;
        let mu2Field = null;

        for (const field of this.fields) {
            dataObj[field.name] = field.value;
            
            if (field.name === "szerzo2") szerzo2Field = field;
            if (field.name === "mu2") mu2Field = field;
        }

        // Ha léteznek ezek a mezők az űrlapon (a Colspanoson nincsenek, ott nem fut le)
        if (szerzo2Field && mu2Field) {
            // Ha van szerző2, de nincs mű2 -> HIBA
            if (szerzo2Field.value !== "" && mu2Field.value === "") {
                mu2Field.error = "A művet is meg kell adni!";
                return; // Megállítjuk a küldést
            }

            // Ha van mű2, de nincs szerző2 -> HIBA (logikus fordított eset)
            if (mu2Field.value !== "" && szerzo2Field.value === "") {
                szerzo2Field.error = "A szerzőt is meg kell adni!";
                return; // Megállítjuk a küldést
            }
        }

        // Ha minden rendben, mentés
        this.manager.add(dataObj);
        
        // Mezők ürítése
        for (const field of this.fields) {
            field.value = "";
        }
    }
}

// --- 4. Table Osztály ---
class Table {
    constructor(manager, headerArray, renderRowCallback) {
        this.manager = manager;
        this.headerArray = headerArray;
        this.renderRowCallback = renderRowCallback;
        
        this.tbody = createTable(document.body, (row) => {
            this.renderHeader(row);
        });

        this.manager.setAddCallback((element) => {
            this.renderRowCallback(this.tbody, element);
        });
    }

    renderHeader(row) {
        for (const cellDef of this.headerArray) {
            const th = document.createElement('th');
            th.innerText = cellDef.name;
            if (cellDef.colspan) {
                th.colSpan = cellDef.colspan;
            }
            row.appendChild(th);
        }
    }
}

// --- 5. Főprogram ---

// --- A) Colspanos ---
const manager1 = new Manager();
const table1 = new Table(manager1, data.colspanHeaderArray, tbodyRenderColspan);
const form1 = new FormController(manager1, data.colspanFormFieldList);

for (const item of data.colspanDataArr) {
    manager1.add(item);
}

document.body.appendChild(document.createElement('hr'));

// --- B) Rowspanos ---
const manager2 = new Manager();
const table2 = new Table(manager2, data.rowspanHeaderArray, tbodyRenderRowspan);
const form2 = new FormController(manager2, data.rowspanFormFieldList);

for (const item of data.rowspanTableArray) {
    manager2.add(item);
}