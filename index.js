const addBtn = document.getElementById('add-btn');
const studentID = document.getElementById('student-id');
const studentName = document.getElementById('student-name');
const studentClass = document.getElementById('student-class');
const studentGrade = document.getElementById('student-grade');
const studentList = document.getElementById('student-list');
const searchInput = document.getElementById('search-input');
const averageGrades = document.getElementById('average-grade');
const sortBtn = document.getElementById('sort-btn');
const clearBtn = document.getElementById('clear-btn');
let students = JSON.parse(localStorage.getItem('students')) || []; // 'students' just the key which depend on the name has been set in localStorage.setItem so because i will set the key name 'student' so it is 'students'
let average = averageGrade();
averageGrades.textContent = average;


students.forEach(function(student) { // for each of the loop, loop 1: student parameter = students[0], loop 2: student parameter = students[1],... (only has element to render out when the user save to students variable or if user doesn't save any data in the previous use, it renders out 0 element)
    renderStudentList(student);
})

addBtn.addEventListener('click', function() {
    let studentIDValue = studentID.value;
    studentID.value = "";
    let studentNameValue = studentName.value;
    studentName.value = "";
    let studentClassValue = studentClass.value;
    studentClass.value = "";
    let studentGradeValue = studentGrade.value;
    studentGrade.value = "";
    let studentGradeNumber = Number(studentGradeValue);
    if (studentIDValue === "" || studentNameValue === "" || studentClassValue === "" || studentGradeValue === "" || isNaN(studentGradeValue) || studentGradeValue < 0) {
        return alert("Please don't let the input field empty");
    }
    let newStudent = {
        id: studentIDValue,
        name: studentNameValue,
        class: studentClassValue,
        grade: studentGradeNumber
    }
    students.push(newStudent);
    average = averageGrade();
    averageGrades.textContent = average;
    localStorage.setItem('students', JSON.stringify(students));
    renderStudentList(newStudent);
})

function renderStudentList(studentObject) {
    let newTr = document.createElement('tr');
    let newTdId = document.createElement('td');
    let newTdName = document.createElement('td');
    let newTdClass = document.createElement('td');
    let newTdGrade = document.createElement('td');
    newTdId.textContent = studentObject.id;
    newTdName.textContent = studentObject.name;
    newTdClass.textContent = studentObject.class;
    newTdGrade.textContent = studentObject.grade;
    newTr.appendChild(newTdId);
    newTr.appendChild(newTdName);
    newTr.appendChild(newTdClass);
    newTr.appendChild(newTdGrade);
    studentList.appendChild(newTr);
}

searchInput.addEventListener('input', function() {
    let searchValue = searchInput.value;
    let listToRender;
    if (searchValue === "") {
        listToRender = students;
    } else {
        listToRender = students.filter((student) => {
        return student.name.toLowerCase().includes(searchValue.toLowerCase())
    })
    }
    studentList.innerHTML = "";
    listToRender.forEach((student) => {
        renderStudentList(student)
    })
})


function averageGrade() {
    if (students.length === 0) {
        return 0;
    }
    let total = students.reduce((accumulator, currentItem) => {
        return accumulator + currentItem.grade; // in the first loop the accumulator = 0 (initalValue) after that it will contain the return value of accumulator + currentItem.grade (ex: 0 + 8 = 8 -> accumulator = 8)
    }, 0)
    let result = total / students.length;
    return result.toFixed(1);
}

sortBtn.addEventListener('click', function() {
    let gradeSort = students.sort((a, b) => {
        return a.grade - b.grade;
    })
    studentList.innerHTML = "";
    gradeSort.forEach((student) => {
        renderStudentList(student);
    })
})

clearBtn.addEventListener('click', function() {
    localStorage.removeItem('students');
    students = [];
    studentList.innerHTML = "";
    average = averageGrade();
    averageGrades.textContent = average; 
})