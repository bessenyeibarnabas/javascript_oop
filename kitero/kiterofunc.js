function Student(name){
    this.name = name;
    this.askedQuestionNumber = 0;
}

Student.prototype.askQuestion = function(){
    console.log("???");
    this.askedQuestionNumber++;
}
const student1 = new Student("Én");
console.log(student1)
student1.askQuestion();
console.log(student1)

const student2 = new Student("Nem Én")
console.log(student2)

function StudentWithWork(name){
    Student.call(this, name);
    this.workDone = 0;
}

StudentWithWork.prototype.doWork = function(){
    this.workDone++;
}

Object.setPrototypeOf(StudentWithWork.prototype, Student.prototype)

const student3 = new StudentWithWork("Ez Sem Én")
student3.askQuestion()
console.log(student3)

student3.doWork();
console.log(student3)