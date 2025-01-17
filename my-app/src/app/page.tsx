"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

export default function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const onSubmit = (data: any) => {
    if (editingUserId) {
      // Edit existing user
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === editingUserId ? { ...user, ...data } : user
        )
      );
      setNotification("User updated successfully!");
      setEditingUserId(null); // Reset editing state
    } else {
      // Add new user
      const userWithId = { id: uuidv4(), ...data };
      setUsers([...users, userWithId]);
      setNotification("User added successfully!");
    }
    reset();
    setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
  };

  const handleEdit = (user: any) => {
    setEditingUserId(user.id);
    setValue("fullName", user.fullName);
    setValue("email", user.email);
    setValue("age", user.age);
    setValue("gender", user.gender);
    setValue("address", user.address);
  };

  const handleDelete = (userId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      setUsers(users.filter((user) => user.id !== userId));
      setNotification("User deleted successfully!");
      setTimeout(() => setNotification(null), 3000); // Clear notification after 3 seconds
    }
  };

  const handleReset = () => {
    reset();
    setEditingUserId(null);
  };

  return (
    <div className="min-h-screen bg-[url('https://imgv3.fotor.com/images/share/Free-blue-gradient-pattern-background-from-Fotor.jpg')] bg-cover bg-center p-4">
      <div className="max-w-lg mx-auto bg-gray-100 shadow-md rounded-lg p-6 relative">
        {notification && (
          <div className="absolute top-4 right-2 bg-green-500 text-white py-1 px-3 rounded-lg shadow-lg animate-fade">
            {notification}
          </div>
        )}

        <h1 className="text-2xl font-bold mb-4 text-center text-gray-700">
          {editingUserId ? "Edit User Information" : "User Information Form"}
        </h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4 animate-slide-in"
        >
          {/* Full Name */}
          <div>
            <label className="block font-medium text-gray-700">Full Name</label>
            <input
              type="text"
              {...register("fullName", {
                required: "Name is required",
                minLength: {
                  value: 3,
                  message: "Name must be at least 3 characters",
                },
              })}
              className={`w-full border ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.fullName && (
              <p className="text-red-500 text-sm">{errors.fullName.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className={`w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block font-medium text-gray-700">Age</label>
            <input
              type="number"
              {...register("age", {
                required: "Age is required",
                valueAsNumber: true,
                validate: (value) =>
                  value >= 18 || "Age must be 18 or older",
              })}
              className={`w-full border ${
                errors.age ? "border-red-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            />
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block font-medium text-gray-700">Gender</label>
            <select
              {...register("gender", {
                required: "Gender is required",
              })}
              className={`w-full border ${
                errors.gender ? "border-red-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            >
              <option value="">Select...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium text-gray-700">Address</label>
            <textarea
              {...register("address", {
                required: "Address is required",
                minLength: {
                  value: 10,
                  message: "Address must be at least 10 characters",
                },
              })}
              className={`w-full border ${
                errors.address ? "border-red-500" : "border-gray-300"
              } rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400`}
            ></textarea>
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
            >
              {editingUserId ? "Update" : "Submit"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:ring-2 focus:ring-gray-400"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Display Submitted Users */}
      <div className="mt-8 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow-md rounded-lg p-4 animate-fade"
          >
            <p>
              <strong>Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Age:</strong> {user.age}
            </p>
            <p>
              <strong>Gender:</strong> {user.gender}
            </p>
            <p>
              <strong>Address:</strong> {user.address}
            </p>
            <div className="flex space-x-2 mt-2">
              <button
                onClick={() => handleEdit(user)}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(user.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
