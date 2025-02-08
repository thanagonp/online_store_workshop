'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { confic } from "@/app/config";
import Modal from "@/app/backoffice/modal";

export default function BuyPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [serialNumber, setSerialNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress , setCustomerAddress] = useState('');
    const [remark, setRemark] = useState('');


    const handleOpenModal = () => {
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSave = async () => {
        try{
            const payload = {
                serialNumber: serialNumber,
                productName: productName,
                productModel: productModel,
                color: color,
                price: price,
                customerName: customerName,
                customerPhone: customerPhone,
                customerAddress: customerAddress,
                remark: remark,
            }

            await axios.post(`${confic.apiUrl}/api/buy/create`, payload);
            Swal.fire({
                icon: 'success',
                title: 'Save Success',
                text: 'บันทึกข้อมูลเรียบร้อย',
                timer: 2000
            });

            handleCloseModal();

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: 'ไม่สามารถบันทึกข้อมูลได้',
            })
        }
    };

    return (
        <>
            <h1 className="content-header">รายการซื้อ</h1>
            <div>
                <button className="btn btn-primary" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มรายการซื้อ
                </button>
            </div>

        <Modal
            title="เพิ่มรายการซื้อ"
            isOpen={isOpen}
            onClose={handleCloseModal}
        >
            <div>serial สินค้า:</div>
            <input type="text" className="form-control" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            <div className="mt-2">ชื่อสินค้า:</div>
            <input type="text" className="form-control" value={productName} onChange={(e) => setProductName(e.target.value)} />
            <div className="mt-2">รุ่น:</div>
            <input type="text" className="form-control" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
            <div className="mt-2">สี:</div>
            <input type="text" className="form-control" value={color} onChange={(e) => setColor(e.target.value)} />
            <div className="mt-2">ราคา:</div>
            <input type="number" className="form-control" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            <div className="mt-2">ชื่อลูกค้า:</div>
            <input type="text" className="form-control" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            <div className="mt-2">เบอร์โทร:</div>
            <input type="text" className="form-control" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            <div className="mt-2">ที่อยู่:</div>
            <input type="text" className="form-control" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
            <div className="mt-2">หมายเหตุ:</div>
            <input type="text" className="form-control" value={remark} onChange={(e) => setRemark(e.target.value)} />
            <button className="btn btn-primary mt-3" onClick={handleSave}>
                บันทึก
            </button>
        </Modal>
            
        </>
    );
}