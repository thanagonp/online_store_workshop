'use client';

import { useState } from "react";
import { confic } from "../config";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function SignInPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const router = useRouter();

    const handleSignIn = async () => {
        try {
            const payload = {
                username,
                password,
            };
            const response = await axios.post(`${confic.apiUrl}/api/user/signin`,payload);

            if(response.data.token !== null){
                localStorage.setItem('token', response.data.token);
                router.push('/backoffice/dashboard');
            }else{
                Swal.fire({
                    icon: 'warning',
                    title: 'Sign In Failed',
                    text: 'Invalid username or password',
                });
            }
        } catch (error: any) {
            Swal.fire({
                icon: 'error',
                title: 'Sign In Failed',
                text: error.response.data.message,
            });
        }
    }

    return (
        <div className="signin-container">
            <div className="signin-box">
                <h1 className="text-2xl font-bold">Sign In</h1>

                <div>Username</div>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>

                <div>Password</div>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>

                <button onClick={handleSignIn}>Sign In</button>
            </div>
        </div>
    );
}