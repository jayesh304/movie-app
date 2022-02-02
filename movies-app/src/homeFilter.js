// Functional Filter component created to practice.
import React, { Component, useState } from 'react';
import { Button, Card, CardActions, CardContent, Checkbox, FormControl, Input, InputLabel, ListItemText, MenuItem, Select, TextField, Typography } from '@material-ui/core';
import { createTheme } from '@material-ui/core/styles';
import genres from './common/genre';
import artists from './common/artists';

const Filter = (props) => {
    const theme = createTheme();
    const filterStyle = {margin: theme.spacing.unit, color: theme.palette.primary.light, 
        minWidth: '240px', maxWidth: '240px'}
    
    const [genre, setGenre] = useState(genres);
    const [artist, setArtist] = useState(artists);

    const [genrelist, setGenreList] = useState([]);
    const [artistlist, setArtistList] = useState([]);

    const handleChangeGenre = (event) => {
        const { target: { value }, } = event;
        setGenreList( value);
        console.log("Selected Genres: ",genrelist);
    };

    const handleChangeArtist = (event) => {
        const { target: { value }, } = event;
        
        setArtistList(value);
        console.log("Selected Artists: ",artistlist);
    };

    const handleApplyFilter = (item) => {
        
    }

    return ( <div className='right filter'>
        <Card style={filterStyle}>
            <CardContent >
                <Typography gutterBottom style={{fontWeight: 300}}>FIND MOVIES BY: </Typography>

                    <FormControl variant="standard" margin='dense' fullWidth>
                        <InputLabel htmlFor="name">Movie Name</InputLabel>
                        <Input id="name" />
                    </FormControl>
                    <FormControl variant="standard" margin='dense' fullWidth>
                        <InputLabel htmlFor="genre-multiple-checkbox-label">Genre</InputLabel>
                        <Select id='select-genre' label='Genres' labelId='genre-multiple-checkbox-label'
                                multiple input={<Input id="genre-multiple" />}
                                renderValue={(selected) => selected.join(',')}
                                value={genrelist}
                                onChange={handleChangeGenre} >
                            {
                                genre.map(item => (
                                    <MenuItem key={item.id} value={item.name}>
                                        <Checkbox checked={genrelist.indexOf(item.name) > -1} />
                                        <ListItemText primary={item.name} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" margin='dense' fullWidth>
                        <InputLabel htmlFor="artist-multiple-checkbox-label">Artists</InputLabel>
                        <Select id='select-artist' label='Artists' labelId='artist-multiple-checkbox-label'
                                multiple input={<Input id="artist-multiple" />}
                                renderValue={(selected) => selected.join(',')}
                                value={artistlist}
                                onChange={handleChangeArtist}>
                            {
                                artist.map(item => (
                                    <MenuItem key={item.first_name} value={item.first_name+" "+item.last_name}>
                                        <Checkbox checked={artistlist.indexOf(item.first_name+" "+item.last_name) > -1} />
                                        <ListItemText primary={item.first_name+" "+item.last_name} />
                                    </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                    <FormControl variant="standard" margin='dense' type='date' fullWidth>
                        <TextField id='dateFrom' label='Release Date Start' InputLabelProps={{shrink: true}} type='date'></TextField>
                    </FormControl>
                    <FormControl variant="standard" margin='dense' type='date' fullWidth>
                        <TextField id='dateTo' label='Release Date End' InputLabelProps={{shrink: true}} type='date'></TextField>
                    </FormControl>
                </CardContent>
                <CardActions>
                    <Button variant="contained" color='primary' fullWidth>Apply</Button>
                </CardActions>
        </Card>
    </div> );
}
 
export default Filter;