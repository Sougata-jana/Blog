import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'

function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 font-sans">
      <section className="relative overflow-hidden py-4">
        <div className="relative z-10 mx-auto max-w-7xl px-4">
            <div className="-m-4 flex flex-wrap items-center justify-between">
                <div className="w-full p-4 md:w-1/2 lg:w-1/3 flex items-center gap-2">
                    <Logo width="80px" />
                    <span className="text-sm text-gray-500 font-semibold">&copy; 2023 DevUI. All Rights Reserved.</span>
                </div>
                <div className="w-full p-4 md:w-1/2 lg:w-2/3 flex flex-wrap gap-4 justify-end">
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Features</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Pricing</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Affiliate</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Press Kit</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Account</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Help</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Contact</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Support</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Terms</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Privacy</Link>
                    <Link className="text-blue-600 hover:underline text-sm font-semibold" to="/">Licensing</Link>
                </div>
            </div>
        </div>
      </section>
    </footer>
  )
}

export default Footer