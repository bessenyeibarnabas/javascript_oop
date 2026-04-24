import { FormView } from "./form.js";
import { ImportView } from "./importExport.js";
import { AuthorManager } from "./manager.js";
import { NavBar } from "./navBar.js"
import { TableView } from "./table.js";

const formFields = [{ //ezek alapján példámyosítunk
    id: 'author',
    label: 'Név',
    name: 'author'
},
{
    id: 'work',
    label: 'Mű',
    name: 'work'
},
{
    id: 'concept',
    label: 'Fogalom',
    name: 'concept'
}]

const headerArray = ['Szerző', 'Mű', 'Fogalom'] //létrehoz header list
const manager = new AuthorManager(); //példányosítottuk a managert



/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */


const navBar = new NavBar(); //példányosítottuk a navbart
navBar.appendTo(document.body); //hozzáadtuk a bodyhoz, hogy megjelenjen

const tableView = new TableView('Table', headerArray, manager); //példányosítottuk a táblázatot, megadtuk a header listát és a managert
tableView.appendTo(document.body); //hozzáadtuk a bodyhoz, hogy megjelenjen
navBar.addViewElement('Táblázat', tableView); //hozzáadtuk a navBarhoz a táblázatot, hogy a navBarban megjelenjen egy gomb

const formView = new FormView('TableForm', formFields, manager); //példányosítottuk a formot, megadtuk a formFields listát és a managert
formView.appendTo(document.body); //hozzáadtuk a bodyhoz, hogy megjelenjen
navBar.addViewElement('Form', formView); //hozzáadtuk a navBarhoz a formot

const importExport = new ImportView("importexport", manager); //példányosítottuk az import exportot
importExport.appendTo(document.body); //hozzáadtuk a bodyhoz
navBar.addViewElement("import/export", importExport); //hozzáadtuk a navBarhoz az import exportot

navBar.activate(tableView.id); //meghívtuk a navbar activate metodot a table azonosítójával


