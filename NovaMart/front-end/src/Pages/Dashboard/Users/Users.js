import { useEffect, useState } from "react";
import { USERS, USER } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { Link } from "react-router-dom";
import noDataImg from "../../../imgs/noData.png";
import { IoPersonAddSharp } from "react-icons/io5";
import Tables from "../../../Components/Tables";

export default function Users() {
  const [loader, setLoader] = useState(true);
  const [users, setUsers] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [deleteuser, setDeleteUser] = useState(false);
  const [total , setTotal] = useState()
  const [from , setFrom] = useState()
  const [tableLoad , setTableLoad] = useState(false);
  const [page , setPage] = useState(1);
  const [limit , setLimit] = useState(10);
  const headers = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "name",
      name: "Username",
    },
    {
      key: "email",
      name: "Email",
    },
    {
      key: "role",
      name: "Role",
    },
    {
      key: "created_at",
      name: "Created at",
    },
    {
      key: "updated_at",
      name: "Last Updated",
    },
  ];
  async function GetUsers() {
    useEffect(() => {
      const fetchData = async () => {
        try {
          setTableLoad(true)
          const res = await Axios.get(`/${USERS}?limit=${limit}&page=${page}`);
          setLoader(false);
          setTableLoad(false)
          setUsers(res.data.data);
          setTotal(res.data.total);
          setFrom(res.data.from)
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
      // eslint-disable-next-line
    }, [deleteuser , limit , page]);
  }
  useEffect(() => {
    Axios.get(`/${USER}`).then((res) => setCurrUser(res.data));
  }, []);

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${USER}/${id}`);
      setDeleteUser((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  GetUsers();

  return loader ? (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <ClipLoader color="#526de3" size={70} />
    </div>
  ) : users.length === 0 ? (
    <>
    <div>
      <div className="flex justify-end">
        <Link
          to={"add"}
          className="h-fit py-2 mb-5 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <IoPersonAddSharp />
          </span>{" "}
          Create user
        </Link>
      </div>
      <div className="h-[calc(100vh-180px)] select-none flex flex-col justify-center items-center">
        <img src={noDataImg} width="400px" alt="noData" />
        <p className="text-xl">No Users found</p>
      </div>
    </div>
    </>
  ) : (
    <>
    <div>
      <div className="flex justify-end mb-5 items-center">
        <Link
          to={"add"}
          className="h-fit py-2 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <IoPersonAddSharp />
          </span>{" "}
          Create user
        </Link>
      </div>
        <Tables
          headers={headers}
          limit={limit}
          page={page}
          setPage={setPage}
          data={users}
          currUser={currUser}
          delete={handleDelete}
          setLimit={setLimit}
          total={total}
          tableLoad={tableLoad}
          from={from}
          placeholder="Search User ..."
          link="user"
          searchtype="name"
        />
    </div>
    </>
  );
}
