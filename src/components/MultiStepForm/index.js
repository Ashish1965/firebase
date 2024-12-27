"use client";
import React, { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/db/firebase";
import { IoMdPhotos } from "react-icons/io";

const MultiStepForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    dob: "",
    mobile: "",
    gender: "",
    category: "",
    github: "",
    leetcode: "",
    linkedin: "",
    instagram: "",
    localaddress: "",
    permanentaddress: "",
    city: "",
    state: "",
    school: "",
    college: "",
    jobtitle: "",
    company: "",
    profile: "",
  });

  //gender
  const [gender, setGender] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  //category
  const items = [
    { id: 1, name: "GEN" },
    { id: 2, name: "OBC" },
    { id: 3, name: "SC" },
    { id: 4, name: "ST" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Category");
  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item) => {
    setSelected(item.name);
    setIsOpen(false);
  };

  //profile
  const [media, setMedia] = useState();
  const imageUpload = async () => {
    const data = new FormData();
    data.append("file", media);
    data.append("upload_preset", "mystore");
    data.append("cloud_name", "dhmqusghb");
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dhmqusghb/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const res2 = await res.json();
    // console.log(res2.url);
    return res2.url;
  };

  // Check for local storage and fetch from Firebase if needed
  useEffect(() => {
    const storedEmailOrMobile = localStorage.getItem("contactInfo");
    if (storedEmailOrMobile) {
      fetchFormData(storedEmailOrMobile);
    }
  }, []);

  const fetchFormData = async (contactInfo) => {
    try {
      const docRef = doc(db, "users", contactInfo);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFormData(docSnap.data());
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleNext = () => setStep((prevStep) => prevStep + 1);
  const handleBack = () => setStep((prevStep) => prevStep - 1);

  const handleSubmit = async () => {
    try {
      const MediaUrl = await imageUpload();
      let stringToAdd = "s";

      // Position to add string
      let indexPosition = 4;

      // Using slice method to split string
      let newMediaUrl =
        MediaUrl.slice(0, indexPosition) +
        stringToAdd +
        MediaUrl.slice(indexPosition);
      formData.gender = gender;
      formData.category = selected;
      formData.profile = newMediaUrl;

      const { email, mobile, ...restData } = formData;

      // Store email or mobile in local storage
      const contactInfo = email || mobile;
      localStorage.setItem("contactInfo", contactInfo);

      // Store remaining data in Firebase
      await setDoc(doc(db, "users", contactInfo), restData);

      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  return (
    <div className="mt-12">
      {step === 1 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            About
          </h2>
          <div className="border-b border-gray-900/10 pb-12 flex justify-center gap-20">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      name="firstname"
                      value={formData.firstname}
                      onChange={handleChange}
                      type="text"
                      placeholder="First Name"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      type="text"
                      placeholder="Last Name"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Email
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      name="Email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      placeholder="Email"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Date Of Birth
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      type="text"
                      placeholder="DOB"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
              <div className="sm:col-span-4">
                <label
                  htmlFor="username"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Phone No
                </label>
                <div className="mt-2">
                  <div className="flex items-center rounded-md bg-white pl-3 outline outline-1 -outline-offset-1 outline-gray-300 focus-within:outline focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-indigo-600">
                    <input
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      type="text"
                      placeholder="Phone No"
                      className="block min-w-0 grow py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-semibold">Select Your Gender</h4>

              <div>
                <label className="flex  text-gray-700 rounded-md px-3 py-2 my-3  cursor-pointer ">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={handleGenderChange}
                    className="mr-2"
                  />
                  <i className="pl-2">Male</i>
                </label>

                <label className="flex  text-gray-700 rounded-md px-3 py-2 my-3  cursor-pointer ">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={handleGenderChange}
                    className="mr-2"
                  />
                  <i className="pl-2">Female</i>
                </label>

                <label className="flex text-gray-700 rounded-md px-3 py-2 my-3  cursor-pointer ">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={handleGenderChange}
                    className="mr-2"
                  />
                  <i className="pl-2">Other</i>
                </label>
              </div>
            </div>

            <div className="mt-12">
              <div className="relative z-10">
                <button onClick={toggleDropdown} className="font-semibold">
                  {selected}
                </button>
                {isOpen && (
                  <div>
                    {items.map((item) => (
                      <div key={item.id} onClick={() => handleSelect(item)}>
                        {item.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-end justify-end px-64 mt-7">
            
            <button
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            Social Media
          </h2>
          <div className="flex items-center justify-center flex-col w-full mt-12">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Github Profile
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="github"
                placeholder="github"
                value={formData.github}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Leetcode Profile
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="leetcode"
                placeholder="leetcode"
                value={formData.leetcode}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                LinkedIn Profile
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="linkedin"
                placeholder="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                InstaGram Profile
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="instagram"
                placeholder="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-64 mt-7">
            <button
              onClick={handleBack}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            Address
          </h2>
          <div className="flex items-center justify-center flex-col w-full mt-12">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Local Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="localaddress"
                placeholder="localaddress"
                value={formData.localaddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Permanent Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="permanentaddress"
                placeholder="permanentaddress"
                value={formData.permanentaddress}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                City
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="city"
                placeholder="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                State
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="state"
                placeholder="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-64 mt-7">
            <button
              onClick={handleBack}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            Education
          </h2>
          <div className="flex items-center justify-center flex-col w-full mt-12">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                School Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="school"
                placeholder="school"
                value={formData.school}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                College Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="college"
                placeholder="college"
                value={formData.college}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-64 mt-7">
            <button
              onClick={handleBack}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 5 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            Experience
          </h2>
          <div className="flex items-center justify-center flex-col w-full mt-12">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Job Title
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="jobtitle"
                placeholder="jobtitle"
                value={formData.jobtitle}
                onChange={handleChange}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Company Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="company"
                placeholder="company"
                value={formData.company}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-between px-64 mt-7">
            <button
              onClick={handleBack}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Prev
            </button>
            <button
              onClick={handleNext}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Next
            </button>
          </div>
        </div>
      )}
      {step === 6 && (
        <div>
          <h2 className=" font-semibold text-gray-900 text-center text-2xl">
            verification
          </h2>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block text-sm/6 font-medium text-gray-900"
            >
              Cover photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <IoMdPhotos
                  aria-hidden="true"
                  className="mx-auto size-12 text-gray-300"
                />
                <div className="mt-4 flex text-sm/6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(event) => setMedia(event.target.files[0])}
                    />
                  </label>
                  {/* <p className="pl-1">or drag and drop</p> */}
                </div>
                <p className="text-xs/5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between px-64 mt-7">
            <button
              onClick={handleBack}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Prev
            </button>
            <button
              onClick={handleSubmit}
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiStepForm;
