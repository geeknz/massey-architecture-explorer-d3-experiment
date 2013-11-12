package nz.ac.massey.cs.experimentation.d3;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import nz.ac.massey.cs.experimentation.d3.db.DatabaseConfiguration;
import nz.ac.massey.cs.experimentation.d3.models.Result;

import com.google.gson.Gson;
import com.j256.ormlite.dao.Dao;

import eu.bitwalker.useragentutils.UserAgent;

public class Results extends HttpServlet {

	private Gson gson;

	private Dao<Result, Integer> dao;

	private static final long serialVersionUID = -6457331620295235812L;

	@Override
	protected void doGet( final HttpServletRequest request, final HttpServletResponse response ) throws ServletException, IOException {

		try {

			response.setContentType( "application/json" );
			gson.toJson( dao.queryForAll(), response.getWriter() );

		} catch ( final SQLException e ) {

			throw new IOException( e );
		}
	}

	@Override
	protected void doPost( final HttpServletRequest request, final HttpServletResponse response ) throws ServletException, IOException {

		try {

			final UserAgent userAgent = new UserAgent( request.getHeader("user-agent") );
			final String dataSet = request.getParameter( "_dataSet" );
			final Double threshold = Double.valueOf( request.getParameter( "_threshold" ) );
			final Long duration = Long.valueOf( request.getParameter( "_duration" ) );

			final Result result = new Result( userAgent, dataSet, threshold, duration );

			System.out.println( result );
			dao.create( result );

		} catch ( SQLException e ) {

			throw new IOException( e );
		}
	}

	@Override
	@SuppressWarnings("unchecked")
	public void init( ServletConfig config ) throws ServletException {

		super.init( config );
		this.gson = new Gson();
		this.dao = ( Dao<Result, Integer> ) config.getServletContext().getAttribute( DatabaseConfiguration.DATA_POINT_DAO );
	}
}
