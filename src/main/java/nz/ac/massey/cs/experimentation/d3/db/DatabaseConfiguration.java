package nz.ac.massey.cs.experimentation.d3.db;

import java.sql.SQLException;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

import nz.ac.massey.cs.experimentation.d3.models.Result;

import com.j256.ormlite.dao.DaoManager;
import com.j256.ormlite.jdbc.JdbcConnectionSource;
import com.j256.ormlite.support.ConnectionSource;
import com.j256.ormlite.table.TableUtils;

public class DatabaseConfiguration implements ServletContextListener {

	public final static String DATA_POINT_DAO = "_DATA_POINT_DAO";

	@Override
    public void contextInitialized( ServletContextEvent sce ) {

		final String databaseURL = "jdbc:sqlite:" + sce.getServletContext().getRealPath( "data.db" );

		try {

			final ConnectionSource connectionSource = new JdbcConnectionSource( databaseURL );
			TableUtils.createTableIfNotExists( connectionSource, Result.class );

			sce.getServletContext()
				.setAttribute( DATA_POINT_DAO, DaoManager.createDao( connectionSource, Result.class ) );

		} catch ( SQLException e ) {

			throw new RuntimeException( e );
		}
    }

	@Override
    public void contextDestroyed( ServletContextEvent sce ) {

		sce.getServletContext().removeAttribute( DATA_POINT_DAO );
    }
}
