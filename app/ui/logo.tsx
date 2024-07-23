import Link from "next/link"
import Image from "next/image";
import fullLogo from '@/public/logo.svg';

export default function Logo() {
    return (
        <Link href='/' className="flex justify-start sm:justify-center px-10 mt-10 sm:mt-0">
            <Image src={fullLogo} alt="Logo" priority={false} />
        </Link>
    )
}
