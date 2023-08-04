import React from 'react'
import { TbCurrencyManat } from 'react-icons/Tb';
import { AiOutlineArrowDown } from 'react-icons/Ai';
import { AiOutlineArrowUp } from 'react-icons/Ai';

function DashboardContainer() {
    return (
        <div>
            <div className='flex justify-center'>
                <div className='w-4/12 border bg-gradient-to-r from-cyan-500 to-blue-500 p-10 rounded-xl'>
                    <div className='flex flex-col items-center gap-5'>
                        <p className='font-bold text-white text-2xl'>Total balance</p>
                        <div className='flex font-bold text-white text-6xl'>
                            <p>500.00</p>
                            <TbCurrencyManat />
                        </div>
                        <div className='flex w-full justify-between'>
                            <div className='flex gap-2 items-center'>
                                <div>
                                    <AiOutlineArrowDown size={25} className='text-green-500 bg-slate-50 rounded-full p-1' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-slate-200'>Income</p>
                                    <div className='flex text-white'>
                                        <p >250.00</p>
                                        <TbCurrencyManat size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <div>
                                    <AiOutlineArrowUp size={25} className='text-red-500 bg-slate-50 rounded-full p-1' />
                                </div>
                                <div className='flex flex-col'>
                                    <p className='text-slate-200'>Expenses</p>
                                    <div className='flex text-white'>
                                        <p >250.00</p>
                                        <TbCurrencyManat size={20} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DashboardContainer