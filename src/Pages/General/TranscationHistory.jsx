import React, { useEffect, useState } from 'react'
import Layout from '../../Components/User/Layout'
import gradient from '../../assets/gradient.jpeg'
import { Apis, AuthGeturl } from '../../Components/General/Api';
import { FaUserCircle } from 'react-icons/fa';

const TranscationHistory = () => {
    const [items, setItems] = useState([])
    const GetNotify = async () => {
        try {
            const res = await AuthGeturl(Apis.users.fund_history)
            if (res.status === true) {
                setItems(res.data.records)
            }
        } catch (error) {

        }
    }
    useEffect(() => { GetNotify() }, [])
    return (
        <Layout>
        <div className="bg-gray w-full xl:h-[10rem]">
          <div className="text-center py-1 pt-10">
                    <p className='font-[500] text-4xl mb-3'>Transaction History</p>
                    <span className='flex items-center gap-4 font-[500] justify-center'>
                        <p className="text-primary">Home</p>
                        <span className="bg-[#6C757D] w-3 py-0.5"></span>
                        <p className="text-secondary">Transaction History</p>
                    </span>
                </div>
            </div>

            <div className="xl:w-[80%] w-full px-5 xl:px-0 my-20 mx-auto">
                <div className="border">
                    <img src={gradient} alt="" className="h-16 w-full rounded-tl-xl rounded-tr-xl" />
                    <div className="bg-white w-full px-10 py-5 h-[32rem] shadow-2xl overflow-y-auto scrollsdown">
                        {items.map((item, i) => (
                            <div key={i} className="flex items-start mb-3 gap-4 pb-3 border-b ">
                                <div className="text-4xl"> <FaUserCircle /> </div>
                                <span className="flex-1">
                                    <h5 className="font-[500] text-sm xl:text-base">{item.transtype}</h5>


                                    <p className="text-sm text-primary">{item.orderid}</p>
                                    <p className="text-sm text-primary">{item.created_at}</p>

                                </span>
                                <div className={`${item.transtype == 'Credit' ? 'text-white py-1 rounded-full px-4 bg-green-500' : 'text-white py-1 rounded-full px-4 bg-red-500'}`}>
                                    ${parseFloat(item.amount).toLocaleString()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default TranscationHistory
