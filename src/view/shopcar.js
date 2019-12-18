import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Changlist from '../components/Changlist'
class Shopcar extends React.Component {
    state = {
        changlist: [],
        newlist:[]
    }
    render() {
        let totalPrice = 0, totalCount = 0
        this.props.shopcar.forEach(item => {
            totalCount += item.num
            totalPrice += item.num * item.price
        })
        let selectAll = this.props.shopcar.filter(item => item.checked).length === this.props.shopcar.length && this.props.shopcar.length > 0
        return (
            <div className="shop-main">
                <div className="shop-item">
                    {
                        this.props.shopcar.map((item, index) => {
                            return <div key={item.id} className='shop-select'>

                                <input type="checkbox" htmlFor={item.id} value={item.checked} defaultChecked={item.checked} onClick={this.handleSelect.bind(this, index)} id={item.id} ></input>
                                <label htmlFor={item.id}>{item.name}</label>
                                ￥{item.price}
                                <button onClick={() => {
                                    this.remove(index)
                                }}>-</button>
                                {item.num}
                                <button onClick={() => {
                                    this.add(index)
                                }}>+</button>
                                <button onClick={() => {
                                    this.delete(index)
                                }}>删除</button>
                            </div>
                        })
                    }
                    <div className='shop-checkbox'>
                        <input type="checkbox" id="m-select-all"  value={selectAll} defaultChecked={selectAll} onClick={this.handleSelectAll.bind(this)}></input>
                        <label htmlFor="m-select-all">全选</label>
                    </div>
                    总价：￥{totalPrice}，总数：{totalCount}
                </div>
                <div className='chang'>
                    <p>
                        <span>今日Top</span><span onClick={()=>{
                            this.chang()
                        }}>换一换</span>
                    </p>
                    <div className="chang-content">
                        <Changlist list={this.state.newlist} />
                    </div>

                </div>

            </div >
        )
    }
    //加
    add(index) {
        let { shopcar } = this.props
        shopcar[index].num++
        let newshopcar = JSON.parse(JSON.stringify(shopcar))
        this.props.setState('shopcar', newshopcar)

    }
    //减
    remove(index) {
        let { shopcar } = this.props
        if (shopcar[index].num > 1) {
            shopcar[index].num--
            let newshopcar = JSON.parse(JSON.stringify(shopcar))
            this.props.setState('shopcar', newshopcar)
        } else {
            this.delete(index)
        }
    }
    //删除
    delete(index) {
        axios.get('/api/delete',{
            params: {
                index
            }
        }).then(res => {
            if (res.data.code === 200) {
                this.props.setState('shopcar', res.data.data)
            }
        })
    }

handleSelect(index, e) {
    let { shopcar } = this.props
    shopcar[index].checked = e.target.checked
    let newshopcar = JSON.parse(JSON.stringify(shopcar))
    this.props.setState('shopcar', newshopcar)
}
//全选
handleSelectAll(e){
  let {shopcar} = this.props
  shopcar.forEach(item=>{
     item.checked=e.target.checked
  })
  
  let newshopcar = JSON.parse(JSON.stringify(shopcar))
  this.props.setState('shopcar', newshopcar)
}
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
componentDidMount() {
    axios.get('/api/shopcar').then(res => {
        if (res.data.code === 200) {
            this.props.setState('shopcar', res.data.data)
        }
       
    })

    axios.get('/api/chang').then(res => {
        if (res.data.code === 200) {
            this.setState({
                changlist: res.data.data
            },()=>{
                this.chang()
            })
        }
    })

}
}
const mapStateToProps = (state) => {
    return {
        shopcar: state.shopcar,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setState(key, value) {
            dispatch({ type: "SET_STATE", key, value })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shopcar)