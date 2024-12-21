import React, { useState } from "react";
import { createUser } from "../../services/api";
import { validateEmail, validateCanadianPhone, validatePassword, validateFullName, validateDay, validateMonth, validateYear, validateConfirmPassword } from "../../utils/validations";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    contact_number: "",
    email: "",
    day: "",
    month: "",
    year: "",
    password: "",
    confirm_password: "",
  });

  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState({});

  const validate = () => {
    const newErrors = {};
    const { full_name, contact_number, email, day, month, year, password, confirm_password } = formData;

    if (!validateFullName(full_name)) newErrors.full_name = "Full name is required and should not contain symbols";
    if (!validateCanadianPhone(contact_number)) newErrors.contact_number = "Invalid contact number";
    if (!validateEmail(email)) newErrors.email = "Invalid email address";
    if (!validateDay(day)) newErrors.day = "Invalid day";
    if (!validateMonth(month)) newErrors.month = "Invalid month";
    if (!validateYear(year)) newErrors.year = "Invalid year";
    if (!validatePassword(password)) newErrors.password = "Password must be at least 8 characters long and include lower case, upper case, and numbers";
    if (!validateConfirmPassword(password, confirm_password)) newErrors.confirm_password = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      const date_of_birth = `${formData.day}-${formData.month}-${formData.year}`;
      const userData = { 
        full_name: formData.full_name,
        contact_number: formData.contact_number,
        email: formData.email,
        date_of_birth: date_of_birth,
        password: formData.password
      };

      try {
        const response = await createUser(userData);
        setAlert({ type: "success", message: response.data.message });
      } catch (error) {
        setAlert({ type: "error", message: error.response.data.message || "Failed to create user" });
      }
    }
  };

  const handleCancel = () => {
    setFormData({
      full_name: "",
      contact_number: "",
      email: "",
      day: "",
      month: "",
      year: "",
      password: "",
      confirm_password: "",
    });
    setErrors({});
    setAlert({});
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const years = Array.from({ length: 125 }, (_, i) => 1900 + i);

  return (
    <div>
      <div className="top-bar">
        <span><img decoding="async" src="https://628217dc.rocketcdn.me/wp-content/uploads/2023/10/idea_theorem_logo-02.svg" alt="" /></span>
      </div>
      <h3 className="formHeading">Create User Account</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Full Name</label>
          <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} />
          {errors.full_name && <span>{errors.full_name}</span>}
        </div>
        <div>
          <label>Contact Number</label>
          <input type="text" name="contact_number" value={formData.contact_number} onChange={handleChange} />
          {errors.contact_number && <span>{errors.contact_number}</span>}
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span>{errors.email}</span>}
        </div>
        <div>
          <label>Date of Birth</label>
          <select name="day" value={formData.day} onChange={handleChange}>
            <option value="">Day</option>
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <select name="month" value={formData.month} onChange={handleChange}>
            <option value="">Month</option>
            {months.map((month, index) => <option key={index} value={index + 1}>{month}</option>)}
          </select>
          <select name="year" value={formData.year} onChange={handleChange}>
            <option value="">Year</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
          {errors.day && <span>{errors.day}</span>}
          {errors.month && <span>{errors.month}</span>}
          {errors.year && <span>{errors.year}</span>}
        </div>
        <div>
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} />
          {errors.password && <span>{errors.password}</span>}
        </div>
        <div>
          <label>Confirm Password</label>
          <input type="password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} />
          {errors.confirm_password && <span>{errors.confirm_password}</span>}
        </div>
        <button type="button" onClick={handleCancel}>Cancel</button>
        <button type="submit">Submit</button>
        {alert.message && <div className={`alert ${alert.type}`}>{alert.message}</div>}
      </form>
    </div>
  );
};

export default RegistrationForm;