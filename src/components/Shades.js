import React from 'react'
import {connect} from 'react-redux'
class Shade extends React.Component{
    state={
        flag:false
    }
    render(){
        return(
            <div className={this.props.flag?"none":'shade'}  >
               <p>
                   <img src="http://dmimg.5054399.com/allimg/pkm/pk/22.jpg" alt=""/>
               </p>
               <span onClick={()=>{
                   this.close()
               }}>X</span>
            </div>
        )
    }
    close(){
       this.props.setState('flag',true)
    }


}
const mapStateToProps=(state)=>{
    return{
        flag:state.flag
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setState(key,value){
            dispatch({type:'SET_STATE',key,value})
        }
    }
}
export default connect(mapStateToProps,mapDispatchToProps)( Shade)