#!/bin/bash

cp systemd/* /lib/systemd/system
systemctl unmask nodeDb
systemctl unmask reversi
systemctl enable nodeDb
systemctl enable reversi
systemctl start nodeDb
