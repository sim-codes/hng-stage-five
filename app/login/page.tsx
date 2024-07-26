import Logo from '@/app/ui/logo';
import LoginForm from '@/app/ui/login-form';

export default function Page() {

    return (
        <main className="w-full min-h-screen max-w-7xl mx-auto flex justify-center sm:items-center items-start">
            <div className="w-[476px] flex flex-col gap-14 rounded-lg">
                <Logo />
                <div className="w-full flex flex-col gap-1 bg-white p-10 space-y-5">
                    <div className="flex flex-col gap-2">
                        <h1 className='font-bold text-3xl text-black'>Login</h1>
                        <span className='text-sm text-darkGrey'>Add your details below to get back into the app</span>
                    </div>
                    <LoginForm />
                </div>
            </div>
        </main>
    )
}

