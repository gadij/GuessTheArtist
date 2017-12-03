const NUMBER_OF_ROUNDS = 5;
const POSSIBLE_SCORES_PER_ROUND = [5, 3, 1];


const config = {
	artist_list: [
	    'linkin park', 'jack johnson', 'led zeppelin', 'scorpions', 'stevie wonder',
	    'bob marley', 'jimi hendrix', 'elvis presley', 'madonna', 'guns and roses',
	    'aerosmith', 'coldplay', 'robbie williams', 'rolling stones', 'the doors',
	    'michael jackson', 'nirvana', 'metalica', 'amy winehouse', 'whitney huston'
	],
	point_per_round: {
	    '1': POSSIBLE_SCORES_PER_ROUND[0],
	    '2': POSSIBLE_SCORES_PER_ROUND[1],
	    '3': POSSIBLE_SCORES_PER_ROUND[2]

	},
	game_rounds: NUMBER_OF_ROUNDS + 1,
	max_number_of_attempts: 3
	// max_number_of_albums_to_display: 3



}




export default config;