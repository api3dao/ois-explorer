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
const styledText = css`
  h1 {
    font-family: Arial, Helvetica, sans-serif;
    font-size: 50px;
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
      //console.log(segmentedOIS);
    };
  };
  function matchEndpoints(endpoints, endpointString, i){
    let endpoint = endpoints[i];
    return endpoint    
    
    
  }

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
    <img src="airnodeInvert.png" margin="0px" padding="0px"></img>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '50px'}}>
      <h1 style={{fontSize: "50px"}}>OIS Explorer</h1>

      <input type="file" onChange={handleChange}  style={{ margin: 'auto'}}/>
    </div>
      <br />
      <div>
      {/* {"uploaded file content -- " + files} */}
      <Panel style={{ padding: '1rem 0 0 0 ', width: '50%', height: '100%' }}>
      <div style={{  marginTop: 'none', margin: 'auto', textAlign: 'left', width: '100%', height: '100%', gridAutoColumns: "2", gridAutoFlow: "dense" }}>
        <h4>Airnode Settings</h4>
        {segOIS && (
          <div style={{ display: "flex", fontSize: '11px'}}>
          <ul>
            <li> Airnode Release: {segOIS.nodeSettings.nodeVersion}</li>
            <li> Cloud Provider: {segOIS.nodeSettings.cloudProvider}</li>
            <li> Region: {segOIS.nodeSettings.region}</li>
            <li> Stage: {segOIS.nodeSettings.stage}</li>
            <li> Chains: {segOIS.nodeSettings.chains[0].type}
              <ul>
                <li>ChainID: {segOIS.nodeSettings.chains[0].id}</li>
                <li>Provider: 
                  <ul>
                    <li>Name: {segOIS.nodeSettings.chains[0].providers[0].name}</li>
                    <li>URL: {segOIS.nodeSettings.chains[0].providers[0].url}</li>
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
      <div >
        <Table style={{ color: 'white',textAlign: 'left' }}>
            <thead style={{textAlign: 'left'}}>
            
                <tr>
                    <TableHead>Endpoint ID</TableHead>
                    <TableHead> Endpoint Name </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                </tr>
            </thead>
            <tbody>
          
           
        
        {segOIS && (
          <>
          {segOIS.requests.map((value, i) => {
            
            let matchedEndpoint = matchEndpoints(segOIS.ois.endpoints, value.endpointName, i)
            return <><tr>
            <TableData>
              {value.endpointId}
            </TableData>
            <TableData>
              {value.endpointName}
            </TableData>
            
            {/* <ul>
              <ul>
                <li> Method: {matchedEndpoint.operation.method}</li>
               
                  <>
                  <li>Parameters: </li>
                  <ul>
                  {matchedEndpoint.fixedOperationParameters && (
                    <>
                      {matchedEndpoint.fixedOperationParameters.map((value,index) => {
                        return <li>Fixed Parameter: {matchedEndpoint.fixedOperationParameters[index].name}</li>
                      })}
                      </>
                  )}
                  {matchedEndpoint.parameters && (
                    <>
                    {matchedEndpoint.parameters.map((value,index) => {
                      return <>
                      <li>Parameter: {matchedEndpoint.parameters[index].name}</li>
                      <ul>
                        <li>Name: {matchedEndpoint.parameters[index].operationParameter.name}</li>
                      </ul>
                      </>
                    })}
                    </>
                  )}
                  {matchedEndpoint.reservedParameters && (
                    <>
                    {matchedEndpoint.reservedParameters.map((value,index) => {
                      return <li>Reserved Parameter: {matchedEndpoint.reservedParameters[index].name}</li>
                     
                    })}
                    </>
                    )}
                  </ul>
                  </>
                  
                
              </ul>
            </ul> */}

            </tr>
            <tr style={{ marginLeft: '1em'}}>
            <div style={{width: '50%', justifyContent: 'center', fontSize: '11px'}}>
            <Table style={{ color: 'red' }}>
            <thead>
            
                <tr>
                    
                    <th>Method: </th>
                    <th> Parameters:  </th>
                </tr>
            </thead>
            <tbody>
              <tr></tr>
              <tr>
                {matchedEndpoint.operation.method}
              </tr>
              <tr>
                {matchedEndpoint.fixedOperationParameters && (
                  <>
                    {matchedEndpoint.fixedOperationParameters.map((value,index) => {
                      return <td>Fixed Parameter: {matchedEndpoint.fixedOperationParameters[index].name}</td>
                    })}
                    {matchedEndpoint.parameters && (
                    <>
                    {matchedEndpoint.parameters.map((value,index) => {
                      return <>
                      <td>Parameter: {matchedEndpoint.parameters[index].name}</td>
                      
                      <td>Operation Parameter: {matchedEndpoint.parameters[index].operationParameter.name}</td>
                      
                      </>
                    })}
                    </>
                  )}
                  {matchedEndpoint.reservedParameters && (
                    <>
                    {matchedEndpoint.reservedParameters.map((value,index) => {
                      return <td>Reserved Parameter: {matchedEndpoint.reservedParameters[index].name}</td>
                     
                    })}
                    </>
                    )}
                  </>
                )}
              </tr>
            </tbody>
            </Table>
            </div>
            </tr>
            {/* <tr>
              <TableData></TableData><TableData>
                
              </TableData>

              <li> Method: {matchedEndpoint.operation.method}</li>
               
                  <>
                  <li>Parameters: </li>
                  <ul>
                  {matchedEndpoint.fixedOperationParameters && (
                    <>
                      {matchedEndpoint.fixedOperationParameters.map((value,index) => {
                        return <li>Fixed Parameter: {matchedEndpoint.fixedOperationParameters[index].name}</li>
                      })}
                      </>
                  )}
                  {matchedEndpoint.parameters && (
                    <>
                    {matchedEndpoint.parameters.map((value,index) => {
                      return <>
                      <li>Parameter: {matchedEndpoint.parameters[index].name}</li>
                      <ul>
                        <li>Name: {matchedEndpoint.parameters[index].operationParameter.name}</li>
                      </ul>
                      </>
                    })}
                    </>
                  )}
                  {matchedEndpoint.reservedParameters && (
                    <>
                    {matchedEndpoint.reservedParameters.map((value,index) => {
                      return <li>Reserved Parameter: {matchedEndpoint.reservedParameters[index].name}</li>
                     
                    })}
                    </>
                    )}
                  </ul>
                  </>
            </tr> */}
            </>
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
