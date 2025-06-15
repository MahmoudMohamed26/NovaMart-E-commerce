import { Link } from "react-router-dom";
import PaginatedItems from "./Dashboard/Paginate/Paginate";
import { ClipLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { Axios } from "../Api/Axios";
import GetDate from "../helpers/GetDate";
import WordOperation from "../helpers/WordOperation";
export default function Tables(props) {
  const currUser = props.currUser || {
    name: ""
  };
  const headersShow = props.headers.map((item, index) => (
    <th key={index} className="p-4 text-left font-semibold">
      {item.name}
    </th>
  ));

  const [search , setSearch] = useState("");
  const [searching , setSearching] = useState(false)
  const [filteredData , setFilteredData] = useState([]);
  const whichData = search.length > 0 ? filteredData : props.data;

  useEffect(() => {
        if(search.length > 0){
          setSearching(true)
          const delay = setTimeout(() => {
            toggleSearch()
          }, 800);
          return () => clearTimeout(delay);
        }
        else {
          setSearching(false)
        }
        // eslint-disable-next-line
  } , [search])

  async function toggleSearch(){
    try{
      const res = await Axios.post(`${props.link}/search?${props.searchtype}=${search}`)
      setFilteredData(res.data)
      setSearching(false)
    }
    catch(err) {
      console.log(err);
      setSearching(false)
    }
  }

  const dataShow = whichData.map((item, index1) => {
    const rowNumber = index1 + 1 + (props.page - 1) * props.limit;
    return(
    <tr className="hover:bg-gray-50" key={index1}>
      {props.headers.map((item2, index2) => (
        <td key={index2} className="p-4 text-[15px] text-gray-800">
          {item2.key === "image" ? <div className={` w-[80px] h-[80px] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${item[item2.key]})` }}></div>
            : item2.key === "id"
            ? rowNumber
            : item[item2.key] === "2001"
            ? "User"
            : item[item2.key] === "1995"
            ? "Admin"
            : item[item2.key] === "1999"
            ? "Product Manager"
            : item[item2.key] === "1996"
            ? "Writer"
            : item2.key === "images"
            ? <div className={`w-[80px] h-[80px] bg-cover bg-center bg-no-repeat`} style={{ backgroundImage: `url(${item[item2.key][0].image})` }}></div>
            : item2.key === "created_at"
            ? GetDate(`${item[item2.key]}`)
            : item2.key === "updated_at"
            ? GetDate(`${item[item2.key]}`)
            : WordOperation(item[item2.key])}
          {currUser && item2.key === "name" && currUser.id === item.id && (
            <span className="text-blue-600 font-bold"> (You)</span>
          )}
        </td>
      ))}
      <td className="p-4">
        <Link to={`${item.id}`}>
          <button className="mr-4" title="Edit">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 fill-blue-500 hover:fill-blue-700"
              viewBox="0 0 348.882 348.882"
            >
              <path
                d="m333.988 11.758-.42-.383A43.363 43.363 0 0 0 304.258 0a43.579 43.579 0 0 0-32.104 14.153L116.803 184.231a14.993 14.993 0 0 0-3.154 5.37l-18.267 54.762c-2.112 6.331-1.052 13.333 2.835 18.729 3.918 5.438 10.23 8.685 16.886 8.685h.001c2.879 0 5.693-.592 8.362-1.76l52.89-23.138a14.985 14.985 0 0 0 5.063-3.626L336.771 73.176c16.166-17.697 14.919-45.247-2.783-61.418zM130.381 234.247l10.719-32.134.904-.99 20.316 18.556-.904.99-31.035 13.578zm184.24-181.304L182.553 197.53l-20.316-18.556L294.305 34.386c2.583-2.828 6.118-4.386 9.954-4.386 3.365 0 6.588 1.252 9.082 3.53l.419.383c5.484 5.009 5.87 13.546.861 19.03z"
                data-original="#000000"
              />
              <path
                d="M303.85 138.388c-8.284 0-15 6.716-15 15v127.347c0 21.034-17.113 38.147-38.147 38.147H68.904c-21.035 0-38.147-17.113-38.147-38.147V100.413c0-21.034 17.113-38.147 38.147-38.147h131.587c8.284 0 15-6.716 15-15s-6.716-15-15-15H68.904C31.327 32.266.757 62.837.757 100.413v180.321c0 37.576 30.571 68.147 68.147 68.147h181.798c37.576 0 68.147-30.571 68.147-68.147V153.388c.001-8.284-6.715-15-14.999-15z"
                data-original="#000000"
              />
            </svg>
          </button>
        </Link>
        {currUser.id !== item.id && (
          <button
            onClick={() => props.delete(item.id)}
            className="mr-4"
            title="Delete"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 fill-red-500 hover:fill-red-700"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
                data-original="#000000"
              />
              <path
                d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
                data-original="#000000"
              />
            </svg>
          </button>
        )}
      </td>
    </tr>
  )});

  return (
    <>
      <div className="relative mb-5">
        <div className="absolute inset-y-0 start-0 top-[50%] translate-y-1/2 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
        </div>
        <input type="search" id="default-search" className="block p-2 ps-10 text-sm border border-gray-300 rounded-lg bg-gray-50 outline-none " placeholder={`${props.placeholder}`} onChange={(e) => setSearch(e.target.value)} />
      </div>
    <div className="font-sans overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead className="bg-blue-500 text-white whitespace-nowrap">
          <tr>
            {headersShow}
            <th className="p-4 text-left font-semibold">Action</th>
          </tr>
        </thead>

        <tbody className="whitespace-nowrap">
          {props.tableLoad || searching ? <tr>
            <td colSpan={10} className="text-center py-8">
              <ClipLoader color="#526de3" size={30} />
            </td>
          </tr> : dataShow}
        </tbody>
      </table>
    </div>
      <div className="flex gap-10 mt-10 flex-wrap">
        <select className="border cursor-pointer border-blue-300 outline-none rounded-sm items-center py-1 px-3 text-blue-500" 
        onChange={(e) => {
          props.setLimit(e.target.value)
          props.setPage(1)
        }} defaultValue="none">
          <option disabled value="none">Number of rows</option>
          <option value="5">5 rows</option>
          <option value="10">10 rows</option>
          <option value="15">15 rows</option>
          <option value="20">20 rows</option>
      </select>
        <PaginatedItems limit={props.limit} setPage={props.setPage} total={props.total}/>
      </div>
    </>

  );
}
