//F1
function BlogPost (title, author, content) {
    this.title = title;
    this.author = author;
    this.content = content;
}

//F2
function SponsoredPost(title, author, content, sponsorName) {
    BlogPost.call(this, title, author, content);
    this.sponsorName = sponsorName;
}

SponsoredPost.prototype = Object.create(BlogPost.prototype);
SponsoredPost.prototype.constructor = SponsoredPost;

SponsoredPost.prototype.display = function(){
    console.log(this.title + " " + this.sponsorName)
}

//F3
class Logger {
    #history;

    constructor() {
        this.#history = [];
    }

    get history() {
        return this.#history;
    }

    log(message) {
        this.#history.push(message);
    }
}

//F4
class AdvancedLogger extends Logger {
    #maxSize;

    constructor(maxSize) {
        super();
        this.#maxSize = maxSize;
    }

    processWithCallback(callback) {
        this.history.forEach(callback);
    }
}


//F5
function clickOnButton() {
    this.askSomething();
}

//button.addEventListener('click', clickOnButton.bind(stu1));