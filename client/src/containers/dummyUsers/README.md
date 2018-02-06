# API Call Demo

See screenshots below if you want to skip the demo.

## Instructions
* Start VM with vagrant up, then ssh.
* Execute "rails db:migrate" to create the new dummies table.
```
rails db:migrate
```
* Execute "rails db:seed" to populate dummies table with data we received from Tong.
```
rails db:seed
```
* Start the server
```
rails server
```
* New terminal, navigate to client folder, and start the client server
```
yarn start
```
* Navigate to localhost:5000/dummies to see the raw JSON
```
localhost:5000/dummies
```
* In another tab/window, navigate to localhost:3000/dummy-users to see a copy of the Search Results page, populated with the data from the rails DB
```
localhost:3000/dummy-users
```

## Backend
* New "dummies" table
  * contains data from the "database" Tong gave us

## Frontend
* Added this new folder, which is the same as the Search Results page, only slightly modified which data is displayed.
  * Access this page after "yarn start"
* New action: fetchDummyUsersExample(), view ![here](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/actions/index.js).
  * This is the same as the fetchExample(), only the endpoint is different ('/dummies').
* New reducer: dummyUsers, view ![here](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/modules/reducer/dummyUsers.js).
  * This is the same as the example reducer, only the state is an array of users.

## Screenshots
* Picture of Search Results
![Picture of Search Results](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/containers/dummyUsers/Screenshots/search-results-with-data-from-rails-DB.png)

* Picture of JSON Payload
![Picture of JSON Payload](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/containers/dummyUsers/Screenshots/JSON-data.png)

* Picture of rails migrate and seed
![Picture of rails migrate and seed](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/containers/dummyUsers/Screenshots/rails-migrate-and-seed.png)

* Picture of rails server with receiving the GET request
![Picture of rails server with receiving the GET request](https://github.com/iandusenbury/tableland/blob/playground/mballeza_API_demo/client/src/containers/dummyUsers/Screenshots/start-server-and-receive-get-request.png)
