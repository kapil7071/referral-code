import axios from "axios";

const ReferralReport = () => {
  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("token");

      // Corrected endpoint from "reportt" to "report"
      const response = await axios.get("https://reffral-code.onrender.com/referrals/report", {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob" // Ensures binary data is received correctly
      });

      // Create a URL for the blob data
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a temporary <a> element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "referral_report.csv");
      document.body.appendChild(link);
      link.click();

      // Clean up after download
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert("Download Failed! Please try again.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Download Referral Report</h2>
      <button 
        onClick={handleDownload}
        style={{ padding: "10px 20px", cursor: "pointer", backgroundColor: "#28a745", color: "white", border: "none", borderRadius: "5px" }}
      >
        Download CSV
      </button>
    </div>
  );
};

export default ReferralReport;
