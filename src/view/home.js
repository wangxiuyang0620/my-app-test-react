import React from 'react'
import Changlist from '../components/Changlist'
import axios from 'axios'
class Home extends React.Component {
    state={
        changlist:[],
           newlist:[]
    }
    render() {
       
        return (
            <>
                <header className="header">
                    luckin coffee
              </header>
                <div className='top'>
                    现在下单
              </div>
                <div className='chang'>
                    <p>
                        <span>今日Top</span><span onClick={()=>{
                            this.chang()
                        }}>换一换</span>
                    </p>
                    <div className='chang-content'>
                         <Changlist list={this.state.newlist}/>
                         
                    </div>
                </div>
                <div className='bottom'>
                    新鲜事
                
              </div>
            </>
        )
    }
    //换一换随机切换数据
    chang(){
        let list=[]
        let arr=[parseInt(Math.random()*5),parseInt(Math.random()*5),parseInt(Math.random()*5)]
        arr.forEach((item)=>{
          this.state.changlist.forEach((v,i)=>{
            if(i===item){
                return  list.push(v)
            
            }
          })
        })
        
       this.setState({
           newlist:list
       })
    }
    componentDidMount(){
        axios.get('/api/chang').then(res=>{
            if(res.data.code===200){
                this.setState({
                    changlist:res.data.data
                },()=>{
                    this.chang()
                })
                
            }
        })
       
    }
}
export default Home