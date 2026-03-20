/**
 * @callback tableCallback;
 * @param {Author[]}
 * @returns {void}
 * @callback addElementResultCallback
 * @param {string} message
 * @returns {void}
 * @callback ImportResultCallback
 * @param {string}  message
 * @returns {void}
*/
class AuthorManager{
    /**
     * @type {Author[]}
     */
    #authorList;
    /**
     * @type {tableCallback}
     */
    #tableCallback;
    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback;

    #addElementResultCallback;
    constructor(){
        this.#authorList = [];
    }

    /**
     * @param {tableCallback} value 
     */
    set tableCallback(value){
        this.#tableCallback = value;
    }

    /**
     * @param {AuthorType} element
     */
    addElement(element){
        const author = new Author();
        author.id = this.#authorList.length;
        author.name = element.author;
        author.work = element.work;
        author.concept = element.concept;
        if(author.value()){
        this.#authorList.push(author);
        this.#addElementResultCallback("Sikeres adatfelvétel.")
        }
        else{
            this.#addElementResultCallback("Nem volt sikeres az elemfelvétel.")
        }
    }

    /**
     * 
     * @param {import(".").AuthorType[]} elementList 
     */
    addElementList(elementList){
        for (const element of elementList) {
            const author = new Author();
            author.name = element.author;
            author.work = element.work;
            author.concept = element.concept;
            author.concept = element.concept;
            if(author.value()){
                this.#authorList.push(author);
                this.#importResultCallback("Siker");
            }
            else{
                this.#importResultCallback("Sikertelen");
                break;
            }
        }
    }


    getAllElement(){
        this.#tableCallback(this.#authorList);
    }

    getExportstring(){
        const result = [];
        for(const author of this.#authorList){
            result.push(`${author.name};${author.work};${author.concept}`)
        }
        return result.join("\n");
    }

    /**
     * @param {addElementResultCallback} value 
     */
    set addElementResultCallback(value){
        this.#addElementResultCallback = value;
    }
    /**
     * @param {ImportResultCallback} value 
     */
    set importResultCallback(value){
        this.#importResultCallback = value;
    }
}
 
class Author{
    /**
     * @type {string}
     */
    #id;
        /**
     * @type {string}
     */
    #name;
        /**
     * @type {string}
     */
    #work;
        /**
     * @type {string}
     */
    #concept;

    get id(){
        return this.#id;
    }
    get name(){
        return this.#name;
    }
    get work(){
        return this.#work
    }
    get concept(){
        return this.#concept;
    }

    set id(value){
        this.#id = value;
    }
    
    set name(value){
        this.#name = value;
    }
    
    set work(value){
        this.#work = value;
    }
    
    set concept(value){
        this.#concept = value;
    }

    /**
     * @returns {boolean}
     */
    value(){
        return this.#name && this.#concept && this.#work;
    }
}

export {AuthorManager}