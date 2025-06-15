import { Link } from "react-router-dom";
import SpecialHeader from "../../Components/Website/SpecialHeader";
import WordOperation from "../../helpers/WordOperation";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { useContext, useEffect, useState } from "react";
import { CartCon } from "../../Context/CartContext";

export default function Cart() {
  const products = JSON.parse(localStorage.getItem("product")) || [];
  // eslint-disable-next-line
  const [countChange, setCountChange] = useState(false);
  const tax = products.length * 10;
  function Increment(id, type) {
    const findProduct = products.find((pro) => pro.id === id);
    if (findProduct.count) {
      type === "add" ? findProduct.count++ : findProduct.count--;
    } else {
      if (type === "add") {
        findProduct.count = 2;
      }
    }
    localStorage.setItem("product", JSON.stringify(products));
    setCountChange((prev) => !prev);
  }

  function RemoveProduct(id){
    setChange((prev) => !prev)
    const updatedProducts = products.filter((product) => product.id !== id)
    localStorage.setItem("product" , JSON.stringify(updatedProducts))
  }

  const { totalSavedMoney, totalPrice } = products
    .map((el) => ({
      price: parseFloat(el.price),
      count: el.count || 1,
      discount: el.discount || 0,
    }))
    .reduce(
      (acc, { price, count, discount }) => {
        const savedMoney = price * (discount / 100) * count;
        const newPrice = price * count;
        
        acc.totalSavedMoney += savedMoney;
        acc.totalPrice += newPrice;

        return acc;
      },
      { totalSavedMoney: 0, totalPrice: 0 }
    );

  const [total, setTotal] = useState(0);
  const {setChange} = useContext(CartCon)

  useEffect(() => {
    setTotal(totalPrice + tax - totalSavedMoney);
    setChange((prev) => !prev)
  }, [totalPrice, tax, totalSavedMoney , setChange]);

  const showData = products.map((el, index) => (
    <div
      key={index}
      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm"
    >
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <Link
          to={`/product/${el.id}`}
          className={` w-[100px] block h-[100px] bg-cover bg-center bg-no-repeat`}
          style={{ backgroundImage: `url(${el.images[0].image})` }}
        ></Link>
        <div className="flex items-center justify-between md:order-3 md:justify-end">
          <div className="border rounded-sm flex items-center">
            <span
              onClick={() => Increment(el.id, "add")}
              className="font-bold h-full px-2 flex items-center select-none text-2xl cursor-pointer hover:bg-gray-100"
            >
              <GoPlus size={20} />
            </span>
            <span className="block font-semi px-6">
              {el.count ? el.count : 1}
            </span>
            <span
              onClick={() => Increment(el.id, "sub")}
              className="select-none font-bold text-2xl flex items-center px-2 h-full cursor-pointer hover:bg-gray-100"
            >
              <FiMinus size={20} />
            </span>
          </div>
          <div className="text-end md:order-4 md:w-32">
            <p className="text-xl font-bold text-blue-700">
              $
              {el.count
                ? Math.round(el.price * (1 - el.discount / 100) * el.count)
                : Math.round(el.price * (1 - el.discount / 100))}
            </p>
            {el.discount > 0 ? (
              <del className="text-red-700 text-sm">
                <p className="text-base">
                  ${el.count ? Math.round(el.price * el.count) : el.price}
                </p>
              </del>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
          <Link
            to={`/product/${el.id}`}
            className="text-base font-medium text-gray-900"
          >
            {el.title}
          </Link>
          <p className="font-medium text-gray-600 text-sm">
            {WordOperation(el.description, 100)}
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => RemoveProduct(el.id)}
              type="button"
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            >
              <svg
                className="me-1.5 h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18 17.94 6M18 18 6.06 6"
                />
              </svg>
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  ));
  return (
    <section className="bg-white py-8 antialiased">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <SpecialHeader header="Shopping Cart" />
        {products.length > 0 ? (
          <div className="!mt-10 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">{showData}</div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 sticky top-5 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
                <p className="text-xl font-semibold ">Order summary</p>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Original price
                      </dt>
                      <dd className="text-base font-medium">
                        ${Math.round(totalPrice)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500 ">
                        Save
                      </dt>
                      <dd className="text-base font-medium text-green-700">
                        -${Math.round(totalSavedMoney)}
                      </dd>
                    </dl>

                    <dl className="flex items-center justify-between gap-4">
                      <dt className="text-base font-normal text-gray-500">
                        Tax
                      </dt>
                      <dd className="text-base font-medium text-red-700">
                        +${tax}
                      </dd>
                    </dl>
                  </div>

                  <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2 dark:border-gray-700">
                    <dt className="text-base font-bold text-gray-900">Total</dt>
                    <dd className="text-base font-bold text-gray-900">
                      ${Math.round(total)}
                    </dd>
                  </dl>
                </div>

                <Link className="flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 duration-300 hover:bg-white hover:text-blue-700 border border-blue-700 bg-blue-700">
                  Proceed to Checkout
                </Link>

                <div className="flex items-center justify-center gap-2">
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    {" "}
                    or{" "}
                  </span>
                  <Link to={'/shop'} className="inline-flex items-center gap-2 text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
                    Continue Shopping
                    <svg
                      className="h-5 w-5"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 12H5m14 0-4 4m4-4-4-4"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-20 text-2xl">
            Your shopping cart is empty!{" "}
            <Link to={'/shop'} className="inline-flex items-center gap-2 text-xl font-medium text-primary-700 underline hover:no-underline dark:text-primary-500">
              Continue Shopping
              <svg
                className="h-5 w-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 12H5m14 0-4 4m4-4-4-4"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
