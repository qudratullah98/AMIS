import ApplicationLogo from "@/Components/ApplicationLogo"; 
export default function GuestLayout({ children }) {
    return (
        <div
            className="flex min-h-screen items-center justify-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url('/images/bus.png')`,
                
            }}
        >
            <div className="w-full max-w-sm space-y-4 rounded-none bg-white bg-opacity-95 px-8 py-8 shadow-2xl sm:rounded-2xl dark:bg-gray-800 dark:bg-opacity-90">
                <div className="flex justify-center">
                        <ApplicationLogo className="h-20 w-25 fill-current text-indigo-600 dark:text-indigo-400" />
                </div>
                {children}
            </div>
        </div>
    );
}
