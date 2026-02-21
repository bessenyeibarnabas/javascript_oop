import data from "./data.json" with { type: "json" };
//----------------------------------------------------function.js (gomszab)

/**
 * @param {"th" | "td"} type 
 * @param {string} content 
 * @param {HTMLElement} parent 
 * @return {HTMLTableCellElement}
 */
const createTableCell = (type, content, parent) => {
    const cell = document.createElement(type);
    cell.innerText = content;
    parent.appendChild(cell);
    return cell;
}

const tbodyRenderRowspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    const td1 = createTableCell('td', element.terulet, tr);
    createTableCell('td', element.evszam, tr);
    createTableCell('td', element.esemyeny, tr);
    
    if (element.evszam2 && element.esemyeny2){
        td1.rowSpan = 2;
        const tr2 = document.createElement('tr'); 
        tbody.appendChild(tr2);
        createTableCell('td', element.evszam2, tr2);
        createTableCell('td', element.esemyeny2, tr2);
    }
}

/**
 * @param {HTMLElement} parent ehhez csatoljuk hozza a table-t
 * @param {HeaderCallback} headerCallback ez fut le miutan hozzafuzzuk a tablazat fejlecehez a tablazatsort
 * @returns {HTMLTableSectionElement} a tablazat torzse
 */
const createTable = (parent, headerCallback) => {
    const table = document.createElement('table')
    parent.appendChild(table);
    const header = document.createElement('thead');
    table.appendChild(header);
    const tr = document.createElement('tr');
    header.appendChild(tr);
    headerCallback(tr);
    const tbody = document.createElement('tbody');
    table.appendChild(tbody)
    return tbody
}

/**
 * @param {{id: string, name: string, labelContent: string, parent: HTMLElement}} param A parameterobjektum ami alapjan osszeallitja az inputot tartalmazo divet az errorral
 * @returns {{errorElement: HTMLElement, input: HTMLInputElement}} Az error html elem, es az input html elem
 */
const createInputField = ({id, name, labelContent, parent}) =>{
    const div = document.createElement('div');
    parent.appendChild(div);
    
    const label = document.createElement('label');
    label.innerText = labelContent;
    div.appendChild(label);
    const input = document.createElement('input')
    div.appendChild(input);
    input.type = 'text';
    input.id = id;
    input.name = name;
    const errorElement = document.createElement('div');
    errorElement.classList.add('error');
    div.appendChild(errorElement);
    return {errorElement, input};
}

/**
 * @callback CreateFieldsCallback
 * @param {HTMLFormElement} form a form amihez hozzafuzzuk
 * @returns {void}
 * * @callback SubmitEventListener
 * @param {Event} event submitesemeny
 * @returns {void}
 * * @param {CreateFieldsCallback} createFieldsCallback 
 * @param {SubmitEventListener} submitEventListener 
 * @returns {HTMLFormElement}
 */
const createForm = (createFieldsCallback, submitEventListener) => {
    const form = document.createElement('form')
    createFieldsCallback(form);
    const button = document.createElement('button');
    button.innerText = 'Küldés';
    form.appendChild(button)
    form.addEventListener('submit', submitEventListener);
    return form;
}


//--------------------------------------------------------------oop
/**
 * @callback callback
 * @param {ColspanType || RowspanType}
 * @returns {void}
 */
class Manager {
    /**
     * @type {ColspanType[] || RowspanType[]}
     */
    #tableArray;
    /**
     * @type {callback}
     */
    #addCallback;
    constructor(){
        this.#tableArray = [];
    }

    /**
     *
     * @param {ColspanType || RowspanType} element
     * @returns {void}
     */
    addElement(element){
        this.#tableArray.push(element);
        if (this.#addCallback){
            this.#addCallback(element);
        }
    }

    /**
     *
     * @param {callback} callback
     */
    setCallback(callback){
        this.#addCallback = callback;
    }
}

//----------------------------------------------------------------- table
class Table {
    #tbody;
    #manager;

    constructor(headerArray, manager){
        this.#manager = manager;

        this.#tbody = createTable(document.body, (tr) =>{
            for (const item of headerArray){
                const th = document.createElement("th");
                tr.appendChild(th);
                for (const dat in item){
                    th.innerText = item[dat];
                }
            }
        });
    }

    setAppendRow(callback){
        this.#manager.setCallback((elem) =>{
            callback(this.#tbody, elem);
        });
    }
}

//----------------------------------------------------------------- form js
const inpForm = (manager, formFieldList) =>{
    const inputObjects = [];

    const form = createForm(
        (formElement) =>{
            for (const field of formFieldList){
                const inputObj = createInputField({
                    id: field.id,
                    name: field.name,
                    labelContent: field.label,
                    parent: formElement
                });
                
                inputObjects.push({
                    input: inputObj.input,
                    error: inputObj.errorElement,
                    required: field.required,
                    name: field.name
                });
            }
        },
        
        (e) =>{
            e.preventDefault();
            let valid = true;

            for (const field of inputObjects){
                field.error.innerText = "";

            }

            for (const field of inputObjects){
                if (field.required && field.input.value === ""){
                    field.error.innerText = "Kötelező";
                    valid = false;
                }
            }

            let evszam2Input, esemeny2Input, evszam2Error, esemeny2Error;
            for (const field of inputObjects){
                if (field.name === "evszam2") { evszam2Input = field.input; evszam2Error = field.error;}
                if (field.name === "esemeny2") { esemeny2Input = field.input; esemeny2Error = field.error;}
            }
            

            if (evszam2Input.value !== "" && esemeny2Input.value === ""){
                esemeny2Error.innerText = "Kötelező";
                valid = false;
            }
            if (evszam2Input.value === "" && esemeny2Input.value !== ""){
                evszam2Error.innerText = "Kötelező";
                valid = false;
            }

            if (valid) {
                let teruletVal, evszamVal, esemeny1Val, evszam2Val, esemeny2Val;
                
                for (const field of inputObjects){
                    if (field.name === "terulet") teruletVal = field.input.value;
                    if (field.name === "evszam") evszamVal = field.input.value;
                    if (field.name === "esemeny1") esemeny1Val = field.input.value;
                    if (field.name === "evszam2") evszam2Val = field.input.value;
                    if (field.name === "esemeny2") esemeny2Val = field.input.value;
                }

                const obj = {
                    terulet: teruletVal,
                    evszam: evszamVal,
                    esemyeny: esemeny1Val,
                    evszam2: evszam2Val !== "" ? evszam2Val : undefined,
                    esemyeny2: esemeny2Val !== "" ? esemeny2Val : undefined
                };

                manager.addElement(obj);
                e.target.reset();
            }
        }
    );

    document.body.appendChild(form);
}

//----------------------------------------------------------------- data
const manager = new Manager();

const table = new Table(data.rowspanHeaderArray, manager);
table.setAppendRow(tbodyRenderRowspan);

inpForm(manager, data.rowspanFormFieldList);


for (const item of data.rowspanTableArray){
    manager.addElement(item);
}








