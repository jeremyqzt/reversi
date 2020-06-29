# Reversi

## Server Aspect
This server is based off of django. Go to the server directory and run:
```
cd /server/reversiServer/
pipenv shell
python manage.py runserver
```

## DB Server Aspect
This db server is a simple in-memeory db for storing game states. It will be managed internally using plain http post/gets. 3 instances are spun up based on the config file.
The logic of which DB to use will be decided by the django server.

Go to the db server direction and run:
```
cd  nodeDb
node ./dbStarter.js
```

## FrontEnd

The frontend is based off of React, it sits in the project root. Run it using
```
npm start
```

