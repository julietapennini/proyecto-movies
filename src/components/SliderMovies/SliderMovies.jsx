import { Carousel, Button} from 'antd';
import { Link } from 'react-router-dom';
import Loading from '../Loading'

import './SliderMovies.sass';

const SliderMovies = props =>{

    const { newMovies } = props;

    if(newMovies.loading || !newMovies.result){
        return <Loading/>
    }

    const { results } = newMovies.result;

    return(
        <Carousel autoplay className="slider-movies">
            {results.map(movie => (
                <Movie key={movie.id} movie= {movie}/>
            ))}
        </Carousel>
    );
};

//Component into component
const Movie = props => {

    const {
        movie:{
            id,
            backdrop_path,
            title,
            overview
        }
     } = props;

    const backDropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`

    return(
        <div 
            className="slider-movies__movie"
            style={{backgroundImage: `url('${backDropPath}')`}}
        >
            <div className="slider-movies__movie-info">
                <div>
                    <h2>{title}</h2>
                    <p>{overview}</p>
                    <Link to={`/movie/${id}`}>
                        <Button type="primary">Ver más</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SliderMovies;