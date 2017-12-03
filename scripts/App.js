import React, { Component } from 'react';

import AlbumList from './components/AlbumList';
import GameContent from './components/GameContent';
import config from './configuration/config'

export default class App extends Component {
    
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }

    componentWillMount() {
        this.setState({
            roundNumber: 1,
            pointsEarned: 0,
            attempts: 1,
            indexArtistList: 0,
            indexAlbumList: 0,
            artist: '',
            albumsToDisplay: 1

        });
        this.getAlbumsData();
    }

    getAlbumsData() {
        const {artist_list} = config;
        const tempIndex = this.state && this.state.artist ? 
            this.state.indexArtistList % artist_list.length : 
            Math.ceil(Math.random() * (artist_list.length - 1));

        const entityType = 'album';
        const entity = 'entity';
        const term = 'term';
        const termType = artist_list[tempIndex].replace(' ', '+');

        const xhr = new XMLHttpRequest(); 
        const url = `https://itunes.apple.com/search?${entity}=${entityType}&${term}=${termType}`;

        xhr.open('GET',url, true);
        xhr.setRequestHeader("Access-Control-Allow-Methods", "Origin");
        xhr.setRequestHeader("Content-Type", "application/jsonp");
        xhr.onload = () => {  
            if (xhr.status === 200) {
              const results = JSON.parse(xhr.response).results;
              const albums = results.map((result) => {
                return {name: result.collectionName, art: result.artworkUrl100};
              });
              this.setState({
                  albums,
                  artist: artist_list[tempIndex]
              });
            } else {
              console.error(xhr.statusText);
            }
        }  
        xhr.onerror = (e) => {
            console.error(xhr.statusText);
        };
        xhr.send(null);
    }

    handleSubmit(guess) {
        const {point_per_round, max_number_of_attempts} = config;
        const {artist, roundNumber, attempts, indexArtistList, indexAlbumList, albumsToDisplay} = this.state;
        let points = this.state.pointsEarned;

        if ((artist.replace(/ /g, '', '')).localeCompare(guess.toLowerCase().trim().replace(/ /g, '', '')) === 0) {
            points += point_per_round[attempts];
            this.setState({
                pointsEarned: points,
                roundNumber: roundNumber + 1,
                attempts: 1,
                indexArtistList: indexArtistList + 1,
                albumsToDisplay: 1
            }, ...this.state);
            this.getAlbumsData();
        } else {
            if (attempts === max_number_of_attempts) {
                this.setState({
                    attempts: 1,
                    roundNumber: roundNumber + 1,
                    indexArtistList: indexArtistList + 1,
                    indexAlbumList: 0,
                    albumsToDisplay: 1
                }, ...this.state);
                this.getAlbumsData();
            } else {
                this.setState({
                    attempts: attempts + 1,
                    indexAlbumList: indexAlbumList + albumsToDisplay,
                    albumsToDisplay: albumsToDisplay + 1

                }, ...this.state);
            }
        }
        console.log("handleSubmit");
    }

    getDisplayAlbums() {
        // const {albumsToDisplay} = config;
        const {albums, albumsToDisplay} = this.state;
        let displayAlbums = [];
        for (let index = this.state.indexAlbumList; index < this.state.indexAlbumList + albumsToDisplay; index++) {
           displayAlbums.push(albums[index % albums.length]);
            
        }
        return displayAlbums;

    }

    getScore() {
        const {game_rounds} = config;
        const {roundNumber, pointsEarned: score} = this.state;
        if (roundNumber === game_rounds) {
            return (
                <div  className="score">
                    <span>Your Total Score: </span>
                    <span className="score__result">{score}</span>
                </div>
            );
        }
        return (<div></div>);
    }

    getContentMarkup() {
        const {point_per_round, game_rounds} = config;
        const {albums, roundNumber = 1, attempts} = this.state;
        let currentGuessingAlbums = [];
        let albumImageHint= '';
        let pointsForThisRound = 0;
        const isDisplayHint = (attempts === 3) ? true : false; 
        if (albums) {
            currentGuessingAlbums = this.getDisplayAlbums();
            albumImageHint = albums[this.state.indexAlbumList].art;
        }
        if (this.state.roundNumber) {
            pointsForThisRound = point_per_round[this.state.attempts];
        }
        if (roundNumber === game_rounds) {
            return (<div></div>);
        } else {
            return (
                <div className="content">
                    <h1>Round: {roundNumber}</h1>
                    <div className="albumList">    
                        <AlbumList 
                            currentGuessingAlbums={currentGuessingAlbums} />
                    </div>           
                    <GameContent 
                        albumImageHint={albumImageHint}
                        isDisplayHint={isDisplayHint}
                        pointsForThisRound={pointsForThisRound}
                        onSubmit={this.handleSubmit} />
                </div>
            )
        }
    }

    render() {        
        return (
        <div >
            <header className="headerTitle">Guess the artist</header>
            {this.getContentMarkup()}    
            {this.getScore()}
        </div>
    );
}
}
