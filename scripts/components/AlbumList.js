import React, { Component } from 'react';

export default class AlbumList extends Component {
    renderAlbums () {
        const {currentGuessingAlbums: albums} = this.props;
        if (albums && albums.length> 0) {
            return (
                <ul>
                    {albums.map((album, index) => {
                        return <li key={index}>{album.name}</li>
                    })}
                </ul>

            )
        }
        return (<div></div>);
    }

    render() {
      	
        return (
            <div>
          		{this.renderAlbums()}
            </div>
        );
    }
}