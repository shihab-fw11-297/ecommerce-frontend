import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import Slider from '../../components/Slider/Slider'
import './Home.scss';
import FeaturedProducts from '../../components/FeaturedProducts/FeaturedProducts';
import Categories from '../../components/Categories/Categories';
import Contact from '../../components/Contact/Contact';

const Home = () => {
    return (
        <div className='Home'>
            <Navbar />
            <Slider />
            <FeaturedProducts type="Trending"/>
            <Categories/>
            <FeaturedProducts type="Newest"/>
            <Contact/>
            <Footer/>
        </div>
    )
}

export default Home