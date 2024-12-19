import React from "react";
import CollegeAdmissionForm from "./CollegeAdmissionForm"; // Assuming this is your form component

const AdmissionFormPage = () => {
  return (
    <div className="admission-form-page">
      <CollegeAdmissionForm /> {/* Only the form is displayed */}
    </div>
  );
};

export default AdmissionFormPage;
