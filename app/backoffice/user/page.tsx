'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { confic } from "@/app/config";
import Modal from "@/app/backoffice/modal";


export default function UserPage() {
    const [users, setUsers] = useState([]);
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [level, setLevel] = useState('');
    const [levelList, setLevelList] = useState(['admin', 'user']);

    const fetchData = async () => {
        try {
            const response = await axios.get(`${confic.apiUrl}/api/user/list`);
            setUsers(response.data);
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            });
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleOpenModal = () => {
        setIsShowModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsShowModalOpen(false);
    }

    const clearModal = () => {
        setName('');
        setUserName('');
        setPassword('');
        setConfirmPassword('');
    }

    const handleSave = async () => {
        try {
            if(password !== confirmPassword) {
                Swal.fire({
                    icon: 'warning',
                    title: 'ผิดพลาด',
                    text: 'รหัสผ่านไม่ตรงกัน',
                })
                return;
            }
            const payload = {
                name: name,
                username: userName,
                password: password,
                level: level,
            }
            if(id === '') {
                await axios.post(`${confic.apiUrl}/api/user/create`, payload);
            }else{
                await axios.put(`${confic.apiUrl}/api/user/updateUser/${id}`, payload);
                setId('');
            }
           
            clearModal();
            fetchData();
            handleCloseModal();
            
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            });
        }
    }
    const handleEdit = async (id: string) => {
       const user = users.find((user: any) => user.id === id) as any;
       setId(user.id);
       setName(user.name);
       setUserName(user.username);
       setLevel(user.level);
       setIsShowModalOpen(true);
    }

    const handleDelete = async (id: string) => {
        try {
            const button = await Swal.fire({
                icon: 'warning',
                title: 'คุณต้องการลบผู้ใช้นี้หรือไม่?',
                showConfirmButton: true,
                showCancelButton: true
            })

            if(button.isConfirmed){
                await axios.delete(`${confic.apiUrl}/api/user/delete/${id}`);
                fetchData();
            }
            
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'ผิดพลาด',
                text: error.message,
            });
        }
    }

    return (
        <>
            <h1 className="content-header">ผู้ใช้งาน</h1>
            <div>
                <button className="btn" onClick={handleOpenModal}>
                    เพิ่มผู้ใช้งาน
                </button>
        
            </div>

            <table className="table mt-3">
                <thead>
                    <tr>
                        <th>ชื่อ</th>
                        <th>ชื่อผู้ใช้</th>
                        <th>ระดับผู้ใช้</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => (
                        <tr key={user.id}>
                            <td>{user.name}</td>
                            <td>{user.username}</td>
                            <td>{user.level}</td>
                            <td>
                                <button className="btn mr-2" onClick={() => handleEdit(user.id)} >
                                    <i className="fa-solid fa-pencil"></i>แก้ไข
                                </button>
                                <button className="btn" onClick={() => handleDelete(user.id)}>
                                    <i className="fa-solid fa-trash"></i>ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Modal isOpen={isShowModalOpen} onClose={handleCloseModal} title="เพิ่มผู้ใช้งาน">
                <div className="mb-2">
                    <label>ชื่อผู้ใช้</label>
                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>username</label>
                    <input type="text" className="form-control" value={userName} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>รหัสผ่าน</label>
                    <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>ยืนยันรหัสผ่าน</label>
                    <input type="password" className="form-control" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <div className="mb-2">
                    <label>ระดับผู้ใช้</label>
                    <select className="form-select" value={level} onChange={(e) => setLevel(e.target.value)}>
                        {levelList.map((level: any) => (
                            <option key={level} value={level}>{level}</option>
                        ))}
                    </select>
                </div>
                <button className="btn" onClick={handleSave}>
                    บันทึก
                </button>
            </Modal>
        </>
    );
}