document.addEventListener("DOMContentLoaded", loadStudents);

let addButton = document.getElementById("addbutton");

addButton.addEventListener("click", function (e) {
    e.preventDefault();
    let studentID = document.getElementById("sid").value.trim();
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let studentClass = document.getElementById("class").value.trim();
    let contact = document.getElementById("contact").value.trim();

    //  Empty Field Check
    if (!studentID || !name || !email || !studentClass || !contact) {
        alert("All fields are required!");
        return; // 
    }

    //  Student ID Must Be Digits Only
    if (!/^\d+$/.test(studentID)) {
        alert("Student Id must contain only digits!");
        return; //  Form Reset Nahi Hoga
    }
    // student only 4 digit validation
    if (studentID.length !== 4 || isNaN(studentID)) {
        alert("Maximum 4 digits are allowed for Student Id");
        return;
    }
     // **Name Validation (Only Characters Allowed)**
     if (!name.match(/^[A-Za-z]+$/)) {
        alert("Name is not vaild");
        return;
    }

    //  Contact Number Validation (10 Digits, No Negative)
    if (!/^\d{10}$/.test(contact)) {
        alert("Please enter a valid contact number!");
        return; 
    }

    //  Pehle Wale Students Ko Get Karna
    let students = JSON.parse(localStorage.getItem("students")) || [];

    //  Check If Student ID Already Exists
    let check_id = students.find(st => st.studentID === studentID);
    if (check_id) {
        alert("This id is  already exists! Please enter a unique ID.");
        return; // Form Reset Nahi Hoga
    }

    //  Student Data Object me loya gya hai
    let student = { studentID, name, email, studentClass, contact };

    //  Naya Student Add Karna
    students.push(student);

    //  Local Storage Me Save Karna
    localStorage.setItem("students", JSON.stringify(students));

    //  Display Updated Student List
    displayStudents();

    // **Sirf Valid Data Pe Hi Form Clear Hoga**
    document.getElementById("sid").value = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("class").value = "";
    document.getElementById("contact").value = "";
});

// Function To Show Students On Screen
function displayStudents() {
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let studentList = document.getElementById("student-list");
    studentList.innerHTML = "";

    students.forEach((student, index) => {

        let studentCard = document.createElement("div");
        studentCard.classList.add("student-card");

        studentCard.innerHTML = `
            <div class="student-info">
                <span>${student.studentID}</span>
                <span>${student.name}</span>
                <span>${student.email}</span>
                <span>${student.studentClass}</span>
                <span>${student.contact}</span>
                <span><button class="edit-btn" onclick="editStudent(${index})">Edit</button></span>
                <span><button class="delete-btn" onclick="deleteStudent(${index})">Delete</button></span>
            </div>
        `;

        studentList.appendChild(studentCard);
    });
}

//  Delete Student Function
function deleteStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

//  Edit Student Function
function editStudent(index) {
    let students = JSON.parse(localStorage.getItem("students"));
    let student = students[index];
    document.getElementById("sid").value = student.studentID;
    document.getElementById("name").value = student.name;
    document.getElementById("email").value = student.email;
    document.getElementById("class").value = student.studentClass;
    document.getElementById("contact").value = student.contact;

    deleteStudent(index);
}

// when page relode not remove on the screen  data
function loadStudents() {
    displayStudents();
}