<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="utf-8">
		<title>Massey Architecture Explorer D3 Experiment</title>
		<link href='styles/main.css' rel='stylesheet' type='text/css'>
	</head>
<body>
<%
	final java.io.File[] files = new java.io.File(
			request.getRealPath( "data" )
		)
		.listFiles();
%>

	<table>
<%
	for ( int i = 0 ; i < files.length ; i++ ) {
%>

		<tr>
			<td>
				<a href="render.html?data=<%= files[ i ].getName() %>"><%= files[ i ].getName() %></a>
			</td>
		</tr>
<%
	}
%>
	</table>
</body>
</html>