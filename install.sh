#!/bin/bash

kill $(pidof uwsgi)

cp systemd/*.service /lib/systemd/system

systemctl unmask nodeDb
systemctl enable nodeDb
systemctl start nodeDb

mkdir -p /etc/reversi
cp systemd/uwsgi_params /etc/reversi/

cp systemd/nginx.conf /etc/nginx/sites-available/reversi.conf
ln -sf /etc/nginx/sites-available/reversi.conf /etc/nginx/sites-enabled/

cd server/reversiServer/

/home/jeremyq357/.local/bin/uwsgi \
            -s /home/jeremyq357/reversi/server/sockets/sock1 --module reversiServer.wsgi \
            --disable-logging --static-map /=/home/jeremyq357/reversi/server/reversiServer/build --chmod-socket=666 --daemonize /var/log/reversi1.log

/home/jeremyq357/.local/bin/uwsgi \
            -s /home/jeremyq357/reversi/server/sockets/sock2 --module reversiServer.wsgi \
            --disable-logging --static-map /=/home/jeremyq357/reversi/server/reversiServer/build --chmod-socket=666 --daemonize /var/log/reversi2.log

systemctl reload nginx
