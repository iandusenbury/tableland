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

The api is being served on localhost:5000. As an example you can go to
localhost:5000/api/v1/example in your browser to see a json response

## Install frontend dependencies and start the server

In a new terminal window and on your development machine (not in vagrant)

cd into directory and install dependencies

```
cd client && yarn
```

start the server

```
yarn start
```

This should automatically open your browser to localhost:3000

## Team Members
* Ian Dusenbury
* Theodore Mason
* Matthew Balleza
* Dan Crayne
