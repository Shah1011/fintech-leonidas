import { logoutAccount } from "@/lib/actions/user.actions"
import Image from "next/image"
import { useRouter } from "next/navigation";

const Footer = ({ user, type = 'desktop' }: FooterProps) => {
  const router = useRouter();

  const handleLogout = async () => {
    const loggedOut = await logoutAccount();
    if(loggedOut) router.push('/login');
  }

    // Format the email by showing first 8 and last 10 characters
    const formatEmail = (email: string) => {
        if (email.length <= 18) return email; // No need to truncate if the email is short
        return `${email.slice(0, 8)}...${email.slice(-10)}`;
    };

return (
    <footer className="flex flex-col">
        <div className="footer">
            <div className={type === 'mobile' ? 'footer_name-mobile' : 'footer_name'}>
                <p className="text-xl font-bold text-gray-700">
                    {user?.firstName[0]}
                </p>
            </div>

            <div className={type === 'mobile' ? 'footer_email-mobile' : 'footer_email'}>
                <h1 className="text-14 truncate text-gray-700 font-semibold">
                    {user?.firstName}
                </h1>
                <p className="text-12 truncate font-normal text-gray-600" title={user?.email}>
                    {user?.email ? formatEmail(user.email) : ''}
                </p>
            </div>
        </div>

        <div className="flex gap-2 items-center justify-center cursor-pointer" onClick={handleLogout}>            
            <div className="footer_image">
                <Image
                    src="/icons/logout.svg" 
                    alt="logout"
                    fill
                />
            </div>
            <div>
                <p className="text-14 truncate text-gray-700 font-semibold">
                    Logout
                </p>
            </div>
        </div>

    </footer>
  )
}

export default Footer