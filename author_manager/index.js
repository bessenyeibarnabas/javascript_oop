import { FormView } from "./form.js"
import { NavBar } from "./navigationbar.js"
import { TableView } from "./table.js"

/**
 * @typedef {{id: number, author?: string, work?: string, concept?: string}} AuthorType
 * @typedef {{id: string, label: string, name: string}} FormFieldType
 */
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

const navbar = new NavBar
navbar.appendTo(document.body)
manager.addElement({
    author: "aaa",
    concept: "bbb",
    work: "cccc"
})
const tableView = new TableView("Table", headerArray)
tableView.appendTo(document.body)
navbar.addViewElement("táblázat", tableView)

const formView = new FormView("tableForm")
formView.appendTo(document.body)
navbar.addViewElement("Form", formView)

navbar.activate("table")
manager.getAllElement()