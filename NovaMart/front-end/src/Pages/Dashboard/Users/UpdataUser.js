import { useEffect, useState } from "react";
import { BeatLoader, ClipLoader } from "react-spinners";
import { Axios } from "../../../Api/Axios";
import { USER } from "../../../Api/Api";
import { useNavigate } from "react-router-dom";

export default function UpdateUser() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [loader, setLoader] = useState(false);
  const url = window.location.href;
  const id = url.split("/")[url.split("/").length - 1];
  const nav = useNavigate();
  const [loader2, setLoader2] = useState(true);
  const [currUser, setCurrUser] = useState();
  const [fetchUser, setFetchUser] = useState();
  const [disabled, setDisabled] = useState(true);
  const [disRank, setDisRank] = useState(false);
  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  useEffect(() => {
    try {
      const fetchData = async () => {
        await Axios.get(`${USER}`).then((res) => setCurrUser(res.data));
      };
      fetchData();
    } catch (err) {
      console.log(err);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/${USER}/${id}`);
        setLoader2(false);
        setDisabled(false);
        setForm({
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
        });
        setFetchUser(res.data);
      } catch (err) {
        nav("/dashboard/users", { replace: true });
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [id]);

  useEffect(() => {
    currUser?.id === fetchUser?.id ? setDisRank(true) : setDisRank(false);
  }, [currUser, fetchUser]);

  async function handleUpdate(e) {
    setLoader(true);
    e.preventDefault();
    try {
      await Axios.post(`/${USER}/edit/${id}`, form);
      setLoader(false);
      nav("/dashboard/users");
    } catch (err) {
      console.log(err);
    }
  }
  return loader2 ? (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <ClipLoader color="#526de3" size={70} />
    </div>
  ) : (
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
          className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500"
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
          className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500"
        />
      </div>
      <div className="mb-6">
        <label className="font-bold text-blue-500">Role</label>
        <select
          value={form.role}
          onChange={handleChange}
          type="email"
          id="role"
          name="role"
          className="border border-blue-300 outline-none rounded-sm w-full py-1 px-3 text-blue-500"
          disabled={disRank ? true : false}
        >
          <option value="" disabled>
            Select a role
          </option>
          <option value="1995">Admin</option>
          <option value="2001">User</option>
          <option value="1996">Writer</option>
          <option value="1999">Products Manager</option>
        </select>
      </div>
      <div className="mt-4">
        <button
          type="submit"
          disabled={disabled}
          className="h-fit py-2 duration-300 hover:bg-blue-700 w-full px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          {loader ? <BeatLoader size={10} color="#FFFFFF" /> : "Update"}
        </button>
      </div>
    </form>
  );
}
