import {Route,Switch,Redirect} from 'react-router-dom'
import React from 'react'
function myView(props){
    let RouterList=props.routerlist.filter((item)=>{  return !item.to})
    let RedirectList = props.routerlist.filter((item)=>{  return item.to})
    return(
        <Switch>
        {
            RouterList.map((item,index)=>{
                return <Route key={index} path={item.path} component={(prop)=>{
                   let Compon=item.component
                   if(item.children){
                       return <Compon children={item.children}{...prop}/>
                   }else{
                       return <Compon {...prop}/>
                   }
                }}/>
            })
        }
        {
            RedirectList.map((item,index)=>{
                return <Redirect key={index} to={item.to} from={item.from}/>
            })
        }



        </Switch>

    )
}
export default myView