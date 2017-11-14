# tableland

## Virtual machine software

Download and install Virtual Box, Vagrant

[Vagrant](http://downloads.vagrantup.com)

[Virtual Box](https://www.virtualbox.org/wiki/Downloads)

## Clone this repo

a common folder to put this in would be a 'workspace' folder, but wherever is fine

## Setup virtual machine

````
cd ~/workspace/tableland
vagrant Up
````

## Install nvm (node version manager) and node
````
vagrant ssh
cd ~
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
source ~/.bashrc
nvm install node
````

## Set the machine to cd into the vagrant shared folder upon ssh

while still in virtual machine

````
grep -q "cd /vagrant" .bashrc || echo "cd /vagrant" >> .bashrc
````

## Install dev dependencies
````
cd /vagrant
npm install
````

## Hello world
````
node index.js
````

navigate to localhost:3000 in your web browser
