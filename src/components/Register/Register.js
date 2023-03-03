import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';
import './Register.css'

const Register = () => {
    const [error,setError] = useState(null);
    const {createUser} = useContext(AuthContext);
    const handleSubmit = (event)=>{
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;

        if(password.length<6){
            setError('Password should be 6 ')
        }
        if(password !== confirm){
            setError('Your Password did not match');
            return;
        }
        createUser(email, password)
            .then(result=>{
                const user = result.user;
                console.log(user);
                form.reset();

            })
            .catch(error=>{
                console.error(error);
            })
        
    }
    return (
        <div className='form-container'>
        <h2 className='form-title'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
        <div className="form-control">
                <label htmlFor="name">User Name</label>
                <input type="text" name="name" required />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" required />
            </div>
            <div className="form-control">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
            </div>
            <div className="form-control">
                <label htmlFor="confirm">Confirm Password</label>
                <input type="password" name="confirm" required />
            </div>
            <input className='btn-submit' type="submit" value="Sign Up" />
        </form>
        <p>Already have an account? <Link to='/register'>Login</Link></p>
        <p className='text-error'>{error}</p>
    </div>
    );
};

export default Register;