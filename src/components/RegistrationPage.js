import React, { useState } from "react";
import axios from "axios";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaIdCard,
  FaUserShield,
  FaUserMd,
} from "react-icons/fa";

function RegistrationPage() {
  const [formData, setFormData] = useState({
    userType: "citizen",
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    certificationNumber: "",
    certificationType: "",
    field: "",
    experience: "",
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Name Validation: No digits allowed
    if (name === "name") {
      const lettersOnly = /^[A-Za-z\s]*$/;
      if (!lettersOnly.test(value)) return;
    }

    // Phone: Only digits allowed
    if (name === "phone") {
      const digitOnly = /^[0-9]*$/;
      if (!digitOnly.test(value)) return;
      if (value.length > 10) return;
    }

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Password Validation Function
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Name Check
    if (formData.name.trim().length < 2) {
      alert("Name must contain only letters and be at least 2 characters long.");
      return;
    }

    // Phone Number Check
    if (formData.phone.length !== 10) {
      alert("Phone number must be exactly 10 digits.");
      return;
    }

    // Password Strength Check
    if (!validatePassword(formData.password)) {
      alert(
        "Password must be at least 6 characters long and include letters, numbers, and at least one special character."
      );
      return;
    }

    // Confirm Password
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setLoading(true);

    try {
      const endpoint = `http://localhost:5000/api/${formData.userType}s/register`;

      const payload =
        formData.userType === "responder"
          ? {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
              certificationNumber: formData.certificationNumber,
              certificationType: formData.certificationType,
              field: formData.field,
              experience: formData.experience,
            }
          : {
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              password: formData.password,
            };

      const response = await axios.post(endpoint, payload);
      console.log("✅ Registration successful:", response.data);

      localStorage.setItem("userType", formData.userType);
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("userData", JSON.stringify(response.data));

      window.location.href = formData.userType === "responder" ? "/dashboard" : "/";
    } catch (error) {
      console.error("❌ Registration failed:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registration-page">
      <div className="page-header">
        <h1>Create Your Account</h1>
        <p>Join ResQNow to access emergency services</p>
      </div>

      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="userType">
            <FaUserShield className="form-icon" /> I am registering as a *
          </label>
          <select
            id="userType"
            name="userType"
            value={formData.userType}
            onChange={handleInputChange}
            required
          >
            <option value="citizen">Citizen</option>
            <option value="responder">Emergency Responder</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="name">
            <FaUser className="form-icon" /> Full Name *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your full name (letters only)"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">
            <FaEnvelope className="form-icon" /> Email *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">
            <FaPhone className="form-icon" /> Phone Number *
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Enter 10-digit phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <FaLock className="form-icon" /> Password *
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Min 6 chars incl letters, numbers & symbol"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">
            <FaLock className="form-icon" /> Confirm Password *
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        {formData.userType === "responder" && (
          <>
            <div className="form-group">
              <label htmlFor="certificationNumber">
                <FaIdCard className="form-icon" /> Certification Number *
              </label>
              <input
                type="text"
                id="certificationNumber"
                name="certificationNumber"
                placeholder="Enter your certification number"
                value={formData.certificationNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="certificationType">
                <FaUserMd className="form-icon" /> Certification Type *
              </label>
              <select
                id="certificationType"
                name="certificationType"
                value={formData.certificationType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select certification type</option>
                <option value="emt">EMT</option>
                <option value="paramedic">Paramedic</option>
                <option value="firefighter">Firefighter</option>
                <option value="police">Police Officer</option>
                <option value="nurse">Nurse</option>
                <option value="doctor">Doctor</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="field">
                <FaUserMd className="form-icon" /> Field (Optional)
              </label>
              <input
                type="text"
                id="field"
                name="field"
                placeholder="Enter your specialization"
                value={formData.field}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="experience">
                <FaUserMd className="form-icon" /> Years of Experience (Optional)
              </label>
              <input
                type="number"
                id="experience"
                name="experience"
                placeholder="Enter years of experience"
                value={formData.experience}
                onChange={handleInputChange}
              />
            </div>
          </>
        )}

        <button type="submit" className="register-btn" disabled={loading}>
          {loading ? "Registering..." : "Create Account"}
        </button>

        <div className="login-link">
          <p>
            Already have an account? <a href="/login">Sign in here</a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
