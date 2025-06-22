import { Bounce, ToastContainer } from 'react-toastify';
import LatestProducts from '../../Components/Website/LatestProducts';
import LatestSales from '../../Components/Website/Latestsales';
import Objectives from '../../Components/Website/Objectives';
import Swiper from '../../Components/Website/Swiper';
import TopRated from '../../Components/Website/TopRated';
import CategoriesC from '../../Components/Website/CategoriesC';

export default function Home(){


    return(
        <div>
            <ToastContainer
                                position="bottom-right"
                                autoClose={5000}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                transition={Bounce}
                            />
            <Swiper />
            <CategoriesC />
            <Objectives />
            <LatestSales />
            <LatestProducts />
            <TopRated />
        </div>
    )
}