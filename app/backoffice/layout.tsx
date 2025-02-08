import Sidebar from "./sidebar";

export default function BackOfficeLayout({ children }: {
    children: React.ReactNode;
}) {
    return ( 
        <div className="flex">
            <Sidebar />
            <div className="flex-1 bg-gray-200 h-screen">
                <div className="bg-white shadow-xl rounded p-3 m-3">
                    {children}
                </div>
                

                
            </div>
        </div>
    
    );
}