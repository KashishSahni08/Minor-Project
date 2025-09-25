'use client';
import React from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useFormik } from "formik";

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(/[a-z]/, "Lowercase letter is required")
    .matches(/[0-9]/, "Number is required")
    .matches(/\W/, "Special character is required")
    .min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    validateOnChange: false,
    onSubmit: async (values) => {
      try {
        const result = await axios.post(
          "http://localhost:5000/user/authenticate",
          values
        );

        toast.success("Login Successful");

        if (result.data.token) {
          localStorage.setItem("token", result.data.token);
          router.push("/");
        }
      } catch (err) {
        if (err.response) {
          if (err.response.status === 401) {
            toast.error("Invalid email or password");
          } else {
            toast.error(err.response.data.message || "Something went wrong");
          }
        } else {
          toast.error("Server not reachable");
        }
        console.error("Login error:", err);
      }
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Login
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4">
          Don’t have an account?{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => router.push("/signup")}
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
}
