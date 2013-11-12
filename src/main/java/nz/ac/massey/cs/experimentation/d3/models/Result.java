package nz.ac.massey.cs.experimentation.d3.models;

import java.io.Serializable;

import com.j256.ormlite.field.DataType;
import com.j256.ormlite.field.DatabaseField;

import eu.bitwalker.useragentutils.UserAgent;

/**
 * Class representing a result
 * 
 * @author Colin Campbell
 */
public class Result implements Serializable {

	/**
	 * The results unique identifier
	 */
	@DatabaseField( generatedId = true )
	private Integer identity;

	/**
	 * The data set the result came from
	 */
	@DatabaseField
	private final String dataSet;

	/**
	 * The threshold used for this result
	 */
	@DatabaseField
	private final Double threshold;

	/**
	 * The duration to stabilize (ms)
	 */
	@DatabaseField
	private final Long duration;

	/**
	 * The user agent details for this result
	 */
	@DatabaseField( dataType=DataType.SERIALIZABLE )
	private final UserAgent userAgent;

	/**
	 * Serial Version Unique Identifier
	 */
	private static final long serialVersionUID = -7608226570324466146L;

	/**
	 * Constructs a new Result with null values
	 */
	protected Result() {

		this.userAgent = null;
		this.dataSet = null;
		this.threshold = null;
		this.duration = null;
	}

	/**
	 * Constructs a new Result with the specified details
	 */
	public Result( final UserAgent userAgent, final String dataSet, final Double threshold, final Long duration ) {

		this.userAgent = userAgent;
		this.dataSet = dataSet;
		this.threshold = threshold;
		this.duration = duration;
	}

	/**
	 * Gets the unique identity for the result
	 *
	 * @return the identity
	 */
	public Integer getIdentity() {

		return identity;
	}

	/**
	 * Gets the data set for this result
	 *
	 * @return the name of the data set
	 */
	public String getDataSet() {

		return dataSet;
	}

	/**
	 * Gets the threshold for this result
	 *
	 * @return the threshold
	 */
	public Double getThreshold() {

		return threshold;
	}

	/**
	 * Gets the duration for this result
	 *
	 * @return the duration
	 */
	public Long getDuration() {

		return duration;
	}

	/**
	 * Gets the user agent for this result
	 *
	 * @return the user agent
	 */
	public UserAgent getUserAgent() {

		return userAgent;
	}
}
