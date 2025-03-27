import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid gray" }}>
      <Link to="/">Signup</Link> | 
      <Link to="/login"> Login</Link> | 
      <Link to="/profile-complete"> Profile</Link> | 
      <Link to="/referrals"> Referrals</Link> | 
      <Link to="/referral-report"> Report</Link>
    </nav>
  );
};

export default Navbar;
