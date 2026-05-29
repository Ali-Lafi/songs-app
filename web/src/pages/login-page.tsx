import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { login } from "../api/auth";

type LoginPageProps ={
    onLogin:(token:string)=>void
}

export function LoginPage({onLogin}:LoginPageProps){
    const navigate = useNavigate();

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const loginMutation = useMutation({
        mutationFn:login,
        onSuccess:(data)=>{
            localStorage.setItem('accessToken',data.accessToken);
            onLogin(data.accessToken)
            navigate('/admin')
        }
    })

    return( 
<div>
        <h1>Login</h1>
    <form onSubmit={(event)=>{
        event.preventDefault();
        loginMutation.mutate({email,password})
    }}>
        <input value={email} onChange={(event)=>setEmail(event.target.value)} placeholder="Email"/>
        <input value={password} onChange={(event)=>setPassword(event.target.value)} placeholder="Password" type="password"/>

        <button type="submit" disabled={loginMutation.isPending}>
            {loginMutation.isPending? "Logging In...": "Login"}
        </button>

        {loginMutation.isError && <p>Invalid email or password</p>}

    </form>
</div>
)
}