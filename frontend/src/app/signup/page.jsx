'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  city: Yup.string().required("City is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Lowercase letter is required")
    .matches(/[A-Z]/, "Uppercase letter is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/\W/, "Special character is required")
    .min(6, "Password must be at least 6 characters"),
  confirmPassword: Yup.string()
    .required("Confirm password is required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function SignUp() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: "",
      lastName: "",
      email: "",
      city: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: SignupSchema,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await axios.post(
          "http://localhost:5000/user/register", 
          values,
          { headers: { "Content-Type": "application/json" } }
        );

        toast.success("User registered successfully");
        resetForm();

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
        }

        router.push("/");
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">
          Create Account
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            className="w-full p-3 border rounded text-black"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            className="w-full p-3 border rounded text-black"
            value={formik.values.lastName}
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && (
            <p className="text-red-500 text-sm">{formik.errors.lastName}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-full p-3 border rounded text-black"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email && (
            <p className="text-red-500 text-sm">{formik.errors.email}</p>
          )}

          <input
            type="text"
            name="city"
            placeholder="City"
            className="w-full p-3 border rounded text-black"
            value={formik.values.city}
            onChange={formik.handleChange}
          />
          {formik.errors.city && (
            <p className="text-red-500 text-sm">{formik.errors.city}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border rounded text-black"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password && (
            <p className="text-red-500 text-sm">{formik.errors.password}</p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border rounded text-black"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
          />
          {formik.errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {formik.errors.confirmPassword}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  )
};