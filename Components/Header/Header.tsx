import './Header.css';
import Logo from '../../Images/ArabBank Logo.svg';

function Header() {
    return (
        <div className='Header'>
            <h1>middleware <br />system</h1>
            <img src={Logo} alt='Arabi Bank' />
        </div>
    )
}

export default Header
