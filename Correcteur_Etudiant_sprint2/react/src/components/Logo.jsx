// src/components/Logo.jsx
import logo from '../assets/img/men.png';

export default function Logo() {
    return (
        <div className="logo">
            <img src={logo} alt="Logo" />
        </div>
    );
}