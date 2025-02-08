import Link from 'next/link';
export default function Sidebar() {
    return (
       <div className="bg-teal-600 h-screen w-40">
        <div className="p-3 text-xl font-bold text-center bg-teal-700 text-white">
            <h1>MSA</h1>
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
       </div>
    );
}