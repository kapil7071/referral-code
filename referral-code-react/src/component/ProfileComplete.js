import axios from "axios";
import { useState } from "react";

const ProfileComplete = () => {
  const [userId, setUserId] = useState("");

  const handleCompleteProfile = async () => {
    if (!userId.trim()) {
      alert("Please enter a valid User ID!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `https://reffral-code.onrender.com/profile/complete/${userId}`, 
        {}, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert(response.data.message || "Profile completed successfully!");
    } catch (error) {
      alert(error.response?.data?.error || "Profile Update Failed!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Profile Completion</h2>
      <input 
        type="text" 
        placeholder="Enter User ID" 
        value={userId} 
        onChange={(e) => setUserId(e.target.value)}
        style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
      />
      <br />
      <button 
        onClick={handleCompleteProfile}
        style={{ padding: "10px 20px", cursor: "pointer" }}
      >
        Complete Profile
      </button>
    </div>
  );
};

export default ProfileComplete;
