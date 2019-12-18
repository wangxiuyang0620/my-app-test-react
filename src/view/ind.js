import React from 'react';
import MyView from '../router/myView'
import Shade from '../components/Shades'
import {NavLink} from 'react-router-dom'
class Ind extends React.Component{
    render(){
        let RouterList=this.props.children.filter((item)=>{  return !item.to})
        return(
            <>
             <div className="main">
                 <MyView routerlist={this.props.children}{...this.porps}/>
                 <Shade/>
             </div>
             <div className="footer">
                 {
                     RouterList.map((item,index)=>{
                     return <NavLink to={item.path} key={index}>{item.title}</NavLink>
                     })
                 }
             </div>
           
            </>
        )
    }
}
export default Ind