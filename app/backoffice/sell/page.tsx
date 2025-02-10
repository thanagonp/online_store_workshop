'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { confic } from "@/app/config";
import Modal from "@/app/backoffice/modal";
import { setEngine } from "crypto";



export default function SellPage() {
    const [serial , setSerial] = useState('');
    const [price , setPrice] = useState(0);
    const [ sells , setSells] = useState([]);
    const [id , setId] = useState(0);
    const [totalAmount , setTotalAmount] = useState(0);
    
    const handleSave = async () => {
        try{
            const payload = {
                serial: serial,
                price: price
            }
            await axios.post(`${confic.apiUrl}/api/sell/create`, payload);
            fetchData();

        }catch(error: any){

            if(error.response.status === 404){
                Swal.fire({
                    icon: 'warning',
                    title: 'ไม่พบรายการสินค้า',
                    text: 'ไม่มีสินค้านี้ หรือถูกขายไปแล้ว'
                })
            } else{
                 Swal.fire({
                icon: 'error',
                title: 'เกิดข้อผิดพลาด',
                text: error.message
            })
            }
           
        }
    }
    const handleDelete = async (id: number) => {
        try{
            const button = await Swal.fire({
                icon: 'warning',
                title: 'คุณต้องการลบรายการขายนี้หรือไม่?',
                showConfirmButton: true,
                showCancelButton: true
            });

            if(button.isConfirmed){
                await axios.delete(`${confic.apiUrl}/api/sell/remove/${id}`);
                fetchData();
            }
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: error.message
            })
        }
    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`${confic.apiUrl}/api/sell/list`);
            setSells(response.data);

            let total = 0;
            response.data.forEach((sell: any) => {
                total += sell.price;
            })
            setTotalAmount(total);
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: error.message
            })
        }
    }

    const handleConfirm = async () => {
        try{
            const button = await Swal.fire({
                icon: 'warning',
                title: 'คุณต้องการยืนยันข้อมูลหรือไม่?',
                showConfirmButton: true,
                showCancelButton: true
            });
            if(button.isConfirmed){
                await axios.get(`${confic.apiUrl}/api/sell/confirm`);
                fetchData();
            }
            
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Confirm Failed',
                text: error.message
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <>
            <h1 className="content-header">ขายสินค้า</h1>
            <div className="flex gap-2 mt-3 items-end">
                
                <div className="w-full">
                     <div> Serial number </div>
                    <input type="text" onChange={(e) => setSerial(e.target.value)}/>
                </div>
               
                <div className="text-right">
                    <div>ราคาขาย </div>
                    <input type="number" onChange={(e) => setPrice(Number(e.target.value))}/>
                </div>
                
                
            </div>
            <button className="btn h-10 flex items-center justify-center rounded-r-md" onClick={handleSave}>
                <i className="fa-solid fa-save mr-2"></i>
                บันทึก
            </button>

            {sells.length > 0 && (
                <>
                    <table className="table mt-3">
                        <thead>
                            <tr>
                                <th>Serial number</th>
                                <th>ราคาขาย</th>
                                <th className="text-right">รายการสินค้า</th>
                                <th className="w-[110px]"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {sells.map((sell: any) => (
                                <tr key={sell.id}>
                                    <td>{sell.product.serialNumber}</td>
                                    <td>{sell.price.toLocaleString()}</td>
                                    <td>{sell.product.productName}</td>
                                    <td className="flex items-center justify-center">
                                    <button className="btn" onClick={() => handleDelete(sell.id)}>
                                        <i className="fa-solid fa-trash-alt"></i>
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <div className="mt-5 flex justify-between">
                        <div>ยอดรวม</div>
                        <div className="text-right font-bold bg-gray-200 p-2 rounded-md">
                            {totalAmount.toLocaleString()}
                        </div>

                    </div>

                    <div className="mt-5 text-center">
                        <button className="btn" onClick={handleConfirm}>
                            <i className="fa-solid fa-check mr-2"></i>
                            ยืนยันการขาย
                        </button>
                    </div>
                </>
            )}
        </>
    );
}