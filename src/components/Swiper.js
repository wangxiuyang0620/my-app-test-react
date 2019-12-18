import React from 'react'
import axios from 'axios'
import {Carousel} from 'antd'
class Swiper extends React.Component{
    state={
        swiperlist:[]
    }
    render(){
        return(
            <Carousel autoplay>
            {
                this.state.swiperlist.map((item,index)=>{
                    return <p key={index}>
                        <img src={item.img} alt=""/>
                    </p>
                })
            }
          </Carousel>
        )
    }
    componentDidMount(){
        axios.get('/api/swiper').then(res=>{
            if(res.data.code===200){
                this.setState({
                    swiperlist:res.data.data
                })
            }
        })
    }
}
export default Swiper