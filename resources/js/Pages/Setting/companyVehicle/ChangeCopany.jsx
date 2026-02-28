import React, { useEffect, useState } from "react";
import axios from "axios";

function ChangeCompany() {
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Fetch all companies
  useEffect(() => {
    axios.get("/setting/companies") // Replace with your API URL
      .then((response) => setCompanies(response.data))
      .catch((error) => console.error("Error fetching companies:", error));
  }, []);

  // Handle company change
  const handleCompanyChange = (event) => {
    setSelectedCompany(event.target.value);
  };

  // Handle submit
  const handleSubmit = () => {
    if (!selectedCompany) return alert("Please select a company");

    axios.post("/api/change-company", { companyId: selectedCompany }) // Replace with your API
      .then(() => alert("Company changed successfully!"))
      .catch((error) => console.error("Error changing company:", error));
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2">Change Company</h2>
      
      {/* Custom Select */}
      <select
        value={selectedCompany || ""}
        onChange={handleCompanyChange}
        className="w-full p-2 border border-gray-300 rounded-lg"
      >
        <option value="" disabled>Select a company</option>
        {companies.map((company) => (
          <option key={company.id} value={company.id}>
            {company.name}
          </option>
        ))}
      </select>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Change Company
      </button>
    </div>
  );
}

export default ChangeCompany;
