'use client'
export default function Navbar() {
  return (
     <nav className="sticky top-0 z-50 bg-white shadow-md">
    <nav className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
      
        <a href="/" className="text-2xl font-bold">LifeConnect</a>

        
        <div className="space-x-6 hidden md:flex">
          <a href="/" className="hover:text-gray-200">Home</a>
          <a href="/AboutUs" className="hover:text-gray-200">About-Us</a>
          <a href="ContactSection" className="hover:text-gray-200">Contact-Us</a>
        </div>

        
        <div className="space-x-3">
          <a
            href="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Sign Up
          </a>
        </div>
      </div>
    </nav>
    </nav>
  );
}
