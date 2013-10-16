requirejs.config({
	shim: {

		'lib/d3.v3.min' : {
			exports: 'd3'
		},

		'lib/hashtable' : {
			exports: 'Hashtable'
		},

		'lib/Font' : {
			exports: 'Font'
		}
	}
});

require( [ 'lib/Font', 'lib/hashtable', 'lib/d3.v3.min' ], function( Font, HashTable, d3 ) {

	var font = new Font();

	font.onload = function() {

		console.log( font );
	}

	font.fontFamily = "Ubuntu";
	font.src = font.fontFamily;
});
