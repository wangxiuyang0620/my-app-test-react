import {createStore} from 'redux'
const defaultState={
     list:[],
     type:1,
     currentIndex:0,
     shopcar:[],
     flag:false
}
const reducer=(state=defaultState,action)=>{
    switch(action.type){
        case 'SET_STATE' :
            let newdata=JSON.parse(JSON.stringify(state))
            newdata[action.key]=action.value
            return newdata
            default :
            return state
    }
}
const store=createStore(reducer)
export default store