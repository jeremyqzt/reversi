#!/bin/bash

cp systemd/*.service /lib/systemd/system
systemctl unmask nodeDb
systemctl unmask reversi
systemctl enable nodeDb
systemctl enable reversi
systemctl start nodeDb

mkdir -p /etc/reversi
cp systemd/uwsgi_params /etc/reversi/

cp systemd/nginx.conf /etc/nginx/sites-available/reversi.conf
ln -sf /etc/nginx/sites-available/reversi.conf /etc/nginx/sites-enabled/
systemctl reload nginx
