Massey Architecture Explorer Experiment
=======================================

Live Demo
---------
The Latest build can be found at [http://d3.nerd.bd.to/](http://d3.nerd.bd.to/)

Links
-----
* [Requirements](https://docs.google.com/a/nerd.bd.to/document/d/1QPjNyesY2VLFn1Q98e80B-Now5DjCZ4BHKcYsgdeuS0/)
* [Massey Architecture Explorer](http://xplrarc.massey.ac.nz/)


Building the Application
------------------------
The application can be built using [Gradle](http://xplrarc.massey.ac.nz/). For example,

```
#!bash
gradle build # creates a war file in the build directory
```

Additionally, you can run the application directly using jetty. For example,
```
#!bash
gradle jettyRun # starts jetty
```

In order to stop jetty you have to run the jettyStop task in another shell. For example,
```
#!bash
gradle jettyStop # stops jetty
```
