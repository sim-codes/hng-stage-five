import Logo from '@/app/ui/logo';
import RegisterForm from '@/app/ui/register-form';

export default function Page() {
    return (
        <main className="w-full min-h-screen max-w-7xl mx-auto flex justify-center items-center">
            <div className="w-[476px] flex flex-col gap-14 rounded-lg">
                <Logo />
                <div className="w-full flex flex-col gap-1 bg-white p-10 space-y-5">
                    <div className="flex flex-col gap-2">
                        <h1 className='font-bold text-3xl text-black'>Create account</h1>
                        <span className='text-sm text-darkGrey'>Let&lsquo;s get you started sharing your links!</span>
                    </div>
                    <RegisterForm />
                </div>
            </div>
        </main>
    )
}
