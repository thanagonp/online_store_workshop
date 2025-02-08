'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { confic } from "@/app/config";

export default function CompanyPage() {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [taxCode, setTaxCode] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        const res = await axios.get(`${confic.apiUrl}/api/company/list`);
        setName(res.data.name);
        setAddress(res.data.address);
        setPhone(res.data.phone);
        setEmail(res.data.email);
        setTaxCode(res.data.taxCode);
    };
    
    const handleSave = async () => {
        try{
            const payload = {
                name: name,
                address: address,
                phone: phone,
                email: email,
                taxCode: taxCode,
            }

            await axios.post(`${confic.apiUrl}/api/company/create`, payload);
            Swal.fire({
                icon: 'success',
                title: 'Save Success',
                text: 'บันทึกข้อมูลเรียบร้อย',
                timer: 2000
            });

        }catch(error){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: 'ไม่สามารถบันทึกข้อมูลได้',
            })
        }
    };

    return (
        <div>
               <h1 className="content-header">ข้อมูลร้านค้า</h1>
            <div className='mt-3'>
                <label>ชื่อร้านค้า</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} />

                <label>ที่อยู่</label>
                <input type="text" value={address} onChange={e => setAddress(e.target.value)} />

                <label>เบอร์โทร</label>
                <input type="text" value={phone} onChange={e => setPhone(e.target.value)} />
                
                <label>อีเมล</label>
                <input type="text" value={email} onChange={e => setEmail(e.target.value)} />

                <label>เลขประจำตัวผู้เสียภาษี</label>
                <input type="text" value={taxCode} onChange={e => setTaxCode(e.target.value)} />

                <button onClick={handleSave} className='btn'>
                    บันทึก
                </button>
            </div>
        </div>
    );
}