import React, { Component } from 'react';

export default class GameContent extends Component {
    constructor(props) {
        super(props);
        this.state = {value: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
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

    handleSubmit(event) {
        const {onSubmit} = this.props;
        event.preventDefault();
        onSubmit(this.state.value);
        this.setState({
            value: '' 
        });
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    getHint() {
        const {albumImageHint, isDisplayHint} = this.props;
        if (isDisplayHint && albumImageHint) {
            return (
                <div className="hintContent">
                    <span className="hint">Hint: </span>
                    <img src={albumImageHint} alt="http://is3.mzstatic.com"/>
                </div>
            )
        }
    }

    render() {
        const {pointsForThisRound: points} = this.props;
        return (
            <div className="gameContent">
                <div className="interactiveBoard">
                    <div>
                        <span>For {points} points</span>
                        
                    </div>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Who's The Artist? (enter full name) 
                        </label>
                        <input type="text" value={this.state.value} onChange={this.handleChange}/>
                        <input type="submit" value="Submit" />
                    </form>
                </div>
                {this.getHint()}
            </div>
        );
    }
}