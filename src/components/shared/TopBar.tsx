import { Link } from 'react-router-dom'

const TopBar = () => {
    return (
        <section className='topbar'>
            <div className='flex-between py-5 px-5'>
                <Link to="/" className='flex gap-3 items-center'>
                    <img
                        src='/assets/images/logo-new.svg' alt='logo'
                        width={60} height={15} className='rounded-full' />
                    <h2 className='h3-bold md:h2-bold text-left w-full ml-2'>Petshop</h2>
                </Link>
            </div>
        </section>
    )
}

export default TopBar