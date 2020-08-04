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
// import PropTypes from 'prop-types';
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
// import { getUnixTs } from '../services/api-helper';

const moment = require('moment'); // moment library to convert unix timestamps

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const convertTs = (ts) => {
  let timestamp = moment.unix(ts)
  console.log(timestamp)
  return timestamp._d;
}

function Row(props) {
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
                    <TableRow>
                      <TableCell component="th" scope="row">
                        {row.date_range}
                      </TableCell>
                      <TableCell>
                        {row.metrics.map((metric, i) => { return `${metric},` })}
                      </TableCell>
                      <TableCell align="right">
                        {row.dimensions ? row.dimensions.map(dimension => { return `${dimension}, ` })
                          : 'none'}
                      </TableCell>
                      <TableCell align="right">
                        { Object.keys(row.filters).length > 0 ? 
                            Object.keys(row.filters).map(filterKey => {
                              return `${filterKey} = ${row.filters[filterKey]}, `
                            })
                          : 'none'
                        }
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

export default function CollapsibleTable(props) {
  return (
    <TableContainer component={Paper} className="query-results">
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Host</TableCell>
            <TableCell align="right">Query ID</TableCell>
            <TableCell align="right">Status</TableCell> 
            <TableCell align="right">Submission TS</TableCell> 
            <TableCell align="right">Expiration TS</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
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

