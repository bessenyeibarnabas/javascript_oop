/**
 * @import {functions.js}
 */
 
import { Manager } from "./manager.js";
import data from "./data.json" with {type:"json"};


const manager = new Manager();
manager.setCallback( (param) =>{
    console.log(param)
})

for(const item of data.colspanDataArr){
    manager.addElement(item);
}

