import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import './Details.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import moviesData from '../../assets/moviesData';
import YouTube from 'react-youtube';
import Home from '../home/Home';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class Details extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                id: "M3",
        title: "Inception",
        storyline: "A thief, who steals corporate secrets through the use of dream-sharing technology, is given the inverse task of planting an idea into the mind of a CEO.",
        genres: [
            "Action",
            "Adventure",
            "Sci-Fi"
        ],
        duration: 148,
        poster_url: "https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg",
        trailer_url: "https://www.youtube.com/watch?v=8hP9D6kZseM",
        wiki_url: "https://en.wikipedia.org/wiki/Inception",
        release_date: "2010-07-16T00:00:00+05:30",
        censor_board_rating: "PG-13",
        critics_rating: 8.8,
        status: "PUBLISHED",
        artists: [
            {
                "id": "A5",
                "first_name": "Leonardo",
                "last_name": "DiCaprio",
                "role_type": "ACTOR",
                "profile_description": "Leonardo Wilhelm DiCaprio is an American actor and film producer. DiCaprio began his career by appearing in television commercials in the late 1980s. He next had recurring roles in various television series, such as the soap opera Santa Barbara and the sitcom Growing Pains. DiCaprio's portrayals of Howard Hughes in The Aviator (2004) and Hugh Glass in The Revenant won him the Golden Globe Award for Best Actor â€“ Motion Picture Drama. His performance as Jordan Belfort in The Wolf of Wall Street won him the Golden Globe award for Best Actor â€“ Motion Picture Musical or Comedy. He also won the Academy Award for Best Actor and BAFTA Award for his performance in The Revenant. DiCaprio is the founder of his own production company, Appian Way Productions.",
                "profile_url": "https://upload.wikimedia.org/wikipedia/commons/3/3f/Leonardo_DiCaprio_visited_Goddard_Saturday_to_discuss_Earth_science_with_Piers_Sellers_%2826105091624%29_cropped.jpg",
                "wiki_url": "https://en.wikipedia.org/wiki/Leonardo_DiCaprio"
            },
            {
                "id": "A6",
                "first_name": "Joseph",
                "last_name": "Gordon-Levitt",
                "role_type": "ACTOR",
                "profile_description": "Joseph Leonard Gordon-Levitt is an American actor, filmmaker, singer, and entrepreneur. As a child, Gordon-Levitt appeared in many films and TV series. He took a break from acting to study at Columbia University, but dropped out in 2004 to pursue acting again. He has since starred in  films like (500) Days of Summer, Inception, The Dark Knight Rises, G.I. Joe: The Rise of Cobra and others. For his leading performances in (500) Days of Summer and 50/50, he was nominated for the Golden Globe Award for Best Actor â€“ Motion Picture Musical or Comedy.",
                "profile_url": "https://upload.wikimedia.org/wikipedia/commons/7/7d/Joseph_Gordon-Levitt_2013.jpg",
                "wiki_url": "https://en.wikipedia.org/wiki/Joseph_Gordon-Levitt"
            }
        ]
    },
            starIcons: [ {id: 1, color: 'black'},
                        {id: 2, color: 'black'},
                        {id: 3, color: 'black'},
                        {id: 4, color: 'black'},
                        {id: 5, color: 'black'}],
        }
        let props = this.props;
    } 
    backToHomeHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    // componentDidMount() {
    //     let currentState = this.state;
    //     currentState.movie = moviesData.filter((mov) => {
    //         return mov.id === this.props.movieId
    //     })[0];
    //     this.setState({ currentState });
    //     console.log(this.state);
    // }
    backToHomeHandler = () => {
        ReactDOM.render(<Home />, document.getElementById('root'));
    }
    artistClickHandler = (url) => {
        window.location = url;
    }

    starClickHandler = (id) => {
        let starIconList = [];
        for (let star of this.state.starIcons) {
            let starNode = star;
            if (star.id <= id) {
                starNode.color = "yellow"
            }
            else {
                starNode.color = "black";

            }
            starIconList.push(starNode);
        }
        this.setState({ starIcons: starIconList });
    }

    render() { 
        let movie = this.state.movie;
        const attr = {
            height: '300',
            width: '700',
            playerVars: {
                autoplay: 1
            }
        }

        return (<div>
            <Header/>
            <div className='flex-container'>
                <div className='leftDiv'>
                    <Typography className='backbtn' onClick={this.backToHomeHandler}> &lt; Back to Home</Typography>
                    <img src={movie.poster_url } alt={movie.title}/>

                </div>
                <div className='middleDiv'>
                    <Typography variant="h2" component="h2">{movie.title}</Typography>
                    <br/>
                    <Typography>
                        <span style={{fontWeight: 'bold'}}> Genres: </span> {movie.genres.join(', ')}
                    </Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Duration:</span> {movie.duration} </Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Release Date:</span> {new Date(movie.release_date).toDateString()} </Typography>
                    <Typography><span style={{fontWeight: 'bold', marginTop: '16px'}}> Rating:</span> {movie.critics_rating}  </Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Plot:</span> <a href={movie.wiki_url}>(Wiki Link)</a> {movie.storyline} </Typography>
                    <Typography style={{fontWeight: 'bold', marginTop: '16px'}}>Trailer:</Typography>

                    <YouTube videoId={movie.trailer_url.split("?v=")[1]}
                                opts={attr}
                                onReady={this._onReady}>
                    </YouTube>
                </div> 
                <div className='rightDiv'>
                    <Typography style={{fontWeight: 'bold'}}> Rate this movie: </Typography>
                        {this.state.starIcons.map(star => (
                            <StarBorderIcon
                                className={star.color}
                                key={"star" + star.id}
                                onClick={() => this.starClickHandler(star.id)}
                            />
                        ))}
                    <Typography style={{fontWeight: 'bold', margin: '16px 0px'}}>Artists: </Typography>

                    <ImageList cols={2}>
                    {movie.artists != null && movie.artists.map(artist => (
                                    <ImageListItem
                                        className="gridTile"
                                        onClick={() => this.artistClickHandler(artist.wiki_url)}
                                        key={artist.id}>
                                        <img src={artist.profile_url} alt={artist.first_name + " " + artist.last_name} />
                                        <ImageListItemBar
                                            title={artist.first_name + " " + artist.last_name}
                                        />
                                    </ImageListItem>
                                ))}
                    </ImageList>
                </div>
            </div>
        </div>);
    }
}
 
export default Details;