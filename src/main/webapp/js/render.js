requirejs.config({

	paths : {
		'jquery' : '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min',
		'jquery.url' : '//cdn.jsdelivr.net/jquery.url.parser/2.2.1/purl',
		'd3' : 'lib/d3.v3.min',
		'hashtable' : 'lib/hashtable',
		'font' : 'lib/Font',
		'fontdetect' : '//www.lalit.org/wordpress/wp-content/uploads/2008/05/fontdetect.js?ver=0.3#'
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
		},

		'fontdetect' : {
			exports: 'Detector'
		}
	}
});

require( [ 'graph', 'font', 'fontdetect', 'hashtable', 'd3', 'jquery', 'jquery.url' ], function( Graph, Font, Detector, HashTable, d3, $ ) {

	var data = $.url().param( 'data' );
	var instrument = $.url().param( 'instrument' );
	var threshold = $.url().param( 'threshold' ) || 0.03;
	var width = $.url().param( 'width' ) || window.innerWidth;
	var height = $.url().param( 'height' ) || window.innerHeight;

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
			var graph = new Graph( width, height, dataset );

			/* Instrument */
			if ( instrument == 'yes' ) {

				var numOfNodes = dataset.nodes.length;
				var numOfEdges = dataset.edges.length;

				var start;
				graph.setInstrument( function() {

					var Point = function( x, y ) {

						this.x = x;
						this.y = y;
					};

					Point.prototype = {

							d2 : function( point ) {

								Δx = point.x - this.x;
								Δy = point.y - this.y;

								return ( Δx * Δx ) + ( Δy * Δy );
							}
					};

					var stable = false;
					var previousPoints = new Hashtable();

					return function( nodes ) {

						if ( stable ) {
							return;
						};

						var points = new Hashtable();

						/* Sanity Check */
						if ( previousPoints.isEmpty() ) {
							nodes.each( function( node ) {
								previousPoints.put( node, new Point( node.x, node.y ) );
							});
							return;
						};

						/* Calculate Points */
						var total = 0;
						nodes.each( function( node ) {
							var previousPoint = previousPoints.get( node );
							var point = new Point( node.x, node.y );

							total = total + previousPoint.d2( point );

							points.put( node, point );
						});

						if ( total / nodes.size() < threshold ) {
							stable = true;
							console.log( 'Nodes:' + numOfNodes );
							console.log( 'Edges:' + numOfEdges );
							console.log( 'Time: ' + ( new Date().getTime() - start ) + 'ms' );
							console.log( 'Threshold: ' + threshold )
							return;
						};

						/* Update Previous */
						previousPoints = points;
					};
				}());

				start = new Date().getTime();
			};

			/* Render */
			graph.doRender( d3.select('body') );
		});
	}

	/* Kick off */
	font.fontFamily = function() {
		var detective = new Detector();
		var fonts = $('body').css( 'font-family' ).split(',');

		for ( i in fonts ) {
			var font = fonts[ i ];
			if ( detective.detect( font ) ) {
				return font;
			};
		};
	}();

	font.src = font.fontFamily;
});
