import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUtensils, faUser } from '@fortawesome/free-solid-svg-icons'


function Footer() {
    return (
        <footer className="footer">
            <menu className='footer-menu'>
                <nav className='footer-nav'>
                    <ul className='footer-list'>
                        <li className='footer-item'>
                            <Link to='/' className='footer-link'>
                                <FontAwesomeIcon icon={faHome} />
                            </Link>
                        </li>
                        <li className='footer-item'>
                            <Link to='/today' className='footer-link footer-link-active'>
                                <FontAwesomeIcon icon={faUtensils} />
                            </Link>
                        </li>
                        <li className='footer-item'>
                            <Link to='/settings' className='footer-link'>
                                <FontAwesomeIcon icon={faUser} />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </menu>
        </footer>
    )
}

export default Footer