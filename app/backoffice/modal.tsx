// modal component
'use client';

interface ModalProps {
    title: string;
    children: React.ReactNode;
    isOpen: boolean;
    onClose: () => void;
}
export default function Modal({ title, children, isOpen, onClose }: ModalProps) {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className={'bg-white rounded-lg shadow-lg w-1/2'}>
                        <h2 className="text-lg font-bold mb-4 bg-teal-500 text-white p-3 rounded-t-lg">
                            {title}
                             <button
                                className="text-white float-right"
                                onClick={onClose}
                            >
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </h2>
                
                    <div className="mt-4 p-2">
                        {children}
                    </div>
                </div>
            </div>
        )
    )
}
