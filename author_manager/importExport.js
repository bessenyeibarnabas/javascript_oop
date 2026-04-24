import { AuthorManager } from "./manager.js";
import { ViewElement } from "./viewElement.js";

class ImportView extends ViewElement{ //def egy ImportView osztályt, ami leszármazik a ViewElementből
    /**
     * @type {AuthorManager}
     */
    #manager; //privát tulajdonság a managernek

    /**
     * 
     * @param {string} id 
     * @param {AuthorManager} manager 
     */
    constructor(id, manager){ //def a konstruktort
        super(id); //meghívjuk a szülőosztály konstruktorát az id-vel
        this.#manager = manager; //értékül adjuk a privát manager tulajdonságnak a bemeneti manager értékét
        const fileInput = document.createElement("input"); //létrehozunk egy input elemet
        fileInput.type = "file"; //az input elem típusát file-ra állítjuk
        this.div.appendChild(fileInput); //hozzáadjuk az input elemet a view div eleméhez
        const resultDiv = document.createElement("div"); //létrehozunk egy div elemet, amiben megjelenítjük az import eredményét
        this.div.appendChild(resultDiv); //hozzáadjuk az eredmény div elemét a view div eleméhez
        this.#manager.importResultCallback = (message) =>{ //beállítjuk a manager importResultCallback-jét egy függvényre, ami megkapja az import eredményét
            resultDiv.innerText = message; //az eredmény div elem szövegét beállítjuk a kapott import eredményre
            setTimeout(() =>{ //beállítunk egy időzítőt, ami 1.5 másodap múlva lefut
                resultDiv.innerText = ""; //és töröljük az eredmény div elem szövegét
            }, 1500) //1,5s múlva
        }
        fileInput.addEventListener("change", (e) =>{ //inout cahne esemény feliratkozás
            const file = e.target.files[0]; //a kiválasztott fájlt a file változóba helyezzük
            const reader = new FileReader(); //létrehozunk egy FileReader példányt, amivel beolvassuk a fájl tartalmát
            reader.readAsText(file, "UTF-8"); //a reader-t beállítjuk, hogy a fájlt szövegként olvassa be UTF-8 kódolással
            reader.onload = () =>{ //amikor a fájl beolvasása befejeződik, meghívódik ez a függvény
                /**
                 * @type {import("./index.js").AuthorType}
                 */
                const result = []; //def üres tömb
                const fileContent = reader.result; //a fájl tartalmát a fileContent változóba helyezzük
                const fileContentLines = fileContent.split("\n"); //a fájl tartalmát sorokra bontjuk a sortörés karakter mentén, és a sorokat egy tömbbe helyezzük
                for (const line of fileContentLines) { //végigiterálunk a fájl sorain
                    const data = line.split(";"); //a sort pontosvessző mentén bontjuk három részre, és ezeket egy tömbbe helyezzük
                    /**
                     * @type {import("./index.js").AuthorType}
                     */
                    const authorType = { //def egy AuthorType objektumot
                        author : data[0], //ahol az author a sor első p tart vég
                        work : data[1], //ahol a work a sor 2. pont v
                        concept : data[2], //a 2. pontosvessző u rész állítjuk

                    };
                    result.push(authorType);
                }
                this.#manager.addElementList(result);
            }
        })
        const exportButton = document.createElement("button"); // létrehoz g
        exportButton.innerText = "Export"; //szöveg
        this.div.appendChild(exportButton) //+add
        exportButton.addEventListener("click", () =>{ //export gomb click esemény
            const a = document.createElement("a"); // létrehozunk egy a elemet, amivel letöltjük az exportált fájlt
            const fileContent = this.#manager.getExportstring(); //a manager getExportstring() metódusával lekérjük az exportálandó fájl tartalmát, és a fileContent változóba helyezzük
            const file = new Blob([fileContent]); //létrehozunk egy Blob objektumot a fileContent tartalommal, ami a letöltendő fájl lesz
            const fileUrl = URL.createObjectURL(file); //létrehozunk egy URL-t a Blob objektumra, amit a letöltéshez használunk
            a.href = fileUrl; //az a elem href attribútumát beállítjuk a létrehozott URL-re
            a.download = "export.csv"; //az a elem download attribútumát beállítjuk a letöltendő fájl nevére
            a.click() //klikk az a ra
            URL.revokeObjectURL(a.href); //blob link url visszacvon
        })
    }
}

export {ImportView}