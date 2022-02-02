class HomeClass extends Component {
    constructor() {
        super();
        this.state = {
            movies: moviesData,
            movieName: "",
            genres: [],
            artists: [],
            genresList: [],
            artistsList: [],
            releaseDateStart: "",
            releaseDateEnd: "",
        }
    }

    movieNameChangeHandler = event => {
        this.setState({ movieName: event.target.value });
    }

    //function to convert ISO date into 'Day Month Date Year - e.g. Wed Aug 11 2017' format.
    releaseDate = (releaseDate) =>{
        let release_date = new Date(releaseDate);
        let date = release_date.toDateString();
        return "Release Date: "+date;
    }

    //function to store selected Genres values
    genreSelectHandler = event => {
        this.setState({ genres: event.target.value });
        console.log("Genres: ",this.state.genres);
    }

     //function to store selected Artists values
    artistSelectHandler = event => {
        this.setState({ artists: event.target.value });
        console.log("Artists: ",this.state.artists);
    }

    //function to apply filters on button click.
    filterApplyHandler = (movie) => {
       const filterGenre = this.state.movies.filter(g => g.genres == movie.genre);
       const filterArtist = this.state.movies.filter(a => a.artists == movie.artist);
       const releaseStartDate = this.state.movies.filter(sd => sd.release_date == movie.releaseDateStart);    
    }

    //function to store release start date
    releaseDateStartHandler = event => {
        this.setState({ releaseDateStart: event.target.value });
    }

    //function to store release start date
    releaseDateEndHandler = event => {
        this.setState({ releaseDateEnd: event.target.value });
    }

    movieClickHandler = (movieId) => {
        this.props.history.push('/movie/' + movieId);
    }

    render() { 
        const theme = createTheme(); 
        const selectedGenre = this.state.genresList;
        const selectedArtist = this.state.artistsList;
        //const isAllSelectedGenre = genre.length > 0 && selectedGenre.length === genre.length;

        const filterStyle = {margin: theme.spacing.unit, color: theme.palette.primary.light, 
             minWidth: '240px', maxWidth: '240px'}
        
        return (<div className='container'>
            <Header />
            <div className='heading'>
                <span>Upcoming Movies</span>
            </div>

            {/* Div for Single Row ImageList */}
            <div className='gird-list-container'>
                <ImageList className='grid-list' cols={6} >
                {
                    this.state.movies.map(tile => (
                        <ImageListItem key={tile.id} rowHeight={250}>
                            <img src={tile.poster_url} alt={tile.title}/>
                            <ImageListItemBar title={tile.title} />
                        </ImageListItem>
                    ))
                }
                </ImageList>
            </div>

            {/* Div divided into two parts - released movies(left) and filter(right) */}
            <div className='flex-container'>
                <div className='left'>
                    <ImageList className='release-list' cols={4} gap={30} rowHeight={350}>
                    {
                        this.state.movies.map(tile => (
                            <ImageListItem className='release-tiles' key={tile.id}>
                                <img src={tile.poster_url} alt={tile.title}/>
                                <ImageListItemBar title={tile.title} subtitle={this.releaseDate(tile.release_date)}/>
                            </ImageListItem>
                        ))
                    }
                    </ImageList>
                </div>
                <div className='right'>
                    <Card style={filterStyle}>
                        <CardContent >
                            <Typography gutterBottom style={{fontWeight: 300}}>FIND MOVIES BY: </Typography>

                            {/*movie name enter input*/}
                            <FormControl variant="standard" margin='dense' fullWidth>
                                <InputLabel htmlFor="name">Movie Name</InputLabel>
                                <Input id="name" onChange={this.movieNameChangeHandler}/>
                            </FormControl>

                            {/*genre select input*/}
                            <FormControl variant="standard" margin='dense' fullWidth>
                                <InputLabel htmlFor="genre-multiple-checkbox">Genre</InputLabel>
                                <Select multiple input={<Input id="genre-multiple-checkbox" />}
                                        renderValue={(selected) => selected.join(',')}
                                        value={this.state.genres}
                                        onChange={this.genreSelectHandler}>
                                        {
                                            genres.map(genre => (
                                            <MenuItem key={genre.id} value={genre.name}>
                                                <Checkbox checked={this.state.genres.indexOf(genre.name) > -1} />
                                                <ListItemText primary={genre.name} />
                                            </MenuItem>
                                        ))}
                                    
                                </Select>
                            </FormControl>

                            {/*artist select input*/}
                            <FormControl variant="standard" margin='dense' fullWidth>
                                <InputLabel htmlFor="artist-multiple-checkbox">Artists</InputLabel>
                                <Select multiple input={<Input id="artist-multiple-checkbox" />}
                                        renderValue={(selected) => selected.join(',')}
                                        value={this.state.artists}
                                        onChange={this.artistSelectHandler}>
                                    {
                                        artists.map(artist => (
                                        <MenuItem key={artist.id} value={artist.first_name + " " + artist.last_name}>
                                            <Checkbox checked={this.state.artists.indexOf(artist.first_name + " " + artist.last_name) > -1} />
                                            <ListItemText primary={artist.first_name + " " + artist.last_name} />
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>

                            {/*release start date input*/}
                            <FormControl variant="standard" margin='dense' type='date' fullWidth>
                                <TextField id='dateFrom' label='Release Date Start' InputLabelProps={{shrink: true}} 
                                    type='date' defaultValue="" onChange={this.releaseDateStartHandler}></TextField>
                            </FormControl>

                            {/*release end date input*/}
                            <FormControl variant="standard" margin='dense' type='date' fullWidth>
                                <TextField id='dateTo' label='Release Date End' InputLabelProps={{shrink: true}} 
                                    type='date' defaultValue="" onChange={this.releaseDateEndHandler}></TextField>
                            </FormControl>

                            <br /><br />
                            {/*button to apply filters*/}
                            <FormControl fullWidth>
                                <Button onClick={() => this.filterApplyHandler()} variant="contained" color="primary">
                                    APPLY
                                </Button>
                            </FormControl>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>);
    }
}
 
export default HomeClass;