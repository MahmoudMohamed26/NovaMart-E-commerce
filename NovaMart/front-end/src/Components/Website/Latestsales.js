import { useEffect, useState, useRef } from "react";
import { Axios } from "../../Api/Axios";
import { LatestSale } from "../../Api/Api";
import SpecialHeader from "./SpecialHeader";
import Product from "./Product";
import Skeleton from "react-loading-skeleton";

export default function LatestSales() {
  const [skeleton, setSkeleton] = useState(true);
  const [products, setProducts] = useState([]);
  const sectionRef = useRef(null);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSectionVisible(true);
        }
      },
      { threshold: 0.1 } // Adjust threshold as needed
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        // eslint-disable-next-line
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isSectionVisible && skeleton) {
      const fetchData = async () => {
        try {
          const res = await Axios.get(`${LatestSale}`);
          setProducts(res.data);
          setSkeleton(false);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [isSectionVisible, skeleton]);

  const showProducts = products.map((el, index) => (
        <Product
      key={index}
      id={el.id}
      rating={el.rating}
      title={el.title}
      desc={el.description}
      price={el.price}
      stock={el.stock}
      discount={el.discount}
      image1={el.images[0].image}
      image2={el.images[1]?.image}
    />
  ));

  return (
    <div ref={sectionRef} className="container mt-20 border-b !pb-10">
      <SpecialHeader header="Latest Sales" />
      {skeleton ? (
        <div className="mt-10 special-grid2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i}>
              <Skeleton count={1} height={300} />
              <Skeleton className="mt-3" count={1} width={60} />
              <Skeleton className="mt-3" count={1} width={200} />
              <Skeleton className="mt-3" count={1} width={250} />
              <div className="mt-10 flex justify-between">
                <Skeleton count={1} width={60} />
                <Skeleton count={1} width={130} />
              </div>
              <div className="mt-3 flex justify-center">
                <Skeleton count={1} height={30} width={250} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="special-grid2 mt-10">{showProducts}</div>
      )}
    </div>
  );
}
