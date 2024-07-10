// // Image: senai_logo;
// background: url("senai_logo.png");

import logo from '../../assets/senai.png';
import './logo.css'

export const Logo = () =>{
    return <img id="logo" src={logo} width={110} height={90} alt=""/>
}