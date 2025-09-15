"use client";

import { useState } from "react";
import Link from "next/link";
import { signup, createUserProfile } from "../api/auth";


export default function SignupPage() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", confirmPassword: "" });
  const [profileForm, setProfileForm] = useState({
    phone_number: "",
    location: "",
    difficulty_level: "medium",
    exam_type: "technical",
    preferred_question_type: "MCQ",
    preferred_language: "Python",
    skills: [],
    experience_level: "Fresher",
    current_role: "Student",
    education_level: "DCA",
    cv_file: null,
    email: "",
    full_name: ""
  });
  const [step, setStep] = useState(1); // 1: signup, 2: profile
  const [profileStep, setProfileStep] = useState(1); // 1: profile part 1, 2: profile part 2
  const [error, setError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleProfileChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === "cv_file") {
      setProfileForm({ ...profileForm, cv_file: files[0] });
    } else if (name === "phone_number") {
      // Only allow numbers, max 10 digits
      const numeric = value.replace(/\D/g, "").slice(0, 10);
      setProfileForm({ ...profileForm, phone_number: numeric });
    } else {
      setProfileForm({ ...profileForm, [name]: value });
    }
  };

  function validatePassword(password) {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/.test(password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (!validatePassword(form.password)) {
      setError("Password must be at least 8 characters, include upper and lowercase, a number, and a special character.");
      return;
    }
    try {
      // const data = await signup({
      //   full_name: form.full_name,
      //   email: form.email,
      //   password: form.password,
      //   confirmPassword: form.confirmPassword
      // });
      // Prefill profile form
      // setProfileForm((prev) => ({ ...prev, email: data.user?.email || form.email, full_name: data.user?.full_name || form.full_name }));
      setStep(2);
    } catch (err) {
      setError("Signup failed");
    }
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileError("");
    // Validate PDF
    if (!profileForm.cv_file) {
      setProfileError("Please upload your resume (PDF only)");
      return;
    }
    if (profileForm.cv_file.type !== "application/pdf") {
      setProfileError("Resume must be a PDF file");
      return;
    }
    // Validate required fields
    if (!profileForm.email || !profileForm.full_name) {
      setProfileError("Email and Full Name are required");
      return;
    }
    // Validate phone number
    if (!/^\d{10}$/.test(profileForm.phone_number)) {
      setProfileError("Phone number must be exactly 10 digits");
      return;
    }
    setUploading(true);
    try {
      // Convert skills string to array before saving
      const skillsList = (profileForm.skills || "").split(",").map(s => s.trim()).filter(Boolean);
      const formData = new FormData();
      Object.entries({ ...profileForm, skills: skillsList }).forEach(([key, value]) => {
        if (key === "skills") {
          formData.append(key, JSON.stringify(value));
        } else if (key === "cv_file") {
          formData.append(key, value);
        } else {
          formData.append(key, value);
        }
      });
      // Log payload for debugging
      const debugPayload = { ...profileForm, skills: skillsList, cv_file: profileForm.cv_file?.name };
      console.log("Profile payload:", debugPayload);
      await createUserProfile(formData);
      alert("Profile submitted successfully!");
      // Optionally redirect or reset
    } catch (err) {
      setProfileError("Profile submission failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-white min-h-screen flex items-center justify-center py-8 px-4">
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-10 border border-gray-100">
  {step === 1 ? (
          <>
            <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  id="full_name"
                  type="text"
                  name="full_name"
                  placeholder="Enter your full name"
                  value={form.full_name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 text-black placeholder:text-gray-200 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-400 transition"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-lg shadow transition"
              >
                Sign Up
              </button>
            </form>
            {error && <p className="text-red-500 text-center mb-2">{error}</p>}
            <div className="text-center text-sm mt-6 text-gray-600">
              Already have an account?{' '}
              <Link href="/login" className="text-green-700 hover:underline font-medium">Login</Link>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center text-green-700 mb-10 tracking-tight">Complete Your Profile</h2>
            {profileStep === 1 && (
              <form onSubmit={e => { e.preventDefault(); setProfileStep(2); }}>
                <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                      <input
                        type="text"
                        name="full_name"
                        value={profileForm.full_name}
                        onChange={handleProfileChange}
                        required
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        required
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        name="phone_number"
                        value={profileForm.phone_number}
                        onChange={handleProfileChange}
                        required
                        maxLength={10}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                      <input
                        type="text"
                        name="location"
                        value={profileForm.location}
                        onChange={handleProfileChange}
                        required
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty Level</label>
                      <select
                        name="difficulty_level"
                        value={profileForm.difficulty_level}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      >
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Exam Type</label>
                      <select
                        name="exam_type"
                        value={profileForm.exam_type}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      >
                        <option value="technical">Technical</option>
                        <option value="non-technical">Non-Technical</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-end gap-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded-lg shadow transition text-lg"
                    onClick={() => setStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-8 rounded-lg shadow transition text-lg"
                  >
                    Next
                  </button>
                </div>
              </form>
            )}
            {profileStep === 2 && (
              <form onSubmit={handleProfileSubmit} className="">
                <div className="flex flex-col md:flex-row gap-0 md:gap-8">
                  <div className="flex-1 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Question Type</label>
                      <select
                        name="preferred_question_type"
                        value={profileForm.preferred_question_type}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      >
                        <option value="MCQ">MCQ</option>
                        <option value="Subjective">Subjective</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Language</label>
                      <select
                        name="preferred_language"
                        value={profileForm.preferred_language}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      >
                        <option value="Python">Python</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="Java">Java</option>
                        <option value="C++">C++</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Skills (comma separated)</label>
                      <input
                        type="text"
                        name="skills"
                        value={profileForm.skills}
                        onChange={handleProfileChange}
                        placeholder="e.g. Python, Data Analysis"
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Experience Level</label>
                      <select
                        name="experience_level"
                        value={profileForm.experience_level}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      >
                        <option value="Fresher">Fresher</option>
                        <option value="Experienced">Experienced</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Role</label>
                      <input
                        type="text"
                        name="current_role"
                        value={profileForm.current_role}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Education Level</label>
                      <input
                        type="text"
                        name="education_level"
                        value={profileForm.education_level}
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Resume (PDF only)</label>
                      <input
                        type="file"
                        name="cv_file"
                        accept="application/pdf"
                        onChange={handleProfileChange}
                        className="w-full px-4 py-2 text-black border border-gray-300 rounded-lg placeholder:text-gray-500"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-8 flex justify-between gap-4">
                  <button
                    type="button"
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-8 rounded-lg shadow transition text-lg"
                    onClick={() => setProfileStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-10 rounded-lg shadow transition text-lg"
                    disabled={uploading}
                  >
                    {uploading ? "Submitting..." : "Submit Profile"}
                  </button>
                </div>
              </form>
            )}
            {profileError && <p className="text-red-500 text-center mb-2">{profileError}</p>}
          </>
        )}
      </div>
    </div>
  );
}
