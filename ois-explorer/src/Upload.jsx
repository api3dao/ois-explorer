import React, { useState } from "react";

import { Box as RebassBox } from 'rebass'
import styled, { css } from 'styled-components'
import Input from './inputWithLabel'

const Item = styled.li`
  margin: 0px;
  height: -moz-fit-content;
  width: inherit;

`
const styledH4 = css`
  h4{
    font-family: Arial, Helvetica, sans-serif;
    font-size: 20px;
    padding: 0px;
  }
`


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
    font-size: 20px;
    padding: 0px;
  }
  h3 {
    font-family: Arial, Helvetica, sans-serif;
    
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
// const InputStyled = styled.input`
//       border-radius: 0;
//       display: flex;
//       font-size: 100%;
//       line-height: 25px;
//       text-shadow: none;

//       border: 0;
//       border-bottom: 1px solid rgba(0, 0, 0, 0.15);
//       color: #000;
//       flex: 1 1 auto;
//       order: 2;

//       &:focus {
//         outline: 0;
//       }

//       &:not(:focus) {
//         color: transparent;
//       }

//       &:focus + ${Label} {
//         color: #3949AB;
//         opacity: 1;
//         transform: scale(0.8) translate3d(0, 5px, 0);
//       }
//     `;


// const Input = styled.input`
//   font-size: 18px;
//   padding: 10px;
//   margin: 10px;
//   background: papayawhip;
//   border: none;
//   border-radius: 3px;
//   ::placeholder {
//     color: palevioletred;
//   }
// `

const Container = styled.div`
      display: flex;
      width: fit-content;
      max-width: 100%;
      flex-direction: column;
      padding: 8px;
      position: relative;
      background: #343a40;
      border-radius: 30px;
    `;
const Container2 = styled.div`
    display: flex;
    width: fit-content;
    max-width: 75%;
    flex-direction: row;
    padding: 8px;
    position: relative;
    background: #343a40;
    border-radius: 30px;
  `;

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

  function SecurityScheme(segOIS){
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
  
  function setAirnode(segOIS){
    airnodeConfig.ID=                   segOIS.ID;
    airnodeConfig.nodeVersion=          segOIS.nodeSettings.nodeVersion;
    airnodeConfig.cloudProvider=        segOIS.nodeSettings.cloudProvider;
    airnodeConfig.region=               segOIS.nodeSettings.region;
    airnodeConfig.stage=                segOIS.nodeSettings.stage;
    airnodeConfig.chainType=            segOIS.nodeSettings.chains[0].type;
    airnodeConfig.chainID=              segOIS.nodeSettings.chains[0].id;
    airnodeConfig.providerURL=          segOIS.nodeSettings.chains[0].providers[0].url;
    airnodeConfig.providerName=         segOIS.nodeSettings.chains[0].providers[0].name;
    airnodeConfig.convenienceContract=  segOIS.nodeSettings.chains[0].contracts.Convenience;
    airnodeConfig.airnodeContract=      segOIS.nodeSettings.chains[0].contracts.Airnode;
  }

  const [airnodeConfig, setAirnodeConfig] = useState({
    ID: '',
    nodeVersion: '',
    cloudProvider: '',
    region: '',
    stage: '',
    chainType: '',
    chainID: '',
    providerURL: '',
    providerName: '',
    convenienceContract: '',
    airnodeContract: '',
  })

  const [ID, setID] = useState();
  const [nodeVersion, setnodeVersion] = useState();
  const [cloudProvider, setCloudProvider] = useState();
  const [region, setRegion] = useState();
  const [stage, setStage] = useState();
  const [chainType, setChainType] = useState();
  const [chainId, setChainId] = useState();
  const [providerURL, setProviderURL] = useState();
  const [providerName, setProviderName] = useState();
  const [convenienceContract, setConvenienceContract] = useState();
  const [airnodeContract, setAirnodeContract] = useState();

  const [title, setTitle] = useState();
  const [version, setVersion] = useState();
  const [oisFormat, setOisFormat] = useState();
  const [apiURL, setApiURL] = useState();
  const [securityScheme, setSecurityScheme] = useState();
  const [securitySchemeName, setSecuritySchemeName] = useState();
  const [securitySchemeType, setSecuritySchemeType] = useState();


  console.log("NODE VERSION: ",airnodeConfig);


  return (
    <>
    {segOIS != undefined && (
      
      setAirnode(segOIS)
           
    )}
    <div className="App-header" style={{height: '100%', width: '100%' }}>
    <img src="airnodeInvert.png" margin="0px" padding="0px"></img>
    <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '50px'}}>
      <h1 style={{fontSize: "50px"}}>OIS Explorer</h1>

      <input type="file" onChange={handleChange}  style={{ margin: 'auto'}}/>
    </div>
      <br />
      <div style={{width: '75%', margin: '0 auto'}}>
      {/* {"uploaded file content -- " + files} */}
      <Panel style={{ padding: '1rem 0 0 0 ', width: '50%', height: '100%', margin: '0 auto'}}>
      {/* <div style={{  float: 'left', marginTop: 'none', margin: 'auto', textAlign: 'left', width: '100%', height: '100%' }}> */}
        <h4>Airnode Settings</h4>
        {segOIS && (
          <div style={{ display: "flex", fontSize: '11px',width: '100%' }}>
          {/* <panelPseudo> */}
          <ul style={{ listStyleType: "none", fontSize: '11px', gridTemplateColumns: " 1fr 1fr", display: "grid", width: '100%'}}>
          
            <Item ><Container ><h1>Airnode Release:</h1>  <Input placeholder={nodeVersion || segOIS.nodeSettings.nodeVersion}  onChange={setnodeVersion} style={{height: "-moz-fit-content"}}> </Input></Container></Item> 
            <Item><Container ><h1> Cloud Provider:</h1> <Input placeholder={cloudProvider || segOIS.nodeSettings.cloudProvider} onChange={setCloudProvider} style={{height: "-moz-fit-content"}}></Input></Container></Item>
            <Item><Container ><h1> Region:</h1> <Input placeholder={region || segOIS.nodeSettings.region} onChange={setRegion}></Input></Container></Item>
          
            <Item><Container ><h1> Stage:</h1> <Input placeholder={stage || segOIS.nodeSettings.stage} onChange={setStage}></Input></Container></Item>
            <Item><Container ><h1> Chains:</h1> <Input placeholder={chainType || segOIS.nodeSettings.chains[0].type} onChange={setChainType}></Input></Container></Item>
              {/* <ul style={{ listStyleType: "none"}}> */}
            <Item><Container ><h1> ChainID:</h1> <Input placeholder={chainId || segOIS.nodeSettings.chains[0].id} onChange={setChainId}></Input></Container></Item>
          
            <Item><Container><h1>Provider: </h1>
                  {/* <ul style={{ listStyleType: "none"}}> */}


              <Container>
              
                <Item><h3> Name:</h3> <Input placeholder={providerName || segOIS.nodeSettings.chains[0].providers[0].name} onChange={setProviderName}></Input></Item>
                <Item><h3>URL:</h3> <Input placeholder={providerURL || segOIS.nodeSettings.chains[0].providers[0].url} onChange={setProviderURL}></Input></Item>
              
              </Container>
                  {/* </ul> */}
              </Container>
              </Item>
                <Container>
                <Item><h1>Contracts:</h1>
                  {/* <ul style={{ listStyleType: "none"}}> */}
                    <Item><Container><h2>Convenience: </h2><Input placeholder={convenienceContract || segOIS.nodeSettings.chains[0].contracts.Convenience} onChange={setConvenienceContract}></Input></Container></Item>
                    <Item><Container><h2>Airnode: </h2><Input placeholder={airnodeContract || segOIS.nodeSettings.chains[0].contracts.Airnode} onChange={setAirnodeContract}></Input></Container></Item>
                  {/* </ul> */}
                </Item>      
                </Container>        
              {/* </ul> */}
                      
          </ul>
          {/* </panelPseudo> */}

          </div>
        )}

        {/* </div> */}
      </Panel>
      <Panel style={{width: '50%', height: '100%'}}>
      <div style={{ marginTop: 'none',margin: 'auto', textAlign: 'left', width: '100%', height: '100%' }}>
        
      <h4>API Configuration</h4>
      <div style={{ marginTop: 'none',display: "inline", fontSize: '11px', height: "100%"}}>
      {segOIS && (
        <>
        
        <ul style={{ listStyleType: "none", fontSize: '11px', gridTemplateRows: "repeat(3, 30%)",gridTemplateColumns: "repeat(3, 30%), width: '75%'", display: "grid"}}>
        <li><Container> <h1>Title:</h1> <Input placeholder={title||segOIS.ois.title} onChange={setTitle}></Input></Container></li>
        <li><Container> <h1>Version:</h1> <Input placeholder={version||segOIS.ois.version} onChange={setVersion}></Input></Container></li>
        <li><Container> <h1>OIS Format:</h1> <Input placeholder={oisFormat||segOIS.ois.oisFormat} onChange={setOisFormat}></Input></Container></li>
        <li><Container> <h1>API Url:</h1> <Input placeholder={apiURL||segOIS.ois.apiSpecifications.servers[0].url} onChange={setApiURL}></Input></Container></li>
        <li><Container><h1>Security Scheme:</h1>
            {SecurityScheme(segOIS).map((value, index) =>{
              
              return <ul style={{ listStyleType: "none"}}>
                <li><h3>Scheme Name:</h3> <Input placeholder={securityScheme||value.name} onChange={setSecurityScheme}></Input></li>
                <li><h3>Security Type:</h3> <Input placeholder={securitySchemeType ||value.securityParams.type} onChange={setSecuritySchemeType }></Input></li>
                <li><h3>Input Name: </h3><Input placeholder={securitySchemeName ||value.securityParams.name} onChange={setSecuritySchemeName}></Input></li>
              </ul>
            })} 
            </Container></li>
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
                    {/* <TableHead>Endpoint ID</TableHead>
                    <TableHead> Endpoint Name </TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead>
                    <TableHead></TableHead> */}
                </tr>
            </thead>
            <tbody style={{gridAutoColumns: "2", display: 'grid'}}>
          
           
        
        {segOIS && (
          <>
          {segOIS.requests.map((value, i) => {
            
              let matchedEndpoint = matchEndpoints(segOIS.ois.endpoints, value.endpointName, i)
              return <>
              <Container style={{background: "linear-gradient(#4e4b5e, #696666)", width: '70%', display: 'grid',   margin: '0 auto'}}><tr>
              <div style={{width: '100%', fontSize: '11px'}}>
              <TableData>
                <Container style={{background: "linear-gradient(#3b3439, #3d012c)", width: 'fit-content', margin: '0 auto', float: "left"}}>
                
                  <h3>{value.endpointName}</h3>
                
                  <div style={{float: 'left'}}>
                    <h3 style={{color: 'green', textDecorationLine: 'underline', margin: '0 auto'}}>Endpoint Id:  </h3>
                  </div>
                  <div style={{float: 'right', justifyContent: 'center'}}>
                    <h4 style={{margin: '0 auto'}}>{value.endpointId}</h4> 
                  </div>
                </Container>
              </TableData>

              
              <Table style={{ color: 'white' }}>
              <Container2 style={{borderRadius: '10px', width: '100%', flexDirection: 'row'}}>
              <thead>              
              </thead>
              <tbody>
                <tr style={{width: "100%",  margin: '0 auto'}}>
                {/* <h2>Method:</h2> */}
                <td style={{width: "fit-content",  margin: '0 auto'}}>
                  <Container2 style={{flexDirection: 'row',  display: 'block', width: '20%', background: 'rgb(2,0,36)',background: 'linear-gradient(157deg, rgba(2,0,36,1) 0%, rgba(73,121,9,1) 44%, rgba(0,212,255,1) 100%)', textAlign: 'center'}}>
                    <h2 style={{color: 'Black', textTransform: 'uppercase'}}>{matchedEndpoint.operation.method}</h2>
                  </Container2>
                </td>   
                
                {/* <td style={{color: 'black',width: "fit-content"}}><h2>Parameters:</h2> </td> */}
                                          
                </tr>

                <tr>
                          
                  <table>
                  
                  <Container2 >
                  {matchedEndpoint.fixedOperationParameters && (
                    <>
                    <tr>
                    <>
                    {matchedEndpoint.fixedOperationParameters.length > 0 && (<></>)}
                    </>
                      {matchedEndpoint.fixedOperationParameters.map((value,index) => {
                        return  <Container2 style={{}}>
                        <h4 style={{background: 'rgba(114, 93, 227,0.2)', padding: '5px',  margin: 'auto',width: '50%'}}>{matchedEndpoint.fixedOperationParameters[index].operationParameter.name} :</h4>
                        
                        <Input placeholder={value.value} style={{height: "-moz-fit-content", widht: 'min-content'}}></Input>                        
                        
                        </Container2>
                        
                    })}
                    </tr>
                      
                      {matchedEndpoint.parameters && (
                      <>
                      
                      <Container2>
                        {/* {matchedEndpoint.parameters.length > 0 && (
                          <h3>Parameter:</h3>
                        )} */}
                    
                      
                      {matchedEndpoint.parameters.map((value,index) => {
                        return <>
                        <tr> 
                          
                            <h4 style={{background: 'rgba(114, 93, 227,0.2)', padding: '5px'}}>{matchedEndpoint.parameters[index].name} :</h4>
                            <Input style={{height: "-moz-fit-content", widht: '50%'}}></Input>                                                
                        </tr>
                        
                        {/* <td>{matchedEndpoint.parameters[index].operationParameter.name}</td> */}
                        
                        </>
                      })}
                      </Container2>
                        
                      
                      </>
                    )}
                    {matchedEndpoint.reservedParameters && (
                      <>
                      {matchedEndpoint.reservedParameters.map((value,index) => {
                        return <tr> 
                          
                          <h4 style={{background: 'rgba(114, 93, 227,0.2)', padding: '5px', width: '20%'}}>{matchedEndpoint.reservedParameters[index].name} :</h4>
                          <Input placeholder={matchedEndpoint.reservedParameters[index].fixed} style={{height: "-moz-fit-content", widht: 'min-content'}}></Input>                        
                      </tr>
                      
                      })}
                      </>
                      )}
                    </>
                  )}
                </Container2>
                </table>
                </tr>
                <tr>
              
                
                </tr>
              </tbody>
              </Container2>
              </Table>
              </div>
              </tr>
             
              </Container>
              </>
            })}
            
            </>          
          )}
          </tbody>
        
          </Table>
          </div>
          </Panel>
          </div>
          </div>
          </>        
  );
}
