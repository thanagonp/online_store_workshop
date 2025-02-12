'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { confic } from "@/app/config";
import Modal from "@/app/backoffice/modal";
import dayjs from "dayjs";

export default function RepairPage(){
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [name, setName] = useState('');
    const [price, setPrice] = useState(0);
    const [remark, setRemark] = useState('');
    const [id, setId] = useState('');
    const [repairs, setRepairs] = useState([]);

    const handleOpenModal = () => {
        setIsShowModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsShowModalOpen(false);
    }
    const handleSave = async () => {
        try{
            const payload = {
                name: name,
                price: price,
                remark: remark,
            }
            if(id !== ''){
                await axios.put(`${confic.apiUrl}/api/service/update/${id}`, payload);
                setId('');
            }else{
                await axios.post(`${confic.apiUrl}/api/service/create`, payload);
            }
            clearModal();
            handleCloseModal();
            fetchData();
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: error.message
            })
        }
    }

    const handleDelete = async (id: number) => {
        try{
            const button = await Swal.fire({
                icon: 'warning',
                title: 'คุณต้องการลบรายการนี้หรือไม่?',
                showConfirmButton: true,
                showCancelButton: true
            });
            if(button.isConfirmed){
                await axios.delete(`${confic.apiUrl}/api/service/remove/${id}`);
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

    const handleEdit = async (id: number) => {
        const repair = repairs.find((repair: any) => repair.id === id) as any;

        if(repair){
            setName(repair.name);
            setPrice(repair.price);
            setRemark(repair.remark);
            setId(repair.id);
            handleOpenModal();
        }
    }    

    const clearModal = () => {
        setName('');
        setPrice(0);
        setRemark('');
    }

    const fetchData = async () => {
        try{
            const response = await axios.get(`${confic.apiUrl}/api/service/list`);
            setRepairs(response.data);
        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: error.message
            })
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
    
    return(
        <>
            <h1 className="content-header">งานบริการ</h1>
            <div>
                <button className="btn" onClick={handleOpenModal}>
                    <i className="fa-solid fa-plus mr-2"></i>
                    เพิ่มงาน
                </button>
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ชื่องาน</th>
                        <th>ราคา</th>
                        <th>หมายเหตุ</th>
                        <th>วันที่</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {repairs.map((repair: any) => (
                        <tr key={repair.id}>
                            <td>{repair.name}</td>
                            <td>{repair.price.toLocaleString()}</td>
                            <td>{repair.remark}</td>
                            <td>{dayjs(repair.payDate).format('DD-MM-YYYY')}</td>
                            <td>
                                <button className="btn mr-2" onClick={() => handleDelete(repair.id)}>ลบ</button>
                                <button className="btn" onClick={() => handleEdit(repair.id)}>แก้ไข</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal title="เพิ่มงาน" isOpen={isShowModalOpen} onClose={handleCloseModal}>
                <div>
                    <label>ชื่องาน</label>
                    <input type="text" className="w-full border border-gray-600 rounded-md p-1" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mt-4">
                    <label>ราคา</label>
                    <input type="number" className="w-full border border-gray-600 rounded-md p-1" value={price} onChange={(e) => setPrice(parseInt(e.target.value))} />
                </div>
                <div className="mt-4">
                    <label>หมายเหตุ</label>
                    <input type="text" className="w-full border border-gray-600 rounded-md p-1" value={remark} onChange={(e) => setRemark(e.target.value)} />
                </div>
                <div className="mt-4">
                    <button className="btn" onClick={handleSave}>
                        บันทึก
                    </button>
                </div>
            </Modal>
        </>
    );
}

