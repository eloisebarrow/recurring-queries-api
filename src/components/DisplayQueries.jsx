// import React from 'react'

// export default function DisplayQueries(props) {
//     return (
//         <div className="query-results">
//             <h4>Display Queries</h4>
//             <tbody>
//                 <tr>
//                     <th>Host</th>
//                     <th>Query ID</th>
//                     <th>Status</th>
//                     <th>Cancel?</th>
//                 </tr>
//                 { props && props.queries && props.queries.queries && props.queries.queries.map( (query, key) => {
//                     return (
//                         <tr key={key}>
//                             <td>{query.host}</td>
//                             <td>{query.query_id}</td>
//                             <td>{query.status}</td>
//                             <td><button onClick={() => props.handleCancelQuery(query.query_id)}>Cancel</button></td>
//                         </tr>
//                     )
//                 })
//                 }
//             </tbody>
//         </div>
//     )
// }

//////////// MATERIAL UI TABLE /////////////////////////

import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(host, queryId, status, submissionTs, expirationTs) {
  return {
    host,
    queryId,
    status,
    submissionTs,
    expirationTs,
    metadata: [
      { date_range: '2020-01-05', metrics: '11091700', dimensions: 3, filters: 'placeholder' },
      { date_range: '2020-01-02', metrics: 'Anonymous', dimensions: 1, filters: 'placeholder' },
    ],
  };
}

function Row(props) {
  console.log('row props:', props)
  const { row } = props; // each row exists in props, with all its data
  const [open, setOpen] = React.useState(false); // expand row to see more data
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.host}
        </TableCell>
        <TableCell align="right">{row.query_id}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.query_submission_ts}</TableCell>
        <TableCell align="right">{row.expiration_ts}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Additional Metadata
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date range</TableCell>
                    <TableCell>Metrics</TableCell>
                    <TableCell align="right">Dimensions</TableCell>
                    <TableCell align="right">Filters</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {/* {row.metadata.map((metadataRow, i) => ( */}
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.date_range}
                      </TableCell>
                      <TableCell>
                        {row.metrics.map((metric, i) => { return `${metric},` })}
                      </TableCell>
                      <TableCell align="right">
                        {row.dimensions ? row.dimensions.map((dimension, i) => { return `${dimension}, ` })
                          : 'none'}
                      </TableCell>
                      <TableCell align="right">
                        {typeof(row.filters) == Array ? row.filters.map((filter, i) => { return `${filter}, ` })
                          : 'none'}
                      </TableCell>
                    </TableRow>
    
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     calories: PropTypes.number.isRequired,
//     carbs: PropTypes.number.isRequired,
//     fat: PropTypes.number.isRequired,
//     history: PropTypes.arrayOf(
//       PropTypes.shape({
//         amount: PropTypes.number.isRequired,
//         customerId: PropTypes.string.isRequired,
//         date: PropTypes.string.isRequired,
//       }),
//     ).isRequired,
//     name: PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired,
//     protein: PropTypes.number.isRequired,
//   }).isRequired,
// };

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
//   createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
//   createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
//   createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
// ];

export default function CollapsibleTable(props) {
  console.log('collapsibleTable props:', props)
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Host</TableCell> {/* was Dessert */}
            <TableCell align="right">Query ID</TableCell> {/* was Calories */}
            <TableCell align="right">Status</TableCell> {/* was Fat */}
            <TableCell align="right">Submission TS</TableCell> {/* was Carbs */}
            <TableCell align="right">Expiration TS</TableCell> {/* was Protein */}
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <Row key={row.name} row={row} />
          ))} */}
          { props && props.queries && props.queries.queries && props.queries.queries.map( (query, i) => {
              return (
                  <Row key={i} row={query} />
              )
            })
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

