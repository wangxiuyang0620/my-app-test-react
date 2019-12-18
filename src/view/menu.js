import React from 'react'
import Swiper from '../components/Swiper'
import { connect } from 'react-redux'
import axios from 'axios'
class Menu extends React.Component {
   
    render() {
        // let currentlist = this.props.list.filter(item => item.type === this.props.type)
        return (
            <>
                <div className="swiper-head">
                    <Swiper />
                </div>
                <div className="menu-main" >
                    <div className="left">
                        {
                            this.props.list.map((item, index) => {
                                return <p key={index} className={this.props.currentIndex === index ? "active" : ''} onClick={() => {
                                    this.changtab(index, item.type)
                                    this.refs.rightbox.scrollTop = this.refs['rightitem' + index].offsetTop - 160
                                    
                                }}>
                                    {item.name}
                                </p>
                            })
                        }
                    </div>
                    <div className="right" ref='rightbox' onScroll={(e) => this.handleScroll(e)}>
                        {
                            this.props.list.map((item, index) => {
                                return <div key={index} ref={'rightitem' + index}>
                                    <h2>{item.name}</h2>
                                    {
                                        item.item.map((v, i) => {
                                            return <div key={i} className="right-item">
                                                <h4>{v.name}</h4>
                                                <h4>￥{v.price}</h4>
                                                <p onClick={() => {
                                                    this.addshopcar(v)
                                                }}>+</p>
                                            </div>
                                        })
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
            </>
        )
    }
    changtab(index, type) {
        this.props.setState('currentIndex', index)
        this.props.setState('type', type)
    }
    handleScroll(e) {
        
        for(let i=0;i<this.props.list.length;i++){
            if((this.refs["rightitem"+i].offsetTop - 160)<e.target.scrollTop&&(!this.refs["rightitem"+(i+1)]||this.refs["rightitem"+(i+1)].offsetTop - 160>e.target.scrollTop)){
                this.props.setState('currentIndex', i)
            }
        }
      
    }
    addshopcar(item) {
        let index = this.props.shopcar.findIndex(one => one.id === item.id)
        if (index >= 0) {
            this.props.shopcar[index].num++

        } else {
            this.props.shopcar.push(item)
        }
        this.props.setState('shopcar', this.props.shopcar)
        axios.get('/api/add', {
            params: {
                id: item.id
            }
        }).then(res => {
            this.props.setState('shopcar', res.data.data)
        })
    }
   
    componentDidMount() {
        axios.get('/api/getlist').then(res => {
            this.props.setState('list', res.data.data)
        })
    }
}
const mapStateToProps = (state) => {
    return {
        list: state.list,
        currentIndex: state.currentIndex,
        type: state.type,
        shopcar: state.shopcar
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        setState(key, value) {
            dispatch({ type: "SET_STATE", key, value })
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Menu)