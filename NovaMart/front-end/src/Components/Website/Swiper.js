import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y , Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Link } from 'react-router-dom';
export default function Swipers(){
    return(
        <div className='mainSwiper mt-5'>
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y , Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
            >
                <SwiperSlide><Link to={'/shop'}><img src='http://ps.magentech.com/themes/sp_bestshop/modules/sphomeslider/images/sample-1.jpg' alt='img1'/></Link></SwiperSlide>
                <SwiperSlide><Link to={'/shop'}><img src='http://ps.magentech.com/themes/sp_bestshop/modules/sphomeslider/images/sample-2.jpg' alt='img2'/></Link></SwiperSlide>
                <SwiperSlide><Link to={'/shop'}><img src='http://ps.magentech.com/themes/sp_bestshop/modules/sphomeslider/images/sample-3.jpg' alt='img3'/></Link></SwiperSlide>
            </Swiper>
        </div>
    )
}