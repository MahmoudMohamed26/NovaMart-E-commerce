import { useContext, useEffect, useRef, useState } from "react";
import { CiUser } from "react-icons/ci";
import { Axios } from "../../Api/Axios";
import { LOGOUT, pro, USER } from "../../Api/Api";
import { CiStar } from "react-icons/ci";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import Cookie from "cookie-universal";
import { IoCartOutline } from "react-icons/io5";
import WordOperation from "../../helpers/WordOperation";
import { FaStar } from "react-icons/fa";
import { CartCon } from "../../Context/CartContext";
import { LuSearchX } from "react-icons/lu";

export default function NavBar() {
  const [loggedUser, setLoggedUser] = useState(false);
  const products = JSON.parse(localStorage.getItem("product")) || [];
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [searching, setSearching] = useState(false);
  const [searchToggle, setSearchToggle] = useState(false);
  const nav = new useNavigate();
  const { change } = useContext(CartCon);
  const cookie = Cookie();
  const searchResultRef = useRef(null);
  const searchInputRef = useRef(null);
  useEffect(() => {
    const controler = new AbortController();
    const fetchUser = async () => {
      try {
        if (!cookie.get("token")) {
          return;
        }
        const res = await Axios.get(`${USER}`, { signal: controler.signal });
        setLoggedUser(res.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          setLoggedUser(false);
        }
      }
    };
    fetchUser();
    return () => {
      controler.abort();
    };
    // eslint-disable-next-line
  }, []);
  async function handleLogout() {
    try {
      await Axios.get(`${LOGOUT}`);
    } catch (err) {
      console.log(err);
    }
    window.location.pathname = "/login";
    cookie.set("token", "");
  }
  useEffect(() => {
    setSearching(true);
    if (search.length > 0) {
      const delay = setTimeout(() => {
        toggleSearch();
      }, 800);
      return () => clearTimeout(delay);
    } else {
    }
    // eslint-disable-next-line
  }, [search]);

  async function toggleSearch() {
    try {
      const res = await Axios.get(`${pro}/search?title=${search}`);
      setSearchResult(res.data.data);
      setSearching(false);
    } catch (err) {
      setSearching(false);
      console.log(err);
    }
  }


  const { totalPrice } = products
    .map((el) => ({
      price: parseFloat(el.price),
      count: el.count || 1,
      discount: el.discount || 0,
    }))
    .reduce(
      (acc, { price, count, discount }) => {
        const newPrice = price * (1 - discount / 100) * count;
        acc.totalPrice += newPrice;

        return acc;
      },
      { totalPrice: 0 }
    );
  useEffect(() => {}, [change]);

  function handleSearch() {
    search.length > 0 && nav(`/shop?search=${search}`);
    setSearchToggle(true);
  }

  useEffect(() => {
    setSearchToggle(false);
  }, [search]);


  const filterSearch = searchResult.slice(0, 4);
  const showSearchResult = filterSearch.map(function (el, key) {
    const roundStar = Math.round(el.rating);
    const star = Math.min(roundStar, 5);
    const coloredStars = Array.from({ length: star }).map((el, index) => (
      <FaStar key={index} color="#526de3" size={15} />
    ));
    const emptyStars = Array.from({ length: 5 - star }).map((el, index) => (
      <CiStar key={index} color="#526de3" size={15} />
    ));

    return (
      <Link
        key={key}
        onClick={() => setSearch("")}
        to={`/product/${el.id}`}
        className={`py-3 flex justify-between duration-300 hover:bg-gray-100 ${
          key !== 0 ? "border-t" : ""
        } px-5`}
      >
        <div className="flex  gap-5">
          <div
            className={`min-w-[80px] h-[80px] bg-cover bg-center bg-no-repeat`}
            style={{ backgroundImage: `url(${el.images[0].image})` }}
          ></div>
          <div>
            <h1 className="mb-2 font-bold">{WordOperation(el.title, 40)}</h1>
            <p className="text-sm text-gray-400">
              {WordOperation(el.description, 140)}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between items-end">
          <div className="flex items-center">
            <span className="text-xs font-semibold text-blue-600 mr-2">
              {el.rating}
            </span>
            {coloredStars}
            {emptyStars}
          </div>
          <div className="flex gap-1 items-end">
            <p className="text-blue-600 font-semibold text-xl">
              ${el.price * (1 - el.discount / 100)}
            </p>
            {Number(el.discount) !== 0 && (
              <del className="text-red-700 font-semibold text-xs">
                <p>${el.price}</p>
              </del>
            )}
          </div>
        </div>
      </Link>
    );
  });

  useEffect(() => {
    const handler =
      /**
       *
       * @param {MouseEvent} e
       */
      (e) => {
        if (!(e.target instanceof HTMLElement)) return;
        const isInputClicked = e.target === searchInputRef.current;
        const searchResultClicked =
          searchResultRef.current != null &&
          (e.target === searchResultRef.current ||
            searchResultRef.current.contains(e.target));

        setSearchToggle(!isInputClicked && !searchResultClicked);
      };

    window.addEventListener("click", handler);

    return () => window.removeEventListener("click", handler);
  }, []);

  return (
    <>
      <div>
        <div className="container flex flex-wrap gap-6 justify-between !py-4 items-center border-b">
          <Link to={"/"} className="font-thin text-3xl select-none">
            Nova<span className="text-blue-600 font-bold">Mart</span>
          </Link>
          <div className="relative flex-1 sm:min-w-[487px] min-w-full">
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                onChange={(e) => setSearch(e.target.value)}
                ref={searchInputRef}
                id="default-search"
                className="block w-full p-2 ps-10 pe-[90px] text-sm border border-gray-300 rounded-md bg-gray-50 duration-300 focus:border-blue-600 outline-none"
                placeholder="Search Products ..."
              />
              <button
                type="submit"
                onClick={handleSearch}
                className="text-white absolute top-[50%] right-2 translate-y-1/2 bg-blue-700 hover:bg-blue-800 font-medium rounded-md text-sm px-4 py-1"
              >
                Search
              </button>
              {search !== "" && !searchToggle && (
                <>
                  <div className="absolute bottom-[-17px] left-4 w-0 h-0 border-[15px] border-l-transparent border-t-transparent border-b-white border-r-transparent"></div>
                  <div
                    ref={searchResultRef}
                    className="absolute shadow-2xl bg-white w-full h-fit top-[55px] z-50 left-0"
                  >
                    {searching ? (
                      <div className="my-5 flex justify-center" role="status">
                        <svg
                          aria-hidden="true"
                          className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                          viewBox="0 0 100 101"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                            fill="currentColor"
                          />
                          <path
                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                            fill="currentFill"
                          />
                        </svg>
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : searchResult.length === 0 ? (
                      <p className=" my-5 flex gap-2 justify-center items-center text-center text-[#7B7C7D] font-bold"><span><LuSearchX /></span> <span>No products found</span></p>
                    ) : (
                      <div>
                        {showSearchResult}
                        {searchResult.length > 4 && (
                          <div className="p-4 border-t">
                            <button
                              onClick={handleSearch}
                              className="text-white bg-blue-700 py-2 hover:bg-blue-800 font-medium rounded-sm text-sm w-full px-4"
                            >
                              Show all Results
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex items-center">
            <CiUser color="2563EB" size={60} />
            <div className="text-xs flex flex-col gap-2">
              <h3 className="text-gray-600 text-sm">
                Hello,{" "}
                {loggedUser ? (
                  <Menu as="span" className="relative">
                    <MenuButton className="duration-300 outline-none hover:text-blue-600 font-bold">
                      {loggedUser.name}
                    </MenuButton>
                    <MenuItems
                      transition
                      className="absolute right-[50%] -translate-x-1/2 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      <div className="py-1">
                        
                        {(loggedUser.role === "1995" ||
                          loggedUser.role === "1999") && (
                          <MenuItem>
                            <Link
                              to={"/dashboard"}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                            >
                              Dashboard
                            </Link>
                          </MenuItem>
                        )}
                        <MenuItem>
                          <Link
                            onClick={handleLogout}
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                          >
                            Sign out
                          </Link>
                        </MenuItem>
                      </div>
                    </MenuItems>
                  </Menu>
                ) : (
                  "Guest"
                )}
                !
              </h3>
              {!loggedUser ? (
                <div>
                  <Link
                    className="duration-300 hover:text-blue-600"
                    to={`/login`}
                  >
                    Login
                  </Link>{" "}
                  /{" "}
                  <Link
                    className="duration-300 hover:text-blue-600"
                    to={`/register`}
                  >
                    Register
                  </Link>
                </div>
              ) : (
                <h3>
                  Welcome to Nova
                  <span className="text-blue-600 font-bold">Mart</span>
                </h3>
              )}
            </div>
          </div>
          <Link
            to="/cart"
            className="flex items-center cursor-pointer relative"
          >
            {products.length > 0 ? (
              <div className="absolute rounded-full bg-red-500 bottom-0 left-0 text-white font-bold px-2 border-4 border-white">
                {products.length}
              </div>
            ) : (
              ""
            )}
            <IoCartOutline color="2563EB" size={60} />
            <div className="flex flex-col">
              <h3 className="font-semibold">Your Cart</h3>
              <h3 className="text-red-500 font-semibold">
                ${Math.round(totalPrice)}
              </h3>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
