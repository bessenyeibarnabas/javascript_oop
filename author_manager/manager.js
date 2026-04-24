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
class AuthorManager{ //def az authormanager osztályt
    /**
     * @type {Author[]}
     */
    #authorList; //privát tulajdonság a szerzők listájának
    /**
     * @type {tableCallback}
     */
    #tableCallback; //privát tulajdonság a table callback-jének
    /**
     * @type {ImportResultCallback}
     */
    #importResultCallback; //privát tulajdonság az import eredmény callback-jének

    #addElementResultCallback; //privát tulajdonság az elem hozzáadás eredmény callback-jének
    constructor(){
        this.#authorList = [];
    }

    /**
     * @param {tableCallback} value 
     */
    set tableCallback(value){ //setter a table callback-hez
        this.#tableCallback = value; //értékül adjuk a privát table callback tulajdonságnak a bemeneti értéket
    }

    /**
     * @param {AuthorType} element
     */
    addElement(element){ //def egy addElement metódust, ami egy AuthorType-ot vár bemenetként
        const author = new Author(); //létrehozunk egy új Author példányt
        author.id = this.#authorList.length; //beállítjuk az id-jét a jelenlegi szerzők számával
        author.name = element.author; //beállítjuk a nevét a bemeneti elem author mezőjével
        author.work = element.work; //beállítjuk a művét a bemeneti elem work mezőjével
        author.concept = element.concept; //beállítjuk a konceptjét a bemeneti elem concept mezőjével
        if(author.value()){ //meghívjuk a validate (lásd author .validate) ha valid
        this.#authorList.push(author); //ha valid akkor hozzáadjuk a szerzők listájához
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
    addElementList(elementList){ //def egy addElementList metódust, ami egy AuthorType tömböt vár bemenetként
        for (const element of elementList) { //végigiterálunk a bemeneti listán
            const author = new Author(); //létrehozunk egy új Author példányt
            author.id = this.#authorList.length; //beállítjuk az id-jét a jelenlegi szerzők számával
            author.name = element.author; //beállítjuk a nevét a bemeneti elem author mezőjével
            author.work = element.work; //beállítjuk a művét a bemeneti elem work mezőjével
            author.concept = element.concept; //beállítjuk a konceptjét a bemeneti elem concept mezőjével
            author.concept = element.concept; //beállítjuk a konceptjét a bemeneti elem concept mezőjével
            if(author.value()){ //meghívjuk a validate (lásd author .validate) ha valid
                this.#authorList.push(author); //ha valid akkor hozzáadjuk a szerzők listájához
                this.#importResultCallback("Siker"); //és meghívjuk az import eredmény callback-jét a "Siker" üzenettel
            }
            else{
                this.#importResultCallback("Sikertelen"); //ha nem valid akkor meghívjuk az import eredmény callback-jét a "Sikertelen" üzenettel
                break;
            }
        }
    }


    getAllElement(){ //def a getAllElement fgv
        this.#tableCallback(this.#authorList); //meghívjuk a table callback-jét a szerzők listájával
    }

    getExportstring(){ //def a getExportstring fgv, ami visszaad egy stringet
        const result = []; //def üres tömb
        for(const author of this.#authorList){ //végigiterálunk a szerzők listáján
            result.push(`${author.name};${author.work};${author.concept}`) //a tömbhöz hozzáadunk egy stringet, ami a szerző nevét, művét és konceptjét tartalmazza, pontosvesszővel elválasztva
        }
        return result.join("\n"); //visszatérünk a tömb elemeinek egy stringjével, ahol az elemeket új sorral választjuk el
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
 
class Author{ //def egy author entitáns osztályt
    /**
     * @type {string}
     */
    #id; //privát tulajdonság az id-nek
        /**
     * @type {string}
     */
    #name; //privát tulajdonság a névnek
        /**
     * @type {string}
     */
    #work; //privát tulajdonság a műnek
        /**
     * @type {string}
     */
    #concept; //privát tulajdonság a konceptnek

    get id(){ //getter az id-hez
        return this.#id; //visszatérünk a privát id tulajdonsággal
    }
    get name(){ //getter a névhez
        return this.#name; //visszatérünk a privát név tulajdonsággal
    }
    get work(){ //getter a műhöz
        return this.#work //visszatérünk a privát mű tulajdonsággal
    }
    get concept(){ //getter a koncepthez
        return this.#concept; //visszatérünk a privát koncept tulajdonsággal
    }

    set id(value){ //setter az id-hez
        this.#id = value; //beállítjuk a privát id tulajdonság értékét a bemeneti értékre
    }
    
    set name(value){ //setter a névhez
        this.#name = value; //beállítjuk a privát név tulajdonság értékét a bemeneti értékre
    }
    
    set work(value){ //setter a műhöz
        this.#work = value; //beállítjuk a privát mű tulajdonság értékét a bemeneti értékre

    }
    
    set concept(value){ //setter a koncepthez
        this.#concept = value; //értékül adjuk a privát koncept tulajdonságnak a bemeneti értéket
    }

    /**
     * @returns {boolean}
     */
    value(){ //def egy value metódust, ami boolean értékkel tér vissza
        return this.#name && this.#concept && this.#work; // ha mindennek helyes értéke van akkor I- tér vissza, egyébként H
    }
}

export {AuthorManager}