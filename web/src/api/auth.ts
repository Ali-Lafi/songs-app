export type LoginInput={
    email:string;
    password:string;
}

export type LoginResponse ={
    accessToken:string;
}

export async function login(input:LoginInput):Promise<LoginResponse>{
    const response = await fetch('http://localhost:3000/api/auth/login',{
        method:'POST',
        headers: {
            'Content-Type':'application/json' 
        },
        body:JSON.stringify(input)
    });

    if(!response.ok) throw new Error('Invalid email or password');
    return response.json();
}