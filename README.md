## A React App to manage your recurring queries in Chartbeat

### Technologies used

- react.js
- axios
- moment.js

### Styles

- Material UI
- react-loader-spinner

### To run

Run ```npm start``` from the root folder

### To Do

- better highlight rows with user ID typed in
- hide rows that don't match user id from search field
- add functionality to sort rows by any column
- Determine how to display a query that has been cancelled but persists in the recurring queries list (may be able to use https://dashapi.chartbeat.com/query/v2/combined/list/)
- determine secure way to submit API key

### Completed Tasks

:white_check_mark: change timestamp formatting from unix <br/>
:white_check_mark: add Cancel button to CollapsibleTable <br/>
:white_check_mark: add user_id field to enable query deletion <br/>
:white_check_mark: add message for form submissions that have no results (empty array returned from API) <br/>
:white_check_mark: clear previous results on submitting form <br/>
:white_check_mark: modal to confirm cancellation of query <br/>
:white_check_mark: add CB fonts <br/>
:white_check_mark: add loading symbol after form is submitted, before results load <br/>
:white_check_mark: refactor logic for NoQueries component to display on no results <br/>
:white_check_mark: remove trailing comma from metadata <br/>
:white_check_mark: refactor logic to set a current host + api key in state to avoid relying on the values from apiForm <br/>
:white_check_mark: clear form on submit <br/>
:white_check_mark: add button to copy user id <br/>
:white_check_mark: refactor App into functional component <br/>
:white_check_mark: add error handling for handleCancelQueries function <br/>
:white_check_mark: adjust copy to clipboard function to write to search field on click <br/>
:white_check_mark: clear search bar when form is resubmitted <br/>
:white_check_mark: focus host field on submit <br/>
:white_check_mark: refactor getQueries API call to only add queries array (not full object including host) <br/>
:white_check_mark: refactor post-cancel behavior to re-render remaining queries <br/>
:white_check_mark: add an optional user ID field to query form so you can just see queries associated with a given user ID <br/>
:white_check_mark: handle API errors <br/>

### Errors & bugs

- While refactoring CollapsibleTable component, clicking to expand the 'History'/'Additional Metadata' section displayed a blank screen and threw:

```Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.```

Solution: row.filters is an object but I was attempting to map through it. Changed logic to access each key and map through those instead.

- Returning ```timestamp._d``` from moment.js's moment.unix() function threw the following error:

```Error: Objects are not valid as a React child (found: Fri Jul 31 2020 23:22:40 GMT-0400 (Eastern Daylight Time)). If you meant to render a collection of children, use an array instead.```

Solution: Had to convert the value to a string.

- On clicking to expand any row, this error is thrown:

```Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node```

Solution: TBD

- On clicking trash icon to delete a query, function runs but this error is thrown:

```Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>.```

Solution: TBD

- Fix Modal placement 
Current behavior: Modal appears at top of screen regardless of where user is on the page
Expected behavior: Modal should cover the full screen regardless of where the user is

Solution: Changed position from absolute to fixed

- Subsequent API calls fail after the first submission with a 403 (since adding function to clear host from form, apiKey is being removed from state as a field)

Solution: Moved state update to handleSubmit function instead of resetting it in a separate function.

- handleCancelQuery is failing with a 400 after removal of current host & api key from state

Solution: add currentHost and apiKey back to state and pass to handleCancelQuery

- Deleting a query throws this error:

```Unhandled Rejection (TypeError): Cannot read property 'error' of undefined```

Solution: TBD (temporarily removed error handling)