/**
 * @typedef {{label: string,name: string, id: string, type: string,required: boolean }} FormFieldType
 * @typedef {{name: string, colspan?: number}[]} HeaderArrayType 
 * @typedef {{neve: string, kor: string, szerelme1: string, szerelme2: string}} ColspanType
 * @typedef {{nemzet: string, szerzo: string, mu: string, szerzo2: string, mu2: string}} RowspanType
 */

export function addColspanRow(tbody, element) {
    const tr = document.createElement('tr');
    for (const key in element){
        const td = document.createElement('td');
        td.innerText = element[key];
        if (key === 'szerelme1' && element.szerelme2 === undefined){
            td.colSpan = 2;
        }
        tr.appendChild(td);
    }
    tbody.appendChild(tr);
}