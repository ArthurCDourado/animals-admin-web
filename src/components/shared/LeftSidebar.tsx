import { sidebarLinks } from '@/constants'
import { INavLink } from '@/types'
import { Link, NavLink, useLocation } from 'react-router-dom'

const LeftSidebar = () => {
    const { pathname } = useLocation()

    return (
        <nav className='leftsidebar'>
            <div className='flex flex-col gap-11'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img
                        src='/assets/images/logo-new.svg' alt='logo'
                        width={60} height={15} className='rounded-full' />
                    <h2 className='h3-bold md:h2-bold text-left w-full ml-2'>Petshop</h2>
                </Link>

                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) => {
                        const isActive = pathname === link.route

                        return (
                            <li key={link.label} className={`leftsidebar-link group ${isActive && 'bg-primary-500'}`}>
                                <NavLink to={link.route} className='flex gap-4 items-center p-4'>
                                    <img src={link.imgURL} alt={link.label} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </nav>
    )
}

export default LeftSidebar