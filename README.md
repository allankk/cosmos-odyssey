# Cosmos Odyssey

## General Information
This assignment project sets up a Web App with both a front-end (using React) and back-end (Node) part. The back-end connects to a MongoDB database.
The Web App shows different routes and deals to travel within the solar system. The price list is updated periodically and got from an API endpoint. Users can book different flights to their names, which is then written into the database.

## Technologies used
1. React >=16.8
2. MongoDB >=4.8.1
3. NodeJS >=17.5.0
4. Express >= 4.18.1
5. TailwindCSS >= 3.1.7

## How-to
1. ```npm install``` inside the /client directory.
2. ```npm install``` inside the /server directory.
3. OPTIONAL: Update the database connection credentials in /server/config.json. A default MongoDB URL for the current project is already given, which works but will be taken offline at some point.
4. ```npm start``` inside the /server directory to start the server
5. ```npm start``` inside the /client directory to start the React app.
6. Navigate to localhost:3000 to see the app!

## Database configuration guide
- Database configuration is done in /server/config.json
- To use a local instance of a MongoDB database:
    - set "useLocalDB" to true
    - Configure the host and port credentials in the "localDB" object
    - A database must be created before running the server. Set the "dbName" accordingly.
- To use a remote instance of a MongoDB database (ie MongoDB Atlas):
    - set "useLocalDB" to false (default)
    - Configure "remoteDBURL" to use your remote database

## Additional notes
- Since the assignment was relatively time-consuming (though thoroughly interesting), I did not spend much extra time writing automated tests or taking care of edge cases.
- If the server is started on a new and empty *remote* server, it may send an error message and fail the first time (asynchronous issue). Simply run it again if it happens and everything should work.