import { useState } from "react";
import { BeatLoader } from "react-spinners";
import { Axios } from "../../../Api/Axios";
import { ADD, USER } from "../../../Api/Api";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [err, setErr] = useState(false);
  const [loader, setLoader] = useState(false);
  const [show, setShow] = useState(true);
  const nav = useNavigate();
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    setLoader(true);
    e.preventDefault();
    try {
      await Axios.post(`/${USER}/${ADD}`, form);
      setLoader(false);
      nav("/dashboard/users");
    } catch (err) {
      setLoader(false);
      setErr(err.response.data.message);
    }
  }
  return (
    <form className="container !mt-10" onSubmit={handleUpdate}>
      <div className="mb-6">
        <label className="font-bold text-blue-500">Username</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={form.name}
          onChange={handleChange}
          className="border border-blue-300 mt-2 outline-none rounded-sm w-full py-1 px-3 text-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="font-bold text-blue-500">E-mail</label>
        <input
          type="email"
          id="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          className="border border-blue-300 outline-none mt-2 rounded-sm w-full py-1 px-3 text-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="font-bold text-blue-500">Password</label>
        <div className="relative">
          <input
            type={show ? "password" : "text"}
            id="password"
            name="password"
            required
            value={form.password}
            onChange={handleChange}
            className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500 bg-blue-10"
          />
          {!show ? (
            <FaEye
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 translate-y-1/2 cursor-pointer"
              size={23}
              color="#526de3"
            />
          ) : (
            <FaEyeSlash
              onClick={() => setShow((prev) => !prev)}
              className="absolute right-3 top-1/2 translate-y-1/2 cursor-pointer"
              size={23}
              color="#526de3"
            />
          )}
        </div>
      </div>
      <div className="mb-6">
        <label className="font-bold text-blue-500">Role</label>
        <select
          value={form.role}
          onChange={handleChange}
          type="email"
          id="role"
          name="role"
          className="border border-blue-300 mt-2 outline-none rounded-sm w-full py-1 px-3 text-blue-500"
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1999">Products Manager</option>
        </select>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={
            form.name.length > 0 &&
            form.email.length &&
            form.password.length &&
            form.role !== ""
              ? false
              : true
          }
          className="h-fit py-2 duration-300 hover:bg-blue-700 w-full px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          {loader ? <BeatLoader size={10} color="#FFFFFF" /> : "Create"}
        </button>
      </div>
      {err !== "" && <p className="text-sm text-red-700 mt-4">{err}</p>}
    </form>
  );
}
