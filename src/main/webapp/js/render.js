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

require( [ 'graph', 'font', 'hashtable', 'd3', 'jquery', 'jquery.url' ], function( Graph, Font, HashTable, d3, $ ) {

	var data = $.url().param( 'data' );

	var fontSize = 12;
	var labelPadding = 50;

	var font = new Font();

	font.onload = function() {

		/* Load data */
		d3.json( 'data/' + data, function( error, dataset ) {

			/* Sanity Check */
			if ( error ) {
				throw( 'Failed to load ' + data );
			};

			console.log( 'Loaded ' + data );

			/* Calculate Node widths */
			for ( i in dataset.nodes ) {
				var node = dataset.nodes[ i ];
				node.width = font.measureText( node.localname, fontSize ).width + labelPadding;
			};

			/* Create graph */
			var graph = new Graph( window.innerWidth, window.innerHeight, dataset );

			/* Render */
			graph.doRender( d3.select('body') );
		});
	}

	/* Kick off */
	font.fontFamily = 'Ubuntu';
	font.src = font.fontFamily;
});
