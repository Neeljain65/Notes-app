import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [profilePreviewImage, setProfilePreviewImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userMobile, setUserMobile] = useState("");
  const [userBio, setUserBio] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const registerUser = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("userBio", userBio);
      formData.append("userEmail", userEmail);
      formData.append("userMobile", userMobile);
      formData.append("userName", userName);
      formData.append("userPassword", userPassword);
      formData.append("profileImage", profileImage);

      const result = await axios.post(
        "http://localhost:6969/auth/signup",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log("Data: ", result);
      alert("User Entry Saved in Database");

    } catch (error) {
      console.log("Failed to Register User: ", error);
    }

  };

  return (
    <div className=" flex w-full items-center justify-center bg-[#f3f4f6]">
      <form className="flex h-full w-full max-w-[420px] flex-col gap-3 bg-white p-5" onSubmit={registerUser}>
        <h1 className="text-2xl font-black">Register</h1>
        <div className="flex items-start justify-center gap-4" >
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
              placeholder="John"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="flex flex-col items-start justify-center">
            <label className="font-bold" htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
              placeholder="Doe"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userBio">Bio</label>
          <textarea
            id="userBio"
            name="userBio"
            rows="3"
            className="mt-1 w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
            placeholder="Tell us something about yourself"
            required
            onChange={(e) => setUserBio(e.target.value)}
          ></textarea>

        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userEmail">Email</label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
            placeholder="your.email@example.com"
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userMobile">Mobile Number</label>
          <input
            type="number"
            id="userMobile"
            name="userMobile"
            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
            placeholder="0000000000"
            onChange={(e) => setUserMobile(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userName">UserName</label>
          <input
            type="text"
            id="userName"
            name="userName"
            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
            placeholder="johndoe123"
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="flex flex-col items-start justify-center">
          <label className="font-bold" htmlFor="userPassword">Password</label>
          <input
            type="password"
            id="userPassword"
            name="userPassword"
            className="w-full rounded-lg border p-2 focus:border-blue-500  focus:outline-none"
            placeholder="*********"
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mb-4 grid h-[200px] w-[200px] place-content-center overflow-hidden rounded-full border-2 border-dashed border-gray-300 bg-gray-50 text-2xl font-black">
            {/* 200 x 200 */}
            {profilePreviewImage == "" ? (
              <p className="text-sm font-bold text-gray-500">Profile Image</p>
            ) : (
              <img src={profilePreviewImage} alt="" className="" />
            )}
          </div>
          <label
            htmlFor="dropzone-file"
            className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
          >
            <div className="flex flex-col items-center justify-center pb-6 pt-5">
              <svg
                className="mb-4 h-8 w-8 text-gray-500 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2 "
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">
                  Click to Upload your profile image
                </span>
              </p>
              <input
                type="file"
                placeholder="File"
                accept="application/png"
                required
                id="dropzone-file"
                onChange={(e) => {
                  setProfilePreviewImage(
                    URL.createObjectURL(e.target.files[0]),
                  );
                  setProfileImage(e.target.files[0]);
                }}
                className="hidden"
              />
            </div>
          </label>
        </div>
        <button className="rounded-lg bg-blue-500 px-5 py-2 font-bold text-white hover:bg-blue-600">
          Register
        </button>
        <div className="text-sm">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
