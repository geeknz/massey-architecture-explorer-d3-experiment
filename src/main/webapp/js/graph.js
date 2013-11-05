define( ['d3'], function( d3 ) {

	var EMPTY_FUNC = function() {
		return;
	};

	function Graph ( width, height, data ) {

		this.width = width;
		this.height = height;
		this.data = data;
		this.instrument = EMPTY_FUNC;
	};

	Graph.prototype = {

		setWidth : function( width ) {
			this.width = width;
		},

		getWidth : function() {
			return this.width;
		},

		setHeight : function( height ) {
			this.height = height;
		},

		getHeight : function() {
			return this.height;
		},

		setData : function( data ) {
			this.data = data;
		},

		getData : function() {
			return this.data;
		},

		setInstrument : function( instrument ) {
			this.instrument = instrument;
		},

		doRender : function( container ) {

			var force = d3.layout.force()
				.charge( -300 )
				.linkDistance( 300 )
				.size( [ this.width, this.height ] );

			var svg = container.append("svg:svg")
				.attr( 'width', this.width )
				.attr( 'height', this.height );

			force.nodes( this.data.nodes )
				.links( this.data.edges)
				.start();

			var edges = svg.selectAll( '.edge' )
				.data( this.data.edges )
				.enter()
				.append("svg:line")
				.attr("class", "edge");

			var nodes = svg.selectAll( 'g' )
				.data( this.data.nodes )
				.enter()
				.append( 'svg:g' )
				.on( 'click', function() {

					/* Move to Front */
					d3.select( this )
						.each( function() {
							this.parentNode.appendChild( this );
						}
					);
				})
				.call( force.drag );

			// Main Box
			nodes.append( 'svg:rect' )
				.attr( 'class', '.node')
				.attr( 'width', function( node ) {
					return node.width;
				})
				.attr( 'height', 60 )
				.style( 'fill', '#ffffc7')
				.style( 'stroke', '#000')
				.style( 'stroke-width', 1);

			// Line
			nodes.append( 'svg:line' )
				.attr( 'x1', 0 )
				.attr( 'y1', 25 )
				.attr( 'x2', function( node ) {
					return node.width;
				})
				.attr( 'y2', 25 )
				.style( 'stroke', '#000' )
				.style( 'stroke-width', 1 );

			// Text
			nodes.append( 'svg:text' )
				.attr( 'x', 25 )
				.attr( 'y', 15 )
				.attr( 'class', '.label' )
				.text( function( node ) {
					return node.localname;
				});

			var that = this;
			force.on( 'tick', function() {

				that.instrument( nodes, edges );
				edges.attr( 'x1', function( edge ) {
					return edge.source.x;
				})

				.attr( 'y1', function( edge ) {
					return edge.source.y;
				})

				.attr( 'x2', function( edge ) {
					return edge.target.x;
				})

				.attr( 'y2', function( edge ) {
					return edge.target.y;
				});

				nodes.attr( 'transform', function( node ) {
					return 'translate(' + ( node.x - 50 ) + ',' + ( node.y - 30 ) + ')';
				});

			});
		}
	};

	return Graph;
});
