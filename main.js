import inquirer from "inquirer";
import chalk from "chalk";
import { exit } from "process";
console.log(chalk.bgBlueBright("\t\t\t ****Welcome to Student Management System*****\n"));
let studentID = () => {
    let id = Math.floor(Math.random() * (100000 - 10000 + 1) + 10000);
    return id;
};
const courses = [
    { name: "HTML", fee: 2000 },
    { name: "CSS", fee: 3000 },
    { name: "JavaScript", fee: 4000 },
    { name: "TypeScript", fee: 7000 },
    { name: "Python", fee: 8500 },
];
//console.log(courses);
let students = [];
async function enrollStudent() {
    let StudentDetails = await inquirer.prompt([
        {
            name: "Details",
            message: "Please select option",
            type: "list",
            choices: ["Enroll", new inquirer.Separator(), "Status", "Exit"],
        },
    ]);
    if (StudentDetails.Details === "Enroll") {
        const answer = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: "Enter Student name:",
                validate: (value) => value.trim() !== "",
            },
        ]);
        const answer2 = await inquirer.prompt([
            {
                name: "course",
                type: "list",
                message: "Select the course to enroll in:",
                choices: courses.map((course) => course.name),
            },
        ]);
        const answer3 = await inquirer.prompt([
            {
                name: "balance",
                type: "number",
                message: "Enter the amount to pay:",
                validate: (value) => !isNaN(value),
            },
        ]);
        const course = courses.find((course) => course.name === answer2.course);
        let balance = answer3.balance;
        if (course) {
            console.log(`The tuition fee for this course is ${course.fee}.`);
            let student = students.find((student) => student.name === answer.name);
            if (!student) {
                student = {
                    name: answer.name,
                    id: studentID(),
                    balance: 0,
                    courses: [],
                };
                students.push(student);
            }
            if (balance < course.fee) {
                console.log("Insufficient balance. Please pay the tuition fees.");
                return;
            }
            else if (balance >= course.fee) {
                console.log("You have paid the tuition fees.");
                console.log(`\nYou have successfully enrolled in the ${answer2.course} course.\n`);
                balance -= course.fee;
                student.courses.push(answer2.course);
                console.log(`\nCongratulations! You have successfully enrolled in the ${answer2.course} course.\n`);
                student.balance = balance;
                console.log(`\nYour current balance is ${student.balance}.`);
                console.log(chalk.greenBright(`\n***Student Added Successfully***\n`));
                console.log(chalk.blueBright(`Student Name: ${answer.name}`));
                console.log(chalk.blueBright(`Student ID: ${student.id}`));
                console.log(chalk.blueBright(`Enrolled Course: ${answer2.course}`));
                console.log(chalk.blueBright(`Tuition Fee: ${course.fee}`));
                console.log(`\nYour current balance is ${student.balance}.`);
            }
            else {
                console.log(chalk.greenBright("\t\t Course not enrolled"));
            }
            enrollStudent();
            return;
        }
    }
    else if (StudentDetails.Details === "Status") {
        console.log(chalk.greenBright(`\n\t \t***Student Status***`));
        if (students.length === 0) {
            console.log(chalk.redBright("\t\t No students enrolled yet."));
            enrollStudent();
            return;
        }
        else {
            console.log(chalk.greenBright(`\t\t Total number of students enrolled: ${students.length}`));
            students.forEach((student) => {
                console.log(chalk.blueBright(`\n\t \t***Student Details:  ${student.name}, ID: ${student.id}`));
                console.log(chalk.blueBright(`Enrolled Courses: ${student.courses.join(", ")}`));
                console.log(chalk.blueBright(`Current Balance: ${student.balance}`));
            });
        }
        console.log(chalk.greenBright(`\n***Thank you for using our system!***\n`));
    }
    else if (StudentDetails.Details === "Exit") {
        exit();
    }
}
enrollStudent();
