import useFetch from '../hooks/useFetch';
//import Loading from '../components/Loading';
import { URL_API, API_KEY } from '../utils/constants';
import SliderMovies from '../components/SliderMovies';

const Home = () => {

    const url =`${URL_API}/movie/now_playing?api_key=${API_KEY}&language=en-ES&page=1`

    const newMovies = useFetch(url);

    return (
     <div>
         <SliderMovies newMovies={newMovies} />
     </div>
    )
}

export default Home;