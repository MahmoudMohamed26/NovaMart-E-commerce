import { useEffect, useState } from "react";
import { CAT, cat } from "../../../Api/Api";
import { Axios } from "../../../Api/Axios";
import { ClipLoader } from "react-spinners";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import noDataImg from "../../../imgs/noData.png";

import Tables from "../../../Components/Tables";

export default function Cat() {
  const [loader, setLoader] = useState(true);
  const [cats, setCats] = useState([]);
  const [deleteCat, setDeleteCat] = useState(false);
  const [page , setPage] = useState(1);
  const [from , setFrom] = useState()
  const [tableLoad , setTableLoad] = useState(false)
  const [total , setTotal] = useState();
  const [limit , setLimit] = useState(10);
  const headers = [
    {
      key: "id",
      name: "id",
    },
    {
      key: "title",
      name: "Title",
    },
    {
      key: "image",
      name: "Image",
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
  async function GetCat() {
    useEffect(() => {
      const fetchData = async () => {
        setTableLoad(true);
        try {
          const res = await Axios.get(`/${CAT}?limit=${limit}&page=${page}`);
          setLoader(false);
          setCats(res.data.data);
          setTotal(res.data.total);
          setFrom(res.data.from)
          setTableLoad(false);
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
      // eslint-disable-next-line
    }, [deleteCat , limit , page]);
  }

  async function handleDelete(id) {
    try {
      await Axios.delete(`/${cat}/${id}`);
      setDeleteCat((prev) => !prev);
    } catch (err) {
      console.log(err);
    }
  }

  GetCat();

  return loader ? (
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <ClipLoader color="#526de3" size={70} />
    </div>
  ) : cats.length === 0 ? (
    <div>
      <div className="flex justify-end">
        <Link
          to={"add"}
          className="h-fit py-2 mb-5 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <BiCategory />
          </span>{" "}
          Create category
        </Link>
      </div>
      <div className="h-[calc(100vh-180px)] select-none flex flex-col justify-center items-center">
        <img src={noDataImg} width="400px" alt="noData" />
        <p className="text-xl">No Categories found</p>
      </div>
    </div>
  ) : (
    <div>
      <div className="flex justify-end">
        <Link
          to={"add"}
          className="h-fit py-2 mb-5 flex items-center gap-2 duration-300 hover:bg-blue-700 w-fit px-3 text-white bg-blue-500 font-bold rounded-md"
        >
          <span>
            <BiCategory />
          </span>{" "}
          Create category
        </Link>
      </div>
      <Tables 
      headers={headers} 
      data={cats} 
      delete={handleDelete} 
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      total={total}
      tableLoad={tableLoad}
      from={from}
      placeholder="Search Category ..."
      link={cat}
      searchtype="title"
      />
    </div>
  );
}
