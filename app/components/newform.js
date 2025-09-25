import { useState } from "react";

export default function SimpleForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted!");
  };

  return (
    <div style={{ maxWidth: "400px", margin: "20px auto" }}>
      <h2>Contact Form</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <label>Message:</label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          style={{ display: "block", width: "100%", marginBottom: "10px" }}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}//simple form