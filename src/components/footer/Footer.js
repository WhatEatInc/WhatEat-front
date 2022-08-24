import { NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUtensils, faUser } from '@fortawesome/free-solid-svg-icons'


function Footer() {

    function getClassName({ isActive }) {
        return isActive ? 'footer-link footer-link-active' : 'footer-link'
    }

    return (
        <footer className="footer">
            <menu className='footer-menu'>
                <nav className='footer-nav'>
                    <ul className='footer-list'>
                        <li className='footer-item'>
                            <NavLink to='/' className={getClassName}>
                                <FontAwesomeIcon icon={faHome} />
                            </NavLink>
                        </li>
                        <li className='footer-item'>
                            <NavLink to='/today' className={getClassName}>
                                <FontAwesomeIcon icon={faUtensils} />
                            </NavLink>
                        </li>
                        <li className='footer-item'>
                            <NavLink to='/settings' className={getClassName}>
                                <FontAwesomeIcon icon={faUser} />
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </menu>
        </footer>
    )
}

export default Footer