'use client';

import Link from 'next/link';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { confic } from "@/app/config";
import { useRouter } from "next/navigation";
import axios from 'axios';
import Modal from './modal';


export default function Sidebar() {

     const [name, setName] = useState('');
     const [level, setLevel] = useState('');
     const router = useRouter();
     const [isOpen, setIsOpen] = useState(false);
     const [username, setUsername] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('');

     const handleCloseModal = () => {
          setIsOpen(false);
     }
     const handleOpenModal = () => {
          setIsOpen(true);
     }

     const fetchData = async () => {
          const token = localStorage.getItem('token');
          const headers = {
               'Authorization': `Bearer ${token}`
          }
          const response = await axios.get(`${confic.apiUrl}/api/user/info`, { 
               headers: headers 
          });
          setName(response.data.name);
          setUsername(response.data.username);
          setLevel(response.data.level);
     }
     const handleLogout = () => {
          localStorage.removeItem('token');
          router.push('/');
     }

     useEffect(() => {
          fetchData();
     }, []);

     const handleSave = async () => {
          try{
               if(password !== confirmPassword){
                    Swal.fire({
                         icon: 'warning',
                         title: 'ผิดพลาด',
                         text: 'รหัสผ่านไม่ตรงกัน',
                    })
                    return;
               }
               const payload = {
                    name: name,
                    username: username,
                    password: password,
                    confirmPassword: confirmPassword,
               }
               const header = {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
               }
               await axios.put(`${confic.apiUrl}/api/user/update`, payload ,{
                    headers: header
               });
               fetchData();
               handleCloseModal();
          }catch(error: any){
               Swal.fire({
                    icon: 'error',
                    title: 'ผิดพลาด',
                    text: error.response.data.message,
               })
          }
     }


    return (
       <div className="bg-teal-600 h-screen w-40 fixed">
        <div className="p-3 text-xl font-bold text-center bg-teal-700 text-white">
            <h3>MSA</h3>
            <div className="flex items-center gap-2 my-3">
                <i className="fa-solid fa-user"></i>
                <span className='w-full'>{name} : {level}</span>
                <button className="bg-blue-500 rounded-full px-2 py-1" onClick={handleOpenModal}>
                    <i className='fa fa-pencil'></i>
                </button>
            </div>
            <div>
               <button className='bg-red-500 px-2 py-1 text-sm' onClick={handleLogout}>
                    <i className='fa fa-power-off mr-1'></i>sign out
                </button>
            </div>
        </div>
         <div className="text-white">
            <div className="menu">
                 <Link href="/backoffice/dashboard">
                Dashboar
                </Link>
            </div>
           <div className="menu">
                <Link href="/backoffice/buy">
                ซื้อสินค้า
                </Link>
            </div>
            <div className="menu">
                <Link href="/backoffice/sell">
               ขายสินค้า
                </Link>
           </div>
            <div className="menu">
                 <Link href="/backoffice/company">
                 ข้อมูลร้านค้า
                 </Link>
            </div>
            <div className="menu">
                 <Link href="/backoffice/user">
                 ผู้ใช้งาน
                 </Link>
            </div>
            <div className="menu">
                 <Link href="/backoffice/product">
                 ซ่อมสินค้า
                 </Link>
            </div>
        </div>

        <Modal isOpen={isOpen} onClose={handleCloseModal} title="แก้ไขข้อมูล">
            <div>
                <div>ชื่อผู้ใช้งาน</div>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

                <div>username</div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <div>password</div>
                <input type="password" onChange={(e) => setPassword(e.target.value)}/>

                <div>confirm password</div>
                <input type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>

                <button className='btn' onClick={handleSave}>บันทึก</button>
            </div>
        </Modal>

       </div>
    );
}