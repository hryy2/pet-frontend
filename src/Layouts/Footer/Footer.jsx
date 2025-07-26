import { Link, NavLink } from 'react-router-dom'
import { socialMedia } from '../../assets/ImportantData/socialMediaUrl'
import { pages } from '../../assets/ImportantData/pagesNameAndPath'

const Footer = () => {
  return (
    <footer className="bg-[#f5eeeb] text-[#333] py-12 px-6 md:px-20 border-t border-[#e0dcd8]">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* Brand / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Lovepet</h2>
          <p className="text-sm text-[#666] leading-relaxed">
            Curating timeless fashion pieces that inspire confidence and grace in every look.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {pages.map((item, index) => (
              <li key={index}>
                <NavLink
                  to={item.route}
                  className="text-[#555] hover:text-black transition"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact + Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>
          <p className="text-sm text-[#555]">Pet Village, Earth</p>
          <p className="text-sm text-[#555]">+64 1234567899</p>
          <p className="text-sm text-[#555] mb-4">Lovepet@gmail.com</p>

          <div className="flex space-x-4 mt-2">
            {socialMedia.map((item, idx) => (
              <Link
                key={idx}
                to={item.link}
                className="text-[#333] hover:text-[#000] text-xl transition"
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <hr className="my-8 border-[#e0dcd8]" />

      <p className="text-center text-[#666] text-sm">
        &copy; 2025 Lovepet. Designed by Tilly.
      </p>
    </footer>
  )
}

export default Footer
