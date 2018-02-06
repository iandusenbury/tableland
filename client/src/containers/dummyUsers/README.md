# API Call Demo

## Backend
* New "dummies" table
  * contains data from the "database" Tong gave us

## Frontend
* Added this new folder, which is the same as the Search Results page, only slightly modified which data is displayed.
* New action: fetchDummyUsersExample(), view ![here](https://github.com/iandusenbury/tableland/blob/features/playground/mballeza_API_demo/client/src/actions/index.js).
  * This is the same as the fetchExample(), only the endpoint is different ('/dummies').
* New reducer: dummyUsers, view ![here](https://github.com/iandusenbury/tableland/blob/features/playground/mballeza_API_demo/client/src/modules/reducer/dummyUsers.js).
  * This is the same as the example reducer, only the state is an array of users.

## Screenshots
* Picture of JSON Payload
![Picture of JSON Payload](https://github.com/iandusenbury/tableland/blob/features/playground/mballeza_API_demo/client/src/containers/Screenshots/JSON-data.png)
* Picture of rails migrate and seed
![Picture of rails migrate and seed](https://github.com/iandusenbury/tableland/blob/features/playground/mballeza_API_demo/client/src/containers/Screenshots/rails-migrate-and-seed.png)
* Picture of rails server with receiving the GET request
![Picture of rails server with receiving the GET request](https://github.com/iandusenbury/tableland/blob/features/playground/mballeza_API_demo/client/src/containers/Screenshots/start-server-and-receive-get-request.png)
