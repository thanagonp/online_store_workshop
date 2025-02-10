'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { confic } from "@/app/config";
import Modal from "@/app/backoffice/modal";

export default function BuyPage() {
    const [isOpen, setIsOpen] = useState(false);
    const [id , setId] = useState(0);
    const [serialNumber, setSerialNumber] = useState('');
    const [productName, setProductName] = useState('');
    const [productModel, setProductModel] = useState('');
    const [color, setColor] = useState('');
    const [price, setPrice] = useState(0);
    const [customerName, setCustomerName] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress , setCustomerAddress] = useState('');
    const [remark, setRemark] = useState('');
    const [quantity, setQuantity] = useState(1);

    const [products, setProducts] = useState([]); //สินค้าที่ซื้อ

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try{
            const response = await axios.get(`${confic.apiUrl}/api/buy/list`);
            setProducts(response.data);
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            })
        }
    }

    const handleOpenModal = () => {
        setIsOpen(true);
    };
    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleClearForm = () => {
        setSerialNumber('');
        setProductName('');
        setProductModel('');
        setColor('');
        setPrice(0);
        setCustomerName('');
        setCustomerPhone('');
        setCustomerAddress('');
        setRemark('');
        setQuantity(1);
    }

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
                quantity: quantity
            }

            if( id === 0){
                //เพิ่มรายการซื้อ
                await axios.post(`${confic.apiUrl}/api/buy/create`, payload);
            }else{
                //แก้ไขรายการซื้อ
                await axios.put(`${confic.apiUrl}/api/buy/update/${id}`, payload);
                setId(0);
            }

            
            Swal.fire({
                icon: 'success',
                title: 'Save Success',
                text: 'บันทึกข้อมูลเรียบร้อย',
                timer: 2000
            });

            handleCloseModal();
            fetchData();

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: 'ไม่สามารถบันทึกข้อมูลได้',
            })
        }
    };

    const handleEdit = (id: number) => {
        const product = products.find((product: any) => product.id === id) as any;
        setId(product.id);
        setSerialNumber(product.serialNumber);
        setProductName(product.productName);
        setProductModel(product.productModel);
        setColor(product.color);
        setPrice(product.price);
        setCustomerName(product.customerName);
        setCustomerPhone(product.customerPhone);
        setCustomerAddress(product.customerAddress);
        setRemark(product.remark ?? '');

        handleOpenModal();
    }

    const handleDelete = async (id: number) => {
        try {
            const result =await Swal.fire({
                title: 'คุณต้องการลบรายการซื้อนี้หรือไม่?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'ยืนยัน',
                cancelButtonText: 'ยกเลิก',
            });

            if (result.isConfirmed) {
                await axios.delete(`${confic.apiUrl}/api/buy/remove/${id}`);
                fetchData();
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            })
        }
    }

    return (
        <>
            <h1 className="content-header">รายการซื้อ</h1>
            <div>
                <button className="btn btn-primary" onClick={
                    () => {
                        handleOpenModal();
                        handleClearForm();
                    }}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มรายการซื้อ
                </button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Serial Number</th>
                            <th>ชื่อสินค้า</th>
                            <th>รุ่น</th>
                            <th>สี</th>
                            <th>ราคา</th>
                            <th>ชื่อลูกค้า</th>
                            <th>เบอร์โทร</th>
                            <th>หมายเหตุ</th>
                            <th className="w-[100px]"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product: any) => (
                            <tr key={product.id}>
                                <td>{product.serialNumber}</td>
                                <td>{product.productName}</td>
                                <td>{product.productModel}</td>
                                <td>{product.color}</td>
                                <td>{product.price}</td>
                                <td>{product.customerName}</td>
                                <td>{product.customerPhone}</td>
                                <td>{product.remark}</td>
                                <td className="text-center">
                                    <button className="btn-edit mr-1" onClick={() => handleEdit(product.id)}>
                                        <i className="fa-solid fa-edit"></i>
                                    </button>
                                    <button className="btn-delete" onClick={() => handleDelete(product.id)}>
                                        <i className="fa-solid fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        <Modal
            title="เพิ่มรายการซื้อ"
            isOpen={isOpen}
            onClose={handleCloseModal}>   

            <form className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <label>Serial สินค้า:</label>
                <input type="text" className="w-full p-2 border rounded" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
            </div>
            <div>
                <label>ชื่อสินค้า:</label>
                <input type="text" className="w-full p-2 border rounded" value={productName} onChange={(e) => setProductName(e.target.value)} />
            </div>
            <div>
                <label>รุ่น:</label>
                <input type="text" className="w-full p-2 border rounded" value={productModel} onChange={(e) => setProductModel(e.target.value)} />
            </div>
            <div>
                <label>สี:</label>
                <input type="text" className="w-full p-2 border rounded" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>

            <div>
                <label>ราคา:</label>
                <input type="number" className="w-full p-2 border rounded" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
            </div>
            <div>
                <label>ชื่อลูกค้า:</label>
                <input type="text" className="w-full p-2 border rounded" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
            </div>
            <div>
                <label>เบอร์โทร:</label>
                <input type="text" className="w-full p-2 border rounded" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
            </div>
            <div className="col-span-2">
                <label>ที่อยู่:</label>
                <input type="text" className="w-full p-2 border rounded" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
            </div>
            <div className="col-span-2">
                <label>หมายเหตุ:</label>
                <input type="text" className="w-full p-2 border rounded" value={remark} onChange={(e) => setRemark(e.target.value)} />
            </div>
            <div className="col-span-2">
                <label>จำนวน</label>
                <input type="number" className="w-full p-2 border rounded" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} />
            </div>
            <div className="col-span-2 flex justify-end mt-4">
                <button className="bg-teal-600 text-white px-4 py-2 rounded" onClick={handleSave}>
                บันทึก
                </button>
            </div>
            </form>
        </Modal>
            
        </>
    );
}