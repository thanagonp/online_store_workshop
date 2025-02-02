export default function Sidebar() {
    return (
       <div className="bg-gray-200 h-screen w-64">
        <div className="p-5 text-xl font-bold">
            <h1>Menu</h1>
        </div>
         <div className="p-5">
            <div>Dashboard</div>
            <div>Company</div>
            <div>Users</div>
         </div>
       </div>
    );
}