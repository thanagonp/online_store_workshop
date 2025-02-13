'use client'

import { useState , useEffect, use} from "react";
import {
    BarChart, Bar , XAxis, YAxis, CartesianGrid, Tooltip, Legend,ResponsiveContainer
} from 'recharts';
import { confic } from "@/app/config";
import Swal from "sweetalert2";
import axios from "axios";

export default function DashboardPage() {
    const [data, setData] = useState<any[]>([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalRepair, setTotalRepair] = useState(0);
    const [totalSell, setTotalSell] = useState(0);

    useEffect(() => {
        fetchData();
        renderChart();
    }, []);

    const fetchData = async () => { 
        try{

            const response = await axios.get(`${confic.apiUrl}/api/sell/dashboard`);
            setTotalSell(response.data.totalSell);
            setTotalRepair(response.data.totalRepair);
            setTotalIncome(response.data.totalIncome);

        }catch(error: any){
            Swal.fire({
                icon: 'error',
                title: 'Save Failed',
                text: error.message
            })
        }
    }

    const renderChart = () => {
        const months = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const data = months.map((month, index) => ({
            name: month,
            income: Math.floor(Math.random() * 10000) 
        }));

        setData(data);
    };

    const box = (color: string , title: string, value:string) => {
        return (
            <div className={`flex flex-col gap-4 items-end w-full ${color} p-4 rounded-lg text-white`}>
               <div className="text-2xl font-bold">{title}</div>
               <div className="text-4xl font-bold">{value}</div>
            </div>
        );
    };

    return (
        <div>
            <h1 className="content-header">Dashboard</h1>
            <div className="flex gap-4 mt-4">
                {box('bg-purple-600','ยอดขายทั้งหมด',totalIncome.toLocaleString() + ' บาท')}
                {box('bg-blue-600','งานรับซ่อม',totalRepair.toLocaleString() + ' งาน')}
                {box('bg-green-600','รายการขาย',totalSell.toLocaleString() + ' รายการ')}
            </div>
            <div className="text-center mb-4 mt-5 text-xl font-bold">รายได้แต่ละเดือน</div>
            <div style={{width: '100%',height: '400px'}}>
                <ResponsiveContainer>
                    <BarChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value:number) => `รายได้ ${value.toLocaleString()} บาท`} />
                        <Legend />
                        <Bar dataKey="income" fill="teal" opacity={0.5}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>

        </div>
    );
}