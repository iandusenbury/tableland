# tableland

## Virtual machine software

Download and install Virtual Box, Vagrant

[Vagrant](http://downloads.vagrantup.com)

[Virtual Box](https://www.virtualbox.org/wiki/Downloads)

## Clone this repo

## Setup virtual machine

````
cd ~/workspace/tableland
vagrant Up
````

## Install nvm (node version manager) and node
````
vagrant ssh
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
source ~/.bashrc
nvm install node
````

# Install dev dependencies
````
cd /vagrant
npm install
````
