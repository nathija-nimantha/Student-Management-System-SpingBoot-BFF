const backendUrl = 'http://localhost:8080';
const studentTableBody = document.getElementById('studentTableBody');
const addStudentBtn = document.getElementById('addStudentBtn');

//convert image file to Base64
function convertFileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64String = reader.result.split(',')[1];
            resolve(base64String);
        };
        reader.onerror = error => reject(error);
    });
}


//Fetch students
async function fetchStudents() {
    try {
        const response = await fetch(`${backendUrl}/get-student`);

        if (!response.ok) {
            console.error('Failed to fetch students');
            return;
        }

        const students = await response.json();
        studentTableBody.innerHTML = '';

        if (students.length === 0) {
            studentTableBody.innerHTML = '<tr><td colspan="7">No students found</td></tr>';
            return;
        }

        students.forEach(student => {
            const row = `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.dateOfBirth}</td>
                    <td>${student.guardianName}</td>
                    <td><img alt="Image" width="50" height="50" src="data:image/jpeg;base64,${student.image}" /></td>
                    <td>${student.crn}</td>
                    <td>
                        <button class="btn btn-warning btn-sm" onclick="editStudent(${student.id})">Edit</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteStudent(${student.id})">Delete</button>
                    </td>
                </tr>
            `;
            studentTableBody.innerHTML += row;
        });
    } catch (error) {
        console.error('Error fetching students:', error);
    }
}

//Clear all the fields
const clearFormBtn = document.getElementById('clearFormBtn');

clearFormBtn.addEventListener('click', function () {
    document.getElementById('studentForm').reset();
});

//Add student event
addStudentBtn.addEventListener('click', async function () {
    const studentData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('dob').value,
        guardianName: document.getElementById('guardianName').value,
        crn: document.getElementById('crn').value,
        image: ''
    };

    if (!studentData.id || !studentData.name || !studentData.dateOfBirth || !studentData.guardianName || !studentData.crn) {
        alert('Please fill out all fields except the image.');
        return;
    }

    const imageFile = document.getElementById('imageFile').files[0];
    
    if (imageFile && imageFile.size > 5 * 1024 * 1024) {
        alert('Image size exceeds 5MB. Please upload a smaller image.');
        return;
    }

    if (imageFile) {
        studentData.image = await convertFileToBase64(imageFile);
    } else {
        const response = await fetch(defaultImageUrl);
        const blob = await response.blob();
        const defaultImageBase64 = await convertFileToBase64(blob);
        studentData.image = defaultImageBase64;
    }

    try {
        const response = await fetch(`${backendUrl}/add-student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert('Student added successfully!');
            document.getElementById('studentForm').reset();
            fetchStudents();
        } else {
            alert('Failed to add student. Please try again.');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add student. Please try again.');
    }
});

//Delete student
async function deleteStudent(id) {
    try {
        const response = await fetch(`${backendUrl}/delete-student/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            alert('Student deleted successfully!');
            fetchStudents();
        } else {
            alert('Failed to delete student. Please try again.');
        }
    } catch (error) {
        console.error('Error deleting student:', error);
        alert('Failed to delete student. Please try again.');
    }
}

//Edit student
function editStudent(id) {
    fetch(`${backendUrl}/get-student/${id}`)
        .then(response => response.json())
        .then(student => {
            if (student) {
                document.getElementById('id').value = student.id;
                document.getElementById('name').value = student.name;
                document.getElementById('dob').value = student.dateOfBirth;
                document.getElementById('guardianName').value = student.guardianName;
                document.getElementById('crn').value = student.crn;
                addStudentBtn.removeEventListener('click', addStudentHandler);
                addStudentBtn.addEventListener('click', updateStudentHandler);
            }
        })
        .catch(error => console.error('Error fetching student for edit:', error));
}

async function addStudentHandler(e) {
    e.preventDefault();

    const studentData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('dob').value,
        guardianName: document.getElementById('guardianName').value,
        crn: document.getElementById('crn').value,
        image: ''
    };

    const imageFile = document.getElementById('imageFile').files[0];
    if (imageFile) {
        studentData.image = await convertFileToBase64(imageFile);
    }

    try {
        const response = await fetch(`${backendUrl}/add-student`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert('Student added successfully!');
            document.getElementById('studentForm').reset();
            fetchStudents();
        } else {
            alert('Failed to add student. Please try again.');
        }
    } catch (error) {
        console.error('Error adding student:', error);
        alert('Failed to add student. Please try again.');
    }
}

//Update student
async function updateStudentHandler(e) {
    e.preventDefault();

    const studentData = {
        id: document.getElementById('id').value,
        name: document.getElementById('name').value,
        dateOfBirth: document.getElementById('dob').value,
        guardianName: document.getElementById('guardianName').value,
        crn: document.getElementById('crn').value,
        image: ''
    };

    const imageFile = document.getElementById('imageFile').files[0];
    if (imageFile) {
        studentData.image = await convertFileToBase64(imageFile);
    }

    try {
        const response = await fetch(`${backendUrl}/update-student`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        if (response.ok) {
            alert('Student updated successfully!');
            document.getElementById('studentForm').reset();
            fetchStudents();

            addStudentBtn.removeEventListener('click', updateStudentHandler);
            addStudentBtn.addEventListener('click', addStudentHandler);
        } else {
            alert('Failed to update student. Please try again.');
        }
    } catch (error) {
        console.error('Error updating student:', error);
        alert('Failed to update student. Please try again.');
    }
}

fetchStudents();
