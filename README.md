# tableland

## Virtual machine software

Download and install Virtual Box, Vagrant, Ansible

[Vagrant](http://downloads.vagrantup.com)

[Virtual Box](https://www.virtualbox.org/wiki/Downloads)

[Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html#installing-the-control-machine)

## Clone this repo

a common folder to put this in would be a 'workspace' folder, but wherever is fine

## Setup virtual machine

This will setup the machine and install rails, this may take a while

````
cd ~/workspace/tableland
vagrant Up
````

## Install dev dependencies
````
bundle install
````

## Run Server
````
rails s
````

navigate to localhost:3000 in your web browser
