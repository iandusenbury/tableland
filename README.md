# tableland

## Virtual machine software

Download and/or install Virtual Box, Vagrant, Ansible, Yarn

[Vagrant](http://downloads.vagrantup.com)

[Virtual Box](https://www.virtualbox.org/wiki/Downloads)

[Ansible](http://docs.ansible.com/ansible/latest/intro_installation.html#installing-the-control-machine)

[Yarn](https://yarnpkg.com/lang/en/docs/install/)

## Clone this repo

a common folder to put this in would be a 'workspace' folder, but wherever is fine

## Setup virtual machine

This will setup the machine and install rails, this may take a while

````
cd ~/workspace/tableland
vagrant up
````

## Install backend dependencies and start the server
````
vagrant ssh
bundle install
rails s
````

## Install frontend dependencies and start the server

In a new terminal window

```
cd client && yarn start
```

navigate to localhost:3000 in your web browser
