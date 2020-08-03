## A React App to manage your recurring queries in Chartbeat

### Technologies used

- react.js
- axios

### To run

Run ```npm start``` from the root folder

## Errors

- While refactoring CollapsibleTable component, clicking to expand the 'History'/'Additional Metadata' section displayed a blank screen and threw:

```Uncaught Error: Objects are not valid as a React child (found: object with keys {}). If you meant to render a collection of children, use an array instead.```

Solution: row.filters is an object but I was attempting to map through it. Change logic to access each key and map through those instead.

## To Do

- add CB fonts
- add Cancel button to CollapsibleTable
- remove trailing comma from metadata
- determine secure way to submit API key
- change timestamp formatting from unix 