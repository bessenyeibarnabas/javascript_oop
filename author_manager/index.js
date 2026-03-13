import { FormView } from "./form.js";
import { AuthorManager } from "./manager.js";
import { NavBar } from "./navBar.js"
import { TableView } from "./table.js";

const formFields = [{
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

const headerArray = ['Szerző', 'Mű', 'Fogalom']
const manager = new AuthorManager();




/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */


const navBar = new NavBar();
navBar.appendTo(document.body);

const tableView = new TableView('Table', headerArray, manager);
tableView.appendTo(document.body);
navBar.addViewElement('Táblázat', tableView);

const formView = new FormView('TableForm', formFields, manager);
formView.appendTo(document.body);
navBar.addViewElement('Form', formView);
navBar.activate(tableView.id);

manager.getAllElement();