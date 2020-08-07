## A React App to manage your recurring queries in Chartbeat

### Technologies used

- react.js
- axios
- moment.js

### To run

Run ```npm start``` from the root folder

## To Do

- modal to confirm cancellation of query
- handle API errors - general handling DONE, wip clearer error messaging (working logic: 403s indicate invalid host/key submission, 400s indicate "that the server cannot or will not process the request due to something that is perceived to be a client error (e.g., malformed request syntax, invalid request message framing, or deceptive request routing)")
- Determine how to display a query that has been cancelled but persists in the recurring queries list (may be able to use https://dashapi.chartbeat.com/query/v2/combined/list/)
- add CB fonts
- remove trailing comma from metadata
- determine secure way to submit API key

## Completed Tasks

- change timestamp formatting from unix
- add Cancel button to CollapsibleTable
- add user_id field to enable query deletion
- add message for form submissions that have no results (empty array returned from API)
- clear previous results on submitting form

## Errors

- While refactoring CollapsibleTable component, clicking to expand the 'History'/'Additional Metadata' section displayed a blank screen and threw:

```Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.```

Solution: row.filters is an object but I was attempting to map through it. Changed logic to access each key and map through those instead.

- Returning ```timestamp._d``` from moment.js's moment.unix() function threw the following error:

```Error: Objects are not valid as a React child (found: Fri Jul 31 2020 23:22:40 GMT-0400 (Eastern Daylight Time)). If you meant to render a collection of children, use an array instead.```

Solution: Had to convert the value to a string.

- On clicking to expand any row, this error is thrown:

```Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://fb.me/react-strict-mode-find-node```

Solution: TBD

- On clicking trash icon to delete a query, this error is thrown:

```Warning: validateDOMNesting(...): <div> cannot appear as a child of <tbody>.```

Solution: TBD