requirejs.config({

	paths : {
		'jquery' : '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
		'jquery.url' : '//cdn.jsdelivr.net/jquery.url.parser/2.2.1/purl',
		'd3' : 'lib/d3.v3.min',
		'hashtable' : 'lib/hashtable',
		'font' : 'lib/Font'
	},

	shim: {

		'jquery' : {
			exports : 'jQuery'
		},

		'jquery.url' : {
			deps: ['jquery']
		},

		'd3' : {
			exports: 'd3'
		},

		'hashtable' : {
			exports: 'Hashtable'
		},

		'font' : {
			exports: 'Font'
		}
	}
});

require( [ 'font', 'hashtable', 'd3', 'jquery', 'jquery.url' ], function( Font, HashTable, d3, $ ) {

	var data = $.url().param( 'data' );

	var font = new Font();

	font.onload = function() {

		console.log( font );
	}

	font.fontFamily = "Ubuntu";
	font.src = font.fontFamily;
});
