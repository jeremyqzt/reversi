# Reversi


## Building and installing

The frontend is based off of React, it sits in the project root. It must be built before it can be used. Install the dependencies by:
```
npm install
cd server; pip install requirements.txt; cd ..;
npm run build
```

Also remember to set a secret key using the environment variable: SECRET_KEY

## Run he server
This server is based off of django. Go to the server directory and run:
```
cd /server/reversiServer/
uwsgi --http :80 --module reversiServer.wsgi --static-map /=$(pwd)/build

```

## DB Server Aspect
This db server is a simple in-memeory db for storing game states. It will be managed internally using plain http post/gets. 3 instances are spun up based on the config file.
The logic of which DB to use will be decided by the django server.

Go to the db server direction and run:
```
cd  nodeDb
node ./dbStarter.js
```