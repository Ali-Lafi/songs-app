import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { login } from '../api/auth';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Label } from '@/components/ui/label';

type LoginPageProps = {
  onLogin: (token: string) => void;
};

export function LoginPage({ onLogin }: LoginPageProps) {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      onLogin(data.accessToken);
      navigate('/admin');
    },
  });
  
  const [searchParams] = useSearchParams();

  const reason = searchParams.get('reason');

  return (
    <div className='flex min-h-[70vh] items-center justify-center'>
      <Card className='w-full max-w-md'>
        <CardHeader>
          <CardTitle className='text-2xl'>Login</CardTitle>
        </CardHeader>
        <CardContent>
          {reason === 'session-expired' && (
            <p className="mb-4 rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700">
              Your session has expired. Please log in again.
            </p>
          )}
          <form className='space-y-4'
            onSubmit={(event) => {
              event.preventDefault();
              loginMutation.mutate({ email, password });
            }}
          >
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
            <Input
            id='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
            />
            </div>

             <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
            <Input
            id='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
              type="password"
            />
            </div>
            <Button type="submit" disabled={loginMutation.isPending} className='w-full cursor-pointer shadow-sm' variant='outline'>
              {loginMutation.isPending ? 'Logging In...' : 'Login'}
            </Button>

            {loginMutation.isError && <p className="text-sm text-red-600">Invalid email or password</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
