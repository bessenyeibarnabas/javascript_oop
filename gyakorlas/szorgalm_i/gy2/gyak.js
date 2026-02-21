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

const tbodyRenderColspan = (tbody, element) => {
    const tr = document.createElement('tr');
    tbody.appendChild(tr);
    
    createTableCell('td', element.szerzo, tr);
    createTableCell('td', element.mu, tr);
    const td3 = createTableCell('td', element.szereplo1, tr);
    
    if (element.szereplo2){
        createTableCell('td', element.szereplo2, tr);
    } else {
        td3.colSpan = 2;
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


//---------------------------------------------------------------oop
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
                    if (dat === "colspan"){
                        th.colSpan = item[dat];
                    } else {
                        th.innerText = item[dat];
                    }
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

            if (valid) {
                let szerzoVal, muVal, szereplo1Val, szereplo2Val;
                
                for (const field of inputObjects){
                    if (field.name === "szerzo") szerzoVal = field.input.value;
                    if (field.name === "mu") muVal = field.input.value;
                    if (field.name === "szereplo1") szereplo1Val = field.input.value;
                    if (field.name === "szereplo2") szereplo2Val = field.input.value;
                }

                const obj = {
                    szerzo: szerzoVal,
                    mu: muVal,
                    szereplo1: szereplo1Val,
                    szereplo2: szereplo2Val !== "" ? szereplo2Val : undefined
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

const table = new Table(data.colspanHeaderArray, manager);
table.setAppendRow(tbodyRenderColspan);

inpForm(manager, data.colspanFormFieldList);



for (const item of data.colspanDataArr){
    manager.addElement(item);
}














