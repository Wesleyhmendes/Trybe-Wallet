import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userLogin } from '../../redux/actions';
import './login.modules.css';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });
  const { email, password } = form;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validateInfo = (validateEmail: string, validatePassword: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const testEmail = emailRegex.test(validateEmail);
    const testPassword = validatePassword.length >= 6;
    return testEmail && testPassword;
  };

  const isDisable = validateInfo(email, password);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleClick = () => {
    dispatch(userLogin(form));
    setForm({
      email: '',
      password: '',
    });
    navigate('/carteira');
  };

  return (
    <section className="loginSection">
      <form className="mainform">
        <div className="loginTitle">
          <img className="moneyFormIcon" src="src/assets/money-icon.png" alt="" />
          <h1>
            Trybe
            <span className="walletWord">Wallet</span>
          </h1>
        </div>
        <div className="loginInputsAndButton">
          <label className="loginInputs" htmlFor="email">
            <input
              onChange={ (event) => handleChange(event) }
              value={ email }
              name="email"
              type="email"
              className="emailInput"
              placeholder="Email"
              data-testid="email-input"
            />
            <input
              onChange={ (event) => handleChange(event) }
              value={ password }
              name="password"
              className="passwordInput"
              type="password"
              placeholder="Password"
              data-testid="password-input"
            />
          </label>
          <button
            className="loginButton"
            onClick={ handleClick }
            disabled={ !isDisable }
            type="button"
          >
            Entrar
          </button>
        </div>
      </form>
    </section>
  );
}

export default Login;
