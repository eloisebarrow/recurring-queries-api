import React, { useState } from 'react';
import Modal from './Modal.jsx';

// Moment.js
import moment from 'moment';

// Material UI 
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
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import Input from '@material-ui/core/Input';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

const searchInputStyles = makeStyles({
  root: {
    '& > *': {
      textAlign: 'center',
      width: '300px',
    }
  }
})

const convertTs = (ts) => {
  let timestamp = moment.unix(ts).utc();
  return timestamp._d.toString();
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
        <TableCell>
          <IconButton 
            disabled={ props.searchInput === row.user_id ? false : true } // disable cancel button unless user types in row's user ID
            onClick={() => props.setIsModalOpen(true)} >
            <DeleteOutlineOutlinedIcon />
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.host}
        </TableCell>
        <TableCell align="right">{row.query_id}</TableCell>
        <TableCell align="right">{row.user_id}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{ convertTs(row.query_submission_ts) }</TableCell>
        <TableCell align="right">{ convertTs(row.expiration_ts) }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell />
        <TableCell />
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
                        { row.metrics.map((metric, i) => { return `${metric},` }) }
                      </TableCell>
                      <TableCell align="right">
                        { row.dimensions ? row.dimensions.map(dimension => { return `${dimension}, ` })
                          : 'none' }
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
  const classes = searchInputStyles();
  const [searchInput, setSearchInput] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value)
  }

  return (
    <React.Fragment>
      <Input 
        onChange={(event) => handleSearchChange(event)} 
        placeholder="Enter a user ID to cancel a query" 
        className={classes.root}
        value={searchInput} />
      <TableContainer component={Paper} className="query-results">
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell />
              <TableCell>Host</TableCell>
              <TableCell align="right">Query ID</TableCell>
              <TableCell align="right">User ID</TableCell>
              <TableCell align="right">Status</TableCell> 
              <TableCell align="right">Submission Timestamp (UTC)</TableCell> 
              <TableCell align="right">Expiration Timestamp (UTC)</TableCell> 
            </TableRow>
          </TableHead>
          <TableBody>
            { props && props.queries && props.queries.queries && props.queries.queries.map( (query, i) => {
                return (
                  <Row 
                    key={i} 
                    row={query} 
                    searchInput={searchInput}
                    setIsModalOpen={setIsModalOpen} />
                )
              })
            }
          </TableBody>
        </Table>
      </TableContainer>
      { isModalOpen ? 
        <Modal 
          setIsModalOpen={setIsModalOpen}
          handleCancelQuery={props.handleCancelQuery} /> 
        : null}
    </React.Fragment>
  );
}