import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    referralCode: "",
  });

  const [responseData, setResponseData] = useState(null);

  // Load response data from localStorage when the component mounts
  useEffect(() => {
    const storedData = localStorage.getItem("signupData");
    if (storedData) {
      setResponseData(JSON.parse(storedData));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://reffral-code.onrender.com/signup", formData);
      setResponseData(response.data);

      // Store response data in localStorage
      localStorage.setItem("signupData", JSON.stringify(response.data));
    } catch (error) {
      alert("Signup Failed!");
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      referralCode: "",
    });

    // Clear response data from state and localStorage
    setResponseData(null);
    localStorage.removeItem("signupData");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Signup</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} required style={styles.input} />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required style={styles.input} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required style={styles.input} />
        <input type="text" name="referralCode" placeholder="Referral Code (optional)" value={formData.referralCode} onChange={handleChange} style={styles.input} />
        
        <div style={styles.buttonContainer}>
          <button type="submit" style={styles.button}>Signup</button>
          <button type="button" onClick={handleClear} style={{ ...styles.button, backgroundColor: "#ff4444" }}>Clear</button>
        </div>
      </form>

      {responseData && (
        <div style={styles.responseBox}>
          <h3>Signup Successful! 🎉</h3>
          <p><strong>ID:</strong> {responseData.id}</p>
          <p><strong>Name:</strong> {responseData.name}</p>
          <p><strong>Email:</strong> {responseData.email}</p>
          <p><strong>Password:</strong> {responseData.password}</p>
          <p><strong>Referral Code:</strong> {responseData.referralCode}</p>
          <p><strong>Profile Completed:</strong> {responseData.profileCompleted ? "Yes ✅" : "No ❌"}</p>
          
          <button onClick={handleClear} style={{ ...styles.button, backgroundColor: "#4caf50" }}>New Signup</button>
        </div>
      )}
    </div>
  );
};

// 💡 CSS-in-JS Styling
const styles = {
  container: {
    maxWidth: "400px",
    margin: "40px auto",
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0px 4px 8px rgba(0,0,0,0.2)",
    textAlign: "center",
  },
  heading: {
    color: "#ff7f50",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
    width: "100%",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
  },
  button: {
    padding: "10px",
    backgroundColor: "#ff7f50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    width: "48%",
  },
  responseBox: {
    marginTop: "20px",
    padding: "15px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    border: "1px solid #ddd",
    textAlign: "left",
  },
};

export default Signup;
