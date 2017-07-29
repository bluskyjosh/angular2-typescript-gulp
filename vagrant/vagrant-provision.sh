#!/bin/bash

# Config
vagrant_dir=/vagrant
vagrant_conf_dir=vagrant
random_pw=false
vagrant_nginx=vagrant-nginx.conf
packages="nginx-full nodejs npm"
global_npm_packages="gulp gulp-cli typescript"
remote_ip=$(ip route get 8.8.8.8 | head -n1 | cut -d' ' -f3)
for ifname in enp0s3 eth0 ; do
  local_ip=$(ip -4 -o addr show $ifname | cut -d' ' -f7 | cut -d'/' -f1) 
  if [ ! -z $local_ip ] ; then
    break
  fi
done


# Doing the work
cd $vagrant_dir

if [ -f .env ] ; then
  has_env=true
  . .env
fi

apt-get update && apt-get install -y $packages

#create system link between nodejs and node
ln -s /usr/bin/nodejs /usr/bin/node

#install global node packages
npm i -g $global_npm_packages


# If $vagrant_conf_dir/$vagrant_nginxexists, add it to the NGINX config and do PHP setup as well
if [ -e $vagrant_conf_dir/$vagrant_nginx ] ; then
  cp $vagrant_conf_dir/$vagrant_nginx /etc/nginx/sites-available/
  # cp $vagrant_conf_dir/$vagrant_nginx_ssl /etc/nginx/sites-available/
  rm /etc/nginx/sites-enabled/default
  ln -s ../sites-available/$vagrant_nginx /etc/nginx/sites-enabled/
  # ln -s ../sites-available/$vagrant_nginx_ssl /etc/nginx/sites-enabled/
fi

echo Machine is up with IP address: $local_ip
