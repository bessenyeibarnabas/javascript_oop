/**
 * @import {FormFieldType, HeaderArrayType, ColspanType, RowspanType} from './functions.js'
 */
import {Manager} from "./manager.js";
import {Table} from "./table.js";
import data from "./data.json" with {type: 'json'};
import {addColspanRow} from "./functions.js";
import { FormController } from "./form.js";

const manager = new Manager();
const table = new Table(data.colspanHeaderArray, manager);
table.setAppendRow(addColspanRow)

for (const colType of data.colspanDataArr){
    manager.addElement(colType);
}


/**
 *
 * @param {HTMLTableSectionElement} tbody
 * @param {RowspanType} elem
 */
const renderTbodyRowspan = (tbody, elem) =>{
    const tr = document.createElement("tr");
    tbody.appendChild("tr");
 
    const td1 = document.createElement("td");
    td1.innerText = elem.neve;
    tr.appendChild(td1);
 
    const td2 = document.createElement("td");
    td2.innerText = elem.kor;
    tr.appendChild(td3);
 
    const td3 = document.createElement("td");
    td3.innerText = elem.szerelme1;
    tr.appendChild(td1);
 
    if(elem.szerelme2){
    const td4 = document.createElement("td");
    td4.innerText = elem.szerelme2;
    tr.appendChild(td4);
    }
    else{
        td3.rowSpan = 2;
    }
}


const form = new FormController(data.colspanFormFieldList, manager)