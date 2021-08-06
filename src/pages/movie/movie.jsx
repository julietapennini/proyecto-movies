import { useState } from 'react';
import { Row, Col, Button} from 'antd';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import useFetch from '../../hooks/useFetch';
import { URL_API, API_KEY} from '../../utils/constants';
import Loading from '../../components/Loading';
import ModalVideo from '../../components/ModalVideo';

import './movie.sass';
import { List } from 'antd/lib/form/Form';

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
                    <MovieInfo movieInfo={props.movieInfo}/>
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

const MovieInfo = props => {
    const { movieInfo: {
        result: {
            title,
            id, 
            release_date,
            overview,
            genres
        }} } = props;

    const [inVisibleModal, setIsVisibleModal] = useState(false);

 

    const videoMovie = useFetch(`${URL_API}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);

    const openModal = () => setIsVisibleModal(true)
    const closeModal = () => setIsVisibleModal(false)

    const renderVideo = () => {
        if(videoMovie.result){
            if(videoMovie.result.results.lenght > 0){
                return (
                    <div>
                        <Button icon="play-circle" onClick={openModal}>
                        Ver Trailer
                        </Button>
                        <ModalVideo
                        videoKey={videoMovie.result.results[0].key}
                        videoPlatform={videoMovie.result.results[0].site}
                        isOpen={inVisibleModal}
                        close={closeModal}
                        />
                    </div>
                )
            }
        }
    }
    
    return(
        <div>
            <div className="movie__content">
                <h1>
                    {title}
                    <p>Año de estreno {moment(release_date, "YYYY-MM-DD").format("YYYY")}</p>                    
                </h1>
                <button className="ver-trailer" onClick={renderVideo}>Ver trailer</button>
            </div>
            <div className="content">
                <h3>Information</h3>
                <p>{overview}</p>
                <h3>Gender</h3>
                <ul>
                    {genres.map(gender => (
                        <li key={gender.id}>{gender.name}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Movie;

