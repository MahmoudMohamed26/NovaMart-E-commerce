export default function Footer(){
    return(
        <footer className="bg-blue-600 text-white py-4 mt-10">
            <div className="container mx-auto text-center">
                <p className="text-sm">© {new Date().getFullYear()} Mahmoud Kamel. All rights reserved.</p>
                <p className="text-xs mt-2">Links 
                    <a href="https://www.linkedin.com/in/mahmouud-kamel/" className="text-blue-400 ml-1 hover:underline">LinkedIn</a>, 
                    <a href="https://github.com/MahmoudMohamed26" className="text-blue-400 ml-1 hover:underline">GitHub</a>,
                    <a href="https://www.facebook.com/zCrashed" className="text-blue-400 ml-1 hover:underline">Facebook</a>
                </p>
            </div>
        </footer>
    );
}