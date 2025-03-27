import { useEffect, useState } from "react";
import axios from "axios";

const Referrals = () => {
  const [referrals, setReferrals] = useState([]);
  const [referrerId, setReferrerId] = useState("");

  useEffect(() => {
    const storedReferrerId = localStorage.getItem("referrerId");
    if (storedReferrerId) {
      setReferrerId(storedReferrerId);
      fetchReferrals(storedReferrerId);
    }
  }, []);

  const fetchReferrals = async (id) => {
    if (!id.trim()) {
      alert("Please enter a valid Referrer ID!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:8080/referrals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReferrals(response.data);
    } catch (error) {
      alert(error.response?.data || "Failed to fetch referrals!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Your Referrals</h2>

      {/* Input for Referrer ID */}
      <input
        type="text"
        placeholder="Enter Referrer ID"
        value={referrerId}
        onChange={(e) => setReferrerId(e.target.value)}
        style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
      />
      <br />
      <button 
        onClick={() => fetchReferrals(referrerId)}
        style={{ padding: "10px 20px", cursor: "pointer", marginBottom: "20px" }}
      >
        Fetch Referrals
      </button>

      {/* Display referrals */}
      {referrals.length > 0 ? (
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "left" }}>
          {referrals.map((ref, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "10px", borderRadius: "5px" }}>
              <p><strong>Name:</strong> {ref.name}</p>
              <p><strong>Email:</strong> {ref.email}</p>
              <p><strong>Password:</strong> {ref.password}</p>
              <p><strong>Referral Code:</strong> {ref.referralCode}</p>
              <p><strong>Profile Completed:</strong> {ref.profileCompleted ? "✅ Yes" : "❌ No"}</p>

              {/* Display referredBy if available */}
              {ref.referredBy && (
                <div style={{ marginTop: "10px", padding: "10px", background: "#f9f9f9", borderRadius: "5px" }}>
                  <h4>Referred By:</h4>
                  <p><strong>Name:</strong> {ref.referredBy.name}</p>
                  <p><strong>Email:</strong> {ref.referredBy.email}</p>
                  <p><strong>Referral Code:</strong> {ref.referredBy.referralCode}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No referrals found.</p>
      )}
    </div>
  );
};

export default Referrals;
