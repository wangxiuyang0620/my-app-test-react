import Home from '../view/home'
import Shopcar from '../view/shopcar'
import Menu from '../view/menu'
import Ind from '../view/ind'
const list=[
    {
        path:'/ind',
        component:Ind,
        children:[
            {
                path:"/ind/home",
                component:Home,
                title:"首页"
            },{
                path:"/ind/shopcar",
                component:Shopcar,
                title:"购物车"
            },{
                path:"/ind/menu",
                component:Menu,
                title:"菜单"
            }
        ]
    },{
        from:"/",
        to:'/ind/home'
    }
]
export default list