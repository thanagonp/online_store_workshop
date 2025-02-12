'use client';

import { useState, useEffect, use } from "react";
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

    return (
        <>
            <h1 className="content-header">ผู้ใช้งาน</h1>
            <div>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => setIsShowModalOpen(true)}>
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
                                <button className="btn mr-2">
                                    <i className="fa-solid fa-pencil"></i>แก้ไข
                                </button>
                                <button className="btn">
                                    <i className="fa-solid fa-trash"></i>ลบ
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}