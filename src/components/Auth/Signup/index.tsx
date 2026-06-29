"use client";

import Breadcrumb from "@/components/Common/Breadcrumb";
import { register } from "@/services/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

interface SignupForm {
  first_name: string;
  last_name: string;
  email: string;
  phone1: string;
  password: string;
  confirm_password: string;
  flat_no: string;
  wing: string;
  building: string;
  road: string;
  landmark: string;
}

type FieldProps = {
  label: string;
  name: keyof SignupForm;
  type?: string;
  placeholder: string;
  required?: boolean;
  value: string;
  error?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const Field = ({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  value,
  error,
  onChange,
}: FieldProps) => (
  <div className="mb-5">
    <label htmlFor={name} className="block mb-2.5 font-medium text-dark">
      {label} {required && <span className="text-red">*</span>}
    </label>

    <input
      type={type}
      name={name}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      autoComplete={type === "password" ? "on" : "off"}
      className={`rounded-lg border bg-gray-1 placeholder:text-dark-5 w-full py-3 px-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20 ${error ? "border-red" : "border-gray-3"
        }`}
    />

    {error && <p className="mt-1 text-sm text-red">{error}</p>}
  </div>
);

// ─── Component ────────────────────────────────────────────────────────────────

const Signup = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const [form, setForm] = useState<SignupForm>({
    first_name: "",
    last_name: "",
    email: "",
    phone1: "",
    password: "",
    confirm_password: "",
    flat_no: "",
    wing: "",
    building: "",
    road: "",
    landmark: "",
  });

  const [errors, setErrors] = useState<Partial<SignupForm>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateStep1 = () => {
    const newErrors: Partial<SignupForm> = {};

    if (!form.first_name.trim()) newErrors.first_name = "First name is required";
    if (!form.last_name.trim()) newErrors.last_name = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Invalid email address";
    }

    if (!form.phone1.trim()) {
      newErrors.phone1 = "Phone number is required";
    } else if (!/^\d{10}$/.test(form.phone1)) {
      newErrors.phone1 = "Enter valid 10-digit phone number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!form.confirm_password) {
      newErrors.confirm_password = "Please confirm your password";
    } else if (form.password !== form.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Partial<SignupForm> = {};

    if (!form.flat_no.trim()) newErrors.flat_no = "Flat / House no. is required";
    if (!form.building.trim()) newErrors.building = "Building name is required";
    if (!form.road.trim()) newErrors.road = "Road / Street is required";
    if (!form.landmark.trim()) newErrors.landmark = "Landmark is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setLoading(true);
    try {
      const { confirm_password, ...payload } = form;
      await register({
        ...payload,
        role_id: process.env.NEXT_PUBLIC_CUSTOMER_ROLE_ID!,
      });
      toast.success("Account created successfully! Please sign in.");
      router.push("/signin");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || err.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Breadcrumb title="Sign Up" pages={["Sign Up"]} />

      <section className="overflow-hidden py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <div className="max-w-[600px] w-full mx-auto rounded-xl bg-white shadow-1 p-4 sm:p-7.5 xl:p-11">
            <div className="text-center mb-8">
              <h2 className="font-semibold text-xl sm:text-2xl xl:text-heading-5 text-dark mb-1.5">
                Create an Account
              </h2>

              <p className="text-dark-5">
                {step === 1
                  ? "Enter your personal details"
                  : "Enter your delivery address"}
              </p>
            </div>

            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 1 ? "bg-dark text-white" : "bg-gray-2 text-dark-5"
                    }`}
                >
                  1
                </div>
                <span className="text-sm font-medium text-dark">Account</span>
              </div>

              <div className="h-px w-12 bg-gray-3" />

              <div className="flex items-center gap-2">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${step >= 2 ? "bg-dark text-white" : "bg-gray-2 text-dark-5"
                    }`}
                >
                  2
                </div>
                <span className="text-sm font-medium text-dark">Address</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {step === 1 && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Field
                      label="First Name"
                      name="first_name"
                      placeholder="Enter first name"
                      value={form.first_name}
                      error={errors.first_name}
                      onChange={handleChange}
                    />

                    <Field
                      label="Last Name"
                      name="last_name"
                      placeholder="Enter last name"
                      value={form.last_name}
                      error={errors.last_name}
                      onChange={handleChange}
                    />
                  </div>

                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={form.email}
                    error={errors.email}
                    onChange={handleChange}
                  />

                  <Field
                    label="Phone Number"
                    name="phone1"
                    type="tel"
                    placeholder="Enter 10-digit phone number"
                    value={form.phone1}
                    error={errors.phone1}
                    onChange={handleChange}
                  />

                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    placeholder="Create a password"
                    value={form.password}
                    error={errors.password}
                    onChange={handleChange}
                  />

                  <Field
                    label="Confirm Password"
                    name="confirm_password"
                    type="password"
                    placeholder="Re-enter your password"
                    value={form.confirm_password}
                    error={errors.confirm_password}
                    onChange={handleChange}
                  />

                  <button
                    type="button"
                    onClick={handleNext}
                    className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue mt-4"
                  >
                    Next: Add Address →
                  </button>
                </div>
              )}

              {step === 2 && (
                <div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                    <Field
                      label="Flat / House No."
                      name="flat_no"
                      placeholder="e.g. A-101"
                      value={form.flat_no}
                      error={errors.flat_no}
                      onChange={handleChange}
                    />

                    <Field
                      label="Wing"
                      name="wing"
                      placeholder="e.g. A, B, C"
                      required={false}
                      value={form.wing}
                      error={errors.wing}
                      onChange={handleChange}
                    />
                  </div>

                  <Field
                    label="Building Name"
                    name="building"
                    placeholder="Enter building name"
                    value={form.building}
                    error={errors.building}
                    onChange={handleChange}
                  />

                  <Field
                    label="Road / Street"
                    name="road"
                    placeholder="Enter road or street name"
                    value={form.road}
                    error={errors.road}
                    onChange={handleChange}
                  />

                  <Field
                    label="Landmark"
                    name="landmark"
                    placeholder="e.g. Near XYZ School"
                    value={form.landmark}
                    error={errors.landmark}
                    onChange={handleChange}
                  />

                  <div className="flex gap-4 mt-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="w-full flex justify-center font-medium text-dark bg-gray-2 border border-gray-3 py-3 px-6 rounded-lg ease-out duration-200 hover:bg-gray-3"
                    >
                      ← Back
                    </button>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex justify-center font-medium text-white bg-dark py-3 px-6 rounded-lg ease-out duration-200 hover:bg-blue disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </button>
                  </div>
                </div>
              )}

              <p className="text-center mt-6 text-dark-5">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-dark font-medium ease-out duration-200 hover:text-blue"
                >
                  Sign in Now
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;