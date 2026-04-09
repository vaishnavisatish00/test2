import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ firstName: '', lastName: '', rollNo: '', contact: '' });

  // 1. Fetch Students (GET)
  const fetchStudents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/students');
      setStudents(res.data);
    } catch (err) { console.error("Backend not running?", err); }
  };

  useEffect(() => { fetchStudents(); }, []);

  // 2. Add Student (POST)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/students/add', form);
    setForm({ firstName: '', lastName: '', rollNo: '', contact: '' });
    fetchStudents();
  };

  // 3. Delete Student (DELETE)
  const deleteStudent = async (rollNo) => {
    await axios.delete(`http://localhost:5000/students/delete/${rollNo}`);
    fetchStudents();
  };

  return (
    <div style={{ padding: '30px' }}>
      <h2>Student Registration (MERN Stack)</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input placeholder="First Name" value={form.firstName} onChange={(e) => setForm({...form, firstName: e.target.value})} required /><br/><br/>
        <input placeholder="Last Name" value={form.lastName} onChange={(e) => setForm({...form, lastName: e.target.value})} required /><br/><br/>
        <input placeholder="Roll No" value={form.rollNo} onChange={(e) => setForm({...form, rollNo: e.target.value})} required /><br/><br/>
        <input placeholder="Contact" value={form.contact} onChange={(e) => setForm({...form, contact: e.target.value})} required /><br/><br/>
        <button type="submit">Add Student</button>
      </form>

      <table border="1" cellPadding="10">
        <thead>
          <tr><th>Full Name</th><th>Roll No</th><th>Contact</th><th>Action</th></tr>
        </thead>
        <tbody>
          {students.map(s => (
            <tr key={s.rollNo}>
              <td>{s.firstName} {s.lastName}</td>
              <td>{s.rollNo}</td>
              <td>{s.contact}</td>
              <td><button onClick={() => deleteStudent(s.rollNo)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;