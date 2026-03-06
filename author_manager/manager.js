/**
 * @callback tableCallback;
 * @param {Author[]}
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
    
    set tableCallback(value){
        this.#tableCallback = value
    }

    constructor(){
        this.#authorList = [];
    }

    /**
     * 
     * @param {import(".").AuthorType} element 
     */
    addElement(element){
        const author = new Author();
        author.is = this.#authorList.length;
        author.name = element.author;
        author.work = element.work
        author.concept = element.concept
        this.#authorList.push(author)
    }

    getAllElement(){
        this.#tableCallback(this.#authorList)
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
        return this.#id
    }

    get (){
        return this.#name
    }

    get work(){
        return this.#work
    }

    get concept(){
        return this.#concept
    }

    get value(){
        
    }
}
 
export {AuthorManager}