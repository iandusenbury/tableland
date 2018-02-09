# Test Suites

Run tests with yarn.
```
yarn test
```
To see code coverage, use the --coverage flag. This will write to a "client/coverage" directory, but the summary can be viewed on the console.
```
yarn test --coverage
```

## Resources Used

* enzyme: ![GitHub](https://github.com/airbnb/enzyme), http://airbnb.io/enzyme/docs/api/
  * To set up testing import the following:
  ```
  import Enzyme, { mount } from 'enzyme'
  import Adapter from 'enzyme-adapter-react-16'
  ```
  * Configure:
  ```
  Enzyme.configure({ adapter: new Adapter() })
  ```
