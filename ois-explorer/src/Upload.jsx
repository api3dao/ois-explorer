import React, { useState } from "react";

import { Box as RebassBox } from 'rebass'
import styled, { css } from 'styled-components'


const panelPseudo = css`
  :after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 10px;
  }
  @media only screen and (min-width: 40em) {
    :after {
      content: unset;
    }
  }
`

const TableData = styled.td`
    border: 0px solid #FFFFFF;
    padding: 3px 10px;
    font-size: 11px;
`
const Table = styled.table`
    border: 0px solid #5B1F03;
    
    width: 100%;
    text-align: center;
`
let TableHead = styled.th`
    border: 0px solid #FFFFFF;
    padding: 3px 10px;
`

const Option = styled.div`
  font-weight: 500;
  font-size: 14px;
  opacity: ${({ activeText }) => (activeText ? 1 : 0.6)};
  color: ${({ theme }) => theme.white};
  display: flex;
  :hover {
    opacity: 1;
  }
`
const Panel = styled(RebassBox)`
  position: relative;
  background-color: ${({ theme }) => theme.advancedBG};
  padding: 1.25rem;
  width: 100%;
  height: 100%;
  display: inline-grid;
  flex-direction: row;
  justify-content: center;
  //max-height: initial;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.bg3};
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.05); /* box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.01), 0px 16px 24px rgba(0, 0, 0, 0.01), 0px 24px 32px rgba(0, 0, 0, 0.01); */
  :hover {
    cursor: ${({ hover }) => hover && 'pointer'};
    border: ${({ hover, theme }) => hover && '1px solid' + theme.bg5};
  }
  ${(props) => props.background && `background-color: ${props.theme.advancedBG};`}
  ${(props) => (props.area ? `grid-area: ${props.area};` : null)}
  ${(props) =>
    props.grouped &&
    css`
      @media only screen and (min-width: 40em) {
        &:first-of-type {
          border-radius: 20px 20px 0 0;
        }
        &:last-of-type {
          border-radius: 0 0 20px 20px;
        }
      }
    `}
  ${(props) =>
    props.rounded &&
    css`
      border-radius: 8px;
      @media only screen and (min-width: 40em) {
        border-radius: 10px;
      }
    `};
  ${(props) => !props.last && panelPseudo}
`

function typedOIS(ois){
  this.requests = ois.triggers.request;
  this.ois = ois.ois[0];
  this.nodeSettings = ois.nodeSettings;
  this.id = ois.id;
}



export function Upload({ children }) {
  const [files, setFiles] = useState("");
  const [segOIS, setSegOIS] = useState();

  function getOISComponents(ois){
    console.log(ois);
    let json = JSON.parse(ois);
    return json;
  }

  const handleChange = (e) => {
    const fileReader = new FileReader();
    fileReader.readAsText(e.target.files[0], "UTF-8");
    fileReader.onload = (e) => {
      console.log("e.target.result", e.target.result);
      setFiles(e.target.result);
      let ois = getOISComponents(e.target.result);
      let segmentedOIS = new typedOIS(ois);
      if(!segOIS){setSegOIS(segmentedOIS)};
      console.log(segmentedOIS);
    };
  };

  function securityScheme(segOIS){
    let securitySchemesMap = [];
    for(var key in segOIS.ois.apiSpecifications.components.securitySchemes){
      let name = key;
      let temp = segOIS.ois.apiSpecifications.components.securitySchemes[key];
      let securityObj = {
        name: name,
        securityParams: {
          name: temp.name,
          type: temp.type
        }
      }
      securitySchemesMap.push(securityObj);
    }
    return securitySchemesMap;
  }
  return (
    <>
      <h1>OIS Explorer</h1>

      <input type="file" onChange={handleChange} />
      <br />
      <div>
      {/* {"uploaded file content -- " + files} */}
      <Panel style={{ padding: '1rem 0 0 0 ', width: '50%' }}>
      <div style={{  marginTop: 'none', margin: 'auto', textAlign: 'left', width: '100%', height: '100%' }}>
        <h4>Node Settings</h4>
        {segOIS && (
          <div style={{ display: "flex", fontSize: '11px'}}>
          <ul>
            <li> Node Version: {segOIS.nodeSettings.nodeVersion}</li>
            <li> Cloud Provider: {segOIS.nodeSettings.cloudProvider}</li>
            <li> Region: {segOIS.nodeSettings.region}</li>
            <li> Stage: {segOIS.nodeSettings.stage}</li>
            <li> Chains: {segOIS.nodeSettings.chains[0].type}
              <ul>
                <li>ChainID: {segOIS.nodeSettings.chains[0].id}</li>
                <li>Provider: 
                  <ul>
                    <li>Name: {segOIS.nodeSettings.chains[0].providers.name}</li>
                  </ul>
                </li>
                <li>Contracts:
                  <ul>
                    <li>Convenience: {segOIS.nodeSettings.chains[0].contracts.Convenience}</li>
                    <li>Airnode: {segOIS.nodeSettings.chains[0].contracts.Airnode}</li>
                  </ul>
                </li>              
              </ul>
            </li>          
          </ul>
          </div>
        )}

        </div>
      </Panel>
      <Panel style={{width: '50%', height: '100%'}}>
      <div style={{ marginTop: 'none',margin: 'auto', textAlign: 'left', width: '100%', height: '100%' }}>
        
      <h4>API Configuration</h4>
      <div style={{ marginTop: 'none',display: "flex", fontSize: '11px', height: "100%"}}>
      {segOIS && (
        <>
        
        <ul>
            <li> Title: {segOIS.ois.title}</li>
            <li> Version: {segOIS.ois.version}</li>
            <li> OIS Format: {segOIS.ois.oisFormat}</li>
            <li> API Url: {segOIS.ois.apiSpecifications.servers[0].url}</li>
            {securityScheme(segOIS).map((value, index) =>{
              return <ul>
                <li>Security Scheme: {value.name}</li>
                <li>Security Type: {value.securityParams.type}</li>
                <li>Input Name: {value.securityParams.name}</li>
              </ul>
            })} 
            {/* Security Scheme: 
            {
              
              segOIS.ois.apiSpecifications.components.securitySchemes.map((value, index) => {
              <ul>
                <li> Type: {value.type}</li>
                <li> Name: {value.name}</li>
              </ul>
            })
            } */}
            
            
        </ul>
        
        </>
      )}
      </div>
      </div>

      </Panel>
      <Panel style={{ padding: '1rem 0 0 0 ' }}>
      <div style={{ margin: 'auto' }}>
        <Table style={{ color: 'white' }}>
            <thead>
            
                <tr>
                    <TableHead>Endpoint ID</TableHead>
                    <TableHead> Endpoint Name </TableHead>
                </tr>
            </thead>
            <tbody>
          
           
        
        {segOIS && (
          <>
          {segOIS.requests.map((value, i) => {
            console.log(value);
            return <tr>
            <TableData>
              {value.endpointId}
            </TableData>
            <TableData>
              {value.endpointName}
            </TableData>
            </tr>
          })}
          
          </>          
        )}
        </tbody>
       
        </Table>
        </div>
        </Panel>
        </div>
        </>        
  );
}
