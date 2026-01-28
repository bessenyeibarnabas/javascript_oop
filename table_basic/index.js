
/** * @typedef {{author: string, title1: string, concepts1: string, title2?: string,  concepts2?: string}} RowspanRowType  
 * @typedef {{author: string, title: string, concepts: string, concepts2?: string}} ColspanRowType
 * @typedef {{name: string, colSpan?: number}} HeaderType
 * * @callback
 * @param {HTMLTableSectionElement}
*/

/** @type {HeaderType[]}  */
const rowspanHeaderArr = [{name: "Szerző"}, {name: "Mű"}, {name: "Fogalmak"}];
/** @type {HeaderType[]}   */
const colspanHeaderArr = [{name: "Szerző"},{name: "Mű"} , {name: "Fogalmak" ,colSpan: 2}] 

/** @type {RowspanRowType[]}  */
const rowspanBodyArr = [
    {
        author: "Appolliniare",
        title1: "A megsebzett galamb és a szökőkút", 
        concepts1: "képvers", 
        title2: "Búcsú",
        concepts2: "avantgárd" 
    },
    {
        author: "Thomas Mann",
        title1: "Mario és a varázsló",
        concepts1: "kisregény" 
    },
    {
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
]



/** @type {ColspanRowType[]} */
const colspanBodyArr = [ 
    {
        author: "Appolliniare", 
        title: "A megsebzett galamb és a szökőkút",
        concepts: "Képvers",  
        concepts2: "Emlékezés"
    },
    {
        author: "Appolliniare", 
        title: "Búcsú", 
        concepts: "Avantgárd" 
    },
    {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény" 
    },
    {
        author: "Franz Kafka",
        title: "A per", 
        concepts: "regény" 
    },
    {
        author: "Franz Kafka", 
        title: "Az átváltozás",
        concepts: "kisregény", 
        concepts2: "groteszk" 
    }
];

// renderColspanBody(makeTableBodyWithHeader(colspanHeaderArr), colspanBodyArr)
// renderRowspanBody(makeTableBodyWithHeader(rowspanHeaderArr), rowspanBodyArr);

class Table{
    #tbody;

    get tbody(){
        return this.#tbody
    }

    /**
     * @param {HeaderType[]} tableHeaderArr 
     */
    constructor(tableHeaderArr){
        this.#tbody = makeTableBodyWithHeader(tableHeaderArr);
    }

    ujMetod(param){
        param(this.#tbody)
    }
}

class ColspanTable extends Table{
    /**
     * @param {HeaderType[]} tableHeaderArr 
     */
    constructor(tableHeaderArr){
        super(tableHeaderArr)
    }
    /**
     * @param {ColspanRowType[]} colspanBodyArr
     */
    render(colspanBodyArr){
        renderColspanBody(this.tbody, colspanBodyArr);
    }
}

class RowspanTable extends Table{
    /**
     * @param {HeaderType[]} tableHeaderArr 
     */
    constructor(tableHeaderArr){
        super(tableHeaderArr);
    }
    /**
     * @param {RowspanRowType[]} rowspanBodyArr
     */
    render(rowspanBodyArr){
        renderRowspanBody(this.tbody, rowspanBodyArr)
    }
}

const colspanTable = new ColspanTable(colspanHeaderArr);
document.body.appendChild(document.createElement("br"))
const rowspanTable = new RowspanTable(rowspanHeaderArr);
colspanTable.render(colspanBodyArr)
rowspanTable.render(rowspanBodyArr);

document.body.appendChild(document.createElement("br"));

const button = document.createElement("button")
button.innerText = "Rowspan Hozzáadas";
document.body.appendChild(button)

document.body.appendChild(document.createElement("br"));
document.body.appendChild(document.createElement("br"))

button.addEventListener("click", onButtonClick.bind(rowspanTable));




/**
 * @this {rowspanTable}
 */
function onButtonClick(){
    /**
     * @type {RowspanRowType}
     */
    const obj ={
        author: "Franz Kafka",
        title1: "A per", 
        concepts1: "képvers", 
        title2: "Az átvlátozás", 
        concepts2: "kisregény" 
    }
    this.ujMetod(function(body){
        const tr = document.createElement("tr");

        const td1 = document.createElement("td")
        td1.innerText = obj.author;
        td1.rowSpan = 2
        tr.appendChild(td1);
        
        const td2 = document.createElement("td");
        td2.innerText = obj.title1
        tr.appendChild(td2);

        const td3 = document.createElement("td")
        td3.innerText = obj.concepts1;
        tr.appendChild(td3)

        body.appendChild(tr);

        const tr2 = document.createElement("tr")
        const td4 = document.createElement("td");
        td4.innerText = obj.title2
        tr2.appendChild(td4)

        const td5 = document.createElement("td");
        td5.innerText = obj.concepts2;
        tr2.appendChild(td5)

        body.appendChild(tr2);
    })
}






const button2 = document.createElement("button");
button2.innerText = "Colspan Hozzáadás"
document.body.appendChild(button2);
button2.addEventListener("click", onButtonClick2.bind(colspanTable))

/**
 * @this {colspanTable}
 */
function onButtonClick2(){
    /**
     * @type {ColspanRowType}
     */
    const obj = {
        author: "Thomas Mann", 
        title: "Mario és a varázsló", 
        concepts: "Kisregény"
    };
    this.ujMetod(function(body){
        const tr = document.createElement("tr")

        const td1 = document.createElement("td");
        td1.innerText = obj.author
        tr.appendChild(td1);
        
        const td2 = document.createElement("td")
        td2.innerText = obj.title;
        tr.appendChild(td2)

        const td3 = document.createElement("td");
        td3.innerText = obj.concepts
        td3.colSpan = "2";
        tr.appendChild(td3)

        body.appendChild(tr);
    })
}