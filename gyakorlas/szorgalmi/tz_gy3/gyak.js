import data from "./data.json" with { type: "json" };
import { 
    createTable, 
    createInputField, 
    createForm, 
    tbodyRenderRowspan 
} from './function.js';




const jsDiv = document.getElementById("jssection")
const htmlDiv = document.getElementById("htmlsection")

//----------------------------------------------------------------- checkbox
const selector = document.getElementById("tableselector")

/**
 * html js table megjelenítés elrejtése
 * @param {HTMLInputElement} selectoros 
 * @param {HTMLElement} htmles 
 * @param {HTMLElement} jses 
 * @returns {void}
 */
function CheckBox(selectoros, htmles, jses) {
    if (selectoros.checked) {
        htmles.classList.add("hide")
        jses.classList.remove("hide")
    } else {
        htmles.classList.remove("hide")
        jses.classList.add("hide")
    }
}

selector.addEventListener("change", function () {
    CheckBox(selector, htmlDiv, jsDiv)
})
CheckBox(selector, htmlDiv, jsDiv)




//----------------------------------------------------------------- közös valid (de most csak a html, mert oop-miatt a js-tablenk már meg van)
/**
 * @param {HTMLInputElement[]} inputs 
 * @returns {boolean}
 */
function ValidAl(inputs) {
    let valid = true
    for (const inp of inputs) {
        const div = inp.parentElement
        const span = div.querySelector(".error")

        if (inp.value === "") {
            span.innerText = "Kötelező"
            valid = false
        } else {
            span.innerText = ""
        }
    }
    return valid


}




//----------------------------------------------------------------- html hozzáad valid
const htmlform = document.getElementById("htmlform")
htmlform.addEventListener("submit", function (e) {
    e.preventDefault();

    const telepules = htmlform.querySelector("#elso")
    const agazat = htmlform.querySelector("#masodik")
    const pelda = htmlform.querySelector("#harmadik")
    const pelda2 = htmlform.querySelector("#negyedik")

    if (!ValidAl([telepules, agazat, pelda])) return

    /**
     * @type {{telepules:string, agazat: string, pelda: string, pelda2?: string}}
     */
    const obj2 = {
        telepules: telepules.value,
        agazat: agazat.value,
        pelda: pelda.value,
        pelda2: pelda2.value !== "" ? pelda2.value : undefined,
    }

    const tbody = document.getElementById("htmltbody")
    const tr = document.createElement("tr")
    tbody.appendChild(tr)

    const td1 = document.createElement("td")
    tr.appendChild(td1)
    td1.innerText = obj2.telepules

    const td2 = document.createElement("td")
    tr.appendChild(td2)
    td2.innerText = obj2.agazat

    const td3 = document.createElement("td")
    tr.appendChild(td3)
    td3.innerText = obj2.pelda

    if (obj2.pelda2) {
        const td4 = document.createElement("td")
        tr.appendChild(td4)
        td4.innerText = obj2.pelda2
    } else {
        td3.colSpan = "2"
    }

    htmlform.reset()
})





//----------------------------------------------------------------- oop
/**
 * @callback callback
 * @param {Object}
 * @returns {void}
 */
class Manager {
    #tableArray;
    #addCallback;
    constructor() {
        this.#tableArray = [];
    }

    addElement(element){
        this.#tableArray.push(element);
        if (this.#addCallback){
            this.#addCallback(element);
        }
    }

    setCallback(callback){
        this.#addCallback = callback;
    }
}



//----------------------------------------------------------------- table
class Table {
    #tbody;
    #manager;

    constructor(headerArray, manager, parentNode){
        this.#manager = manager;

        this.#tbody = createTable(parentNode, (tr) =>{
            for (const item of headerArray){
                const th = document.createElement("th");
                tr.appendChild(th);
                for (const key in item){
                    th.innerText = item[key];
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
const inpForm = (manager, formFieldList, parentNode) =>{
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

            let agazat2Input, pelda2Input, agazat2Error, pelda2Error;
            for (const field of inputObjects){
                if (field.name === "agazat2") { agazat2Input = field.input; agazat2Error = field.error; }
                if (field.name === "pelda2") { pelda2Input = field.input; pelda2Error = field.error; }
            }

            if (agazat2Input.value !== "" && pelda2Input.value === ""){
                pelda2Error.innerText = "Kötelező";
                valid = false;
            }
            if (agazat2Input.value === "" && pelda2Input.value !== ""){
                agazat2Error.innerText = "Kötelező";
                valid = false;
            }

            if (valid){
                let telepulesVal, agazatVal, peldaVal, agazat2Val, pelda2Val;
                
                for (const field of inputObjects){
                    if (field.name === "telepules") telepulesVal = field.input.value;
                    if (field.name === "agazat") agazatVal = field.input.value;
                    if (field.name === "pelda") peldaVal = field.input.value;
                    if (field.name === "agazat2") agazat2Val = field.input.value;
                    if (field.name === "pelda2") pelda2Val = field.input.value;
                }

                const obj = {
                    telepules: telepulesVal,
                    agazat: agazatVal,
                    pelda: peldaVal,
                    agazat2: agazat2Val !== "" ? agazat2Val : undefined,
                    pelda2: pelda2Val !== "" ? pelda2Val : undefined
                };

                manager.addElement(obj);
                e.target.reset();

            }





        }


    );

    parentNode.appendChild(form);
}




//----------------------------------------------------------------- data
const manager = new Manager();

const table = new Table(data.rowspanHeaderArray, manager, jsDiv);
table.setAppendRow(tbodyRenderRowspan);

inpForm(manager, data.rowspanFormFieldList, jsDiv);

for (const item of data.rowspanTableArray){
    manager.addElement(item);
}




