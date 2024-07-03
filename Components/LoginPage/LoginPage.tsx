import './LoginPage.css';
import Logo from '../../Images/Logo.jpg';
import { useNavigate } from 'react-router';

function LoginPage() {
    const HomePage = useNavigate();
    return (
        <div className='LoginPage'>
            <div className='content'>
                <div className='Logo'>
                    <img src={Logo} alt='Arabi Bank' />
                </div>
                <div className='userInput'>
                    <div className="input_wrap">
                        <input type="text" required />
                        <label>user name</label>
                        <i className="bi bi-person-fill"></i>
                    </div>

                    <div className="input_wrap">
                        <input type="password" required />
                        <label>password</label>
                        <i className="bi bi-key-fill"></i>
                    </div>

                    <div className='LoginBtn'>
                        <button onClick={() => { HomePage('/') }}>login</button>
                        <p>forget password ?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
