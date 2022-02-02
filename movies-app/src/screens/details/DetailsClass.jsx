import { ImageList, ImageListItem, ImageListItemBar, Typography } from '@material-ui/core';
import './Details.css';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Header from '../../common/header/Header';
import moviesData from '../../common/moviesData';
import YouTube from 'react-youtube';
import Home from '../home/Home';
import StarBorderIcon from '@material-ui/icons/StarBorder';

class DetailsClass extends Component {
    constructor() {
        super();
        this.state = {
            movie: {
                id: 1,
                title: "Khiladi",
                genres: ["Crime", "Action"],
                storyline: "Lorem Ipsum dolor sit amet",
                poster_url: "https://upload.wikimedia.org/wikipedia/en/8/8b/Khiladi_%281992%29.jpg",
                trailer_url: "https://www.youtube.com/watch?v=yQxA21_PFmQ&ab_channel=VenusMovies",
                wiki_url: "https://en.wikipedia.org/wiki/Khiladi_(1992_film)",
                release_date: "1992-03-15T00:00:00+05:30",
                duration: 177,
                critics_rating: 9.2,
                artists: [
                    {
                        "id": "A12",
                        "first_name": "Akshay",
                        "last_name": "Kumar",
                        "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Akshay_Kumar.jpg/220px-Akshay_Kumar.jpg",
                        "wiki_url": "https://en.wikipedia.org/wiki/Akshay_Kumar",
                    },
                    {
                        "id": "A13",
                        "first_name": "Deepak",
                        "last_name": "Tijori",
                        "profile_url": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Deepak_Tijori_Raja_Natwerlal_wrap_up.jpg/220px-Deepak_Tijori_Raja_Natwerlal_wrap_up.jpg",
                        "wiki_url": "https://en.wikipedia.org/wiki/Deepak_Tijori",
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
    artistClickHandler = (url) => {
        window.location = url;
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
                <div className='left'>
                    <Typography className='backbtn' onClick={this.backToHomeHandler}> &lt; Back to Home</Typography>
                    <img src={movie.poster_url } alt={movie.title}/>

                </div>
                <div className='middle'>
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
                <div className='right'>
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
 
export default DetailsClass;