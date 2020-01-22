import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import { JsonRpc } from 'eosjs'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
//import ReactJson from 'react-json-view'
import JSONPretty from 'react-json-pretty';



export default function App() {
  const [expanded, setExpanded] = React.useState(false);
  const [blocks, setBlocks] = useState([]);

  const getInfo = () => {
    let rpc = new JsonRpc('https://api.eosnewyork.io')
    rpc.get_info().then(result => {
      rpc.get_block(result.head_block_id).then(block => {
        setBlocks(x => {
          let unq = new Set(x.map(e => e.id))
          if (!unq.has(block.id)) {
            let out = x.concat([block])
            return out.length > 10 ? out.filter((e, i) => i > 0 && i <= 10) : out
          }
          return x
        })
      })
    })
  }

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className='row'>
      <div className='col-12'>
        <Button variant='outlined' onClick={getInfo}>Load</Button>
      </div>
      <div className='col-12'>
        {
          blocks.map((e, i) => {
            let text = e.transactions.flatMap(e => e.trx.transaction || { actions: [] }).map(x => x.actions).flat()
            //console.log(text);
            let count = text.length;
            return (
              <ExpansionPanel key={e.id} expanded={expanded === e.id} onChange={handleChange(e.id)}>
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                >
                  <div className='row'>
                    <div className='col-12'>
                      <small>{i + 1}) Block Hash: {e.id}</small>
                    </div>
                    <div className='col-12'>
                      <small> Timestamp: {new Date(Date.parse(e.timestamp)).toLocaleDateString()} {new Date(Date.parse(e.timestamp)).toLocaleTimeString()}</small>
                    </div>
                    <div className='col-12'>
                      <small> No. of Actions: {count}</small>
                    </div>
                  </div>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <div className='col-12' style={{ maxHeight: '200px', overflow: 'auto' }}>
                    <JSONPretty data={{ ...e, transactions: e.transactions.length > 2 ? JSON.stringify(e.transactions) : e.transactions }} />
                  </div>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            )
          })
        }
      </div>
    </div>
  );
}