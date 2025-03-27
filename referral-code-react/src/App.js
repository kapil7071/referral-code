import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Signup from "./component/Signup";
import ProfileComplete from "./component/ProfileComplete";
import Referrals from "./component/Referrals";
import ReferralReport from "./component/ReferralReport";

function App() {
  return (
    <Router>
      <div style={styles.container}>
        {/* Navigation Buttons */}
        <div style={styles.navbar}>
          <Link to="/" style={styles.button}>Signup</Link>
          <Link to="/profile-complete" style={styles.button}>Profile Completion</Link>
          <Link to="/referrals" style={styles.button}>Referrals</Link>
          <Link to="/referral-report" style={styles.button}>Report</Link>
        </div>

        {/* Page Routes */}
        <div style={styles.content}>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/profile-complete" element={<ProfileComplete />} />
            <Route path="/referrals" element={<Referrals />} />
            <Route path="/referral-report" element={<ReferralReport />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// 💡 Simple CSS-in-JS styling for a colorful UI
const styles = {
  container: {
    textAlign: "center",
    padding: "20px",
    backgroundColor: "#f4f4f4",
    minHeight: "100vh",
  },
  navbar: {
    display: "flex",
    justifyContent: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  button: {
    textDecoration: "none",
    backgroundColor: "#ff7f50",
    color: "white",
    padding: "10px 15px",
    borderRadius: "5px",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s",
  },
  buttonHover: {
    backgroundColor: "#ff4500",
  },
  content: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "80%",
    margin: "0 auto",
  },
};

export default App;
