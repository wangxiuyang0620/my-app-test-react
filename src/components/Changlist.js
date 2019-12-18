import React from 'react'
class Changlist extends React.Component {
    render() {
        return (
            <>
                {
                    this.props.list.map((item, index) => {
                        return <dl key={index}>
                            <dt>
                                <img src={item.img} alt="" />
                            </dt>
                            <dd>
                                <h4>{item.name}</h4>
                                <p>￥{item.price}</p>
                            </dd>
                        </dl>
                    })
                }
            </>
        )
    }
}
export default Changlist