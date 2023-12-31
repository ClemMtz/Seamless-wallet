import { LoginProps } from '@/utils/types'

import EmailOTP from '../auth/email';
import Google from '../auth/google';
import Logo from './ui/logo';


const Login = ({ token, setToken }: LoginProps) => {
    return (
        <div className=" w-screen h-screen  flex flex-col justify-center items-center  bg-white">
            <Logo />
            <div>
                <h1 className="text-lg mb-8 pl-2">Log in / Sign up</h1>
                <div>
                    <EmailOTP token={token} setToken={setToken} />
                    <h1 className="flex justify-center text-lg">or</h1>
                    <Google token={token} setToken={setToken} />
                </div>
            </div>
        </div>
    )
}

export default Login