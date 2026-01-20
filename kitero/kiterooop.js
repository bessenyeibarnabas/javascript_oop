class Student{
    constructor(name){
        this.name = "Én(2)";
        this.askedQuestionNumber = 0;
    }
    askQuestion(){
        console.log("???");
        this.askedQuestionNumber++;
    }
}

class StudentWithWork extends Student{
    constructor(name){
        super(name)
        this.workDone = 0;
    }
    doWork(){
        console.log("*does work*");
        this.workDone++;
    }
}

const student = new Student("Nem Én(2)");

console.log(student)
student.askQuestion()
console.log(student)

const student2 = new StudentWithWork("Ez Sem Én (2)");

console.log(student2)
student2.doWork()
student2.askQuestion()
console.log(student2)