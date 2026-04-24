import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    registrationNo: "",
    name: "",
    email: "",
    contact: "",
    course: "",
    batch: ""
  });

  const [editId, setEditId] = useState(null);

  const [filterReg, setFilterReg] = useState("");
  const [filterCourse, setFilterCourse] = useState("");
  const [filterBatch, setFilterBatch] = useState("");

  const API = "https://std-managment-system.onrender.com/api/students";

  // FETCH
  const fetchStudents = async () => {
    try {
      const res = await axios.get(API);
      setStudents(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // ADD / UPDATE
  const handleSubmit = async () => {
    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, form);
        setEditId(null);
      } else {
        await axios.post(API, form);
      }

      setForm({
        registrationNo: "",
        name: "",
        email: "",
        contact: "",
        course: "",
        batch: ""
      });

      fetchStudents();
    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const deleteStudent = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchStudents();
  };

  // EDIT
  const editStudent = (student) => {
    setForm({
      registrationNo: student.registrationNo || "",
      name: student.name || "",
      email: student.email || "",
      contact: student.contact || "",
      course: student.course || "",
      batch: student.batch || ""
    });
    setEditId(student._id);
  };

  const inputStyle = {
    padding: "12px",
    borderRadius: "12px",
    border: "1px solid #ddd",
    flex: "1 1 30%",
    outline: "none",
    boxShadow: "0 2px 5px rgba(0,0,0,0.05)"
  };

  const actionBtn = {
    padding: "6px 12px",
    borderRadius: "12px",
    border: "none",
    color: "white",
    cursor: "pointer",
    fontSize: "12px"
  };

  return (
    <div style={{
      background: "#f5f7fb",
      minHeight: "100vh",
      padding: "30px",
      fontFamily: "Segoe UI"
    }}>
      <div style={{
        maxWidth: "1100px",
        margin: "auto",
        background: "white",
        padding: "25px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)"
      }}>

        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
          🎓 Student Management Dashboard
        </h2>

        {/* FORM */}
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "12px",
          marginBottom: "20px"
        }}>
          <input placeholder="Reg No" value={form.registrationNo}
            onChange={(e) => setForm({ ...form, registrationNo: e.target.value })}
            style={inputStyle}
          />
          <input placeholder="Name" value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={inputStyle}
          />
          <input placeholder="Email" value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
          />
          <input placeholder="Contact" value={form.contact}
            onChange={(e) => setForm({ ...form, contact: e.target.value })}
            style={inputStyle}
          />
          <input placeholder="Course" value={form.course}
            onChange={(e) => setForm({ ...form, course: e.target.value })}
            style={inputStyle}
          />
          <input placeholder="Batch" value={form.batch}
            onChange={(e) => setForm({ ...form, batch: e.target.value })}
            style={inputStyle}
          />

          <button
            onClick={handleSubmit}
            style={{
              padding: "12px 20px",
              borderRadius: "30px",
              background: editId ? "#ff9800" : "#4CAF50",
              color: "white",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            {editId ? "Update" : "Add Student"}
          </button>
        </div>

        {/* FILTER */}
        <div style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px"
        }}>
          <input placeholder="Filter Reg No"
            onChange={(e) => setFilterReg(e.target.value)}
            style={inputStyle}
          />
          <input placeholder="Filter Course"
            onChange={(e) => setFilterCourse(e.target.value)}
            style={inputStyle}
          />
          <input placeholder="Filter Batch"
            onChange={(e) => setFilterBatch(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* HEADER */}
        <div style={{
          display: "flex",
          padding: "10px",
          fontWeight: "bold",
          borderBottom: "2px solid #eee"
        }}>
          <span style={{ width: "15%" }}>Reg</span>
          <span style={{ width: "15%" }}>Name</span>
          <span style={{ width: "20%" }}>Email</span>
          <span style={{ width: "15%" }}>Contact</span>
          <span style={{ width: "15%" }}>Course</span>
          <span style={{ width: "10%" }}>Batch</span>
          <span style={{ width: "10%" }}>Action</span>
        </div>

        {/* LIST */}
        {loading ? (
          <p style={{ textAlign: "center", marginTop: "20px" }}>
            🚀 Loading students...
          </p>
        ) : (
          students
            .filter(s =>
              (s.registrationNo || "").toLowerCase().includes(filterReg.toLowerCase()) &&
              (s.course || "").toLowerCase().includes(filterCourse.toLowerCase()) &&
              (s.batch || "").toLowerCase().includes(filterBatch.toLowerCase())
            )
            .map((s) => (
              <div key={s._id} style={{
                display: "flex",
                padding: "12px",
                borderBottom: "1px solid #eee",
                alignItems: "center"
              }}>
                <span style={{ width: "15%" }}>{s.registrationNo}</span>
                <span style={{ width: "15%" }}>{s.name}</span>
                <span style={{ width: "20%" }}>{s.email}</span>
                <span style={{ width: "15%" }}>{s.contact}</span>
                <span style={{ width: "15%" }}>{s.course}</span>
                <span style={{ width: "10%" }}>{s.batch}</span>

                <span style={{ width: "10%", display: "flex", gap: "5px" }}>
                  <button
                    onClick={() => editStudent(s)}
                    style={{ ...actionBtn, background: "#2196F3" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteStudent(s._id)}
                    style={{ ...actionBtn, background: "#f44336" }}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
}

export default App;