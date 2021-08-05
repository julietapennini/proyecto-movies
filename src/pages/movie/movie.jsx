import { Row, Col, Button} from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';
import { URL_API, API_KEY} from '../../utils/constants';
import Loading from '../../components/Loading';

import './movie.sass';

const Movie = () => {

    const { id } = useParams();

    const url = `${URL_API}/movie/${id}}?api_key=${API_KEY}&language=en-US`
    const movieInfo = useFetch(url);

    if (movieInfo.loading || !movieInfo.result){
        return <Loading/>
    }

    return <RenderMovie movieInfo={movieInfo}/>
}

const RenderMovie = props => {

    const {
        movieInfo: {
            result: {
                title,
                backdrop_path,
                poster_path
            }
        }
    } = props;

    const backdropPath = `https://image.tmdb.org/t/p/original${backdrop_path}`

    return (
        <div className="movie" style={{backgroundImage: `url('${backdropPath}')`}}>
            <div className="movie__dark"/>
            <Row>
                <Col span={8} offset={3} className="movie__poster">
                    <PosterMovie image={poster_path}/>
                </Col>
                <Col span={11} className="movie__info">
                    Movie Info...
                </Col>
            </Row>
        </div> 
    )
}

const PosterMovie = props => {
    const { image } = props;
    const posterPath = `https://image.tmdb.org/t/p/original${image}`
    console.log(posterPath)

    return(
        <div style={{backgroundImage: `url('${posterPath}')`}}></div>
    )
}

export default Movie;

