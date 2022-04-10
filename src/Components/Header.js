import React from 'react';
import '../Styles/header.css';
import { withRouter } from 'react-router-dom';
import Modal from 'react-modal';
import GoogleLogin from 'react-google-login';
import axios from 'axios'



const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: 'antiquewhite',
        border: '1px solid brown'
    },
};


class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            loginModalIsOpen: false,
            isLoggedIn: false,
            userName: undefined,
            IsLogeInPage: false,
            signupModalIsOpen: false,
            email:'',
            pwd:''
        }
    }

    handleNavigate = () => {
        this.props.history.push('/');
    }

    handleModal = (state, value) => {
        this.setState({ [state]: value });
    }

    responseGoogle = (response) => {
        this.setState({ isLoggedIn: true, userName: response.profileObj.name, loginModalIsOpen: false });
    }

    handleLogout = () => {
        this.setState({ isLoggedIn: false, userName: undefined });
    }

    handleInputChange = (event, state) => {
        this.setState({ [state]: event.target.value });
    }

    handleLogin = () => {
        const { email, pwd } = this.state;
        const loginObj = {
            email: email,
            password: pwd
        };
        axios({
            method: 'GET',
            url: 'https://gentle-brushlands-53587.herokuapp.com/login',
            headers: { 'Content-Type': 'application/json' },
            data: loginObj
        })
            .then(response => {
                this.setState({
                    isLoggedIn: response.data.isAuthenticated,
                    loginModalIsOpen: false,
                    /*email: '',
                    pwd: '', */
                });
                sessionStorage.setItem('isLoggedIn', response.data.isAuthenticated);
            })
            .catch(err => console.log(err))
    }
    
    render() {
        const { loginModalIsOpen, isLoggedIn, userName, IsLogeInPage, signupModalIsOpen, email, pwd } = this.state;
        return (
            <div>
                <div className='header'>
                    <div className="header-logo" onClick={this.handleNavigate}>
                        <p>e!</p>
                    </div>
                    {isLoggedIn ? <div className="header-user">
                        <div className="login">{userName}</div>
                        <div className="signup" onClick={this.handleLogout}>Logout</div>
                    </div> :
                        <div className="header-user">
                            <div className="login" onClick={() => this.handleModal('loginModalIsOpen', true)}>Login</div>
                            <div className="signup" onClick={() => this.handleModal('signupModalIsOpen', true)}>Create an account</div>
                        </div>}
                </div>
                <Modal
                    isOpen={loginModalIsOpen}
                    style={customStyles}
                >
                    <div className="log">
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginTop: '-18px' }}
                            onClick={() => this.handleModal('loginModalIsOpen', false)}>
                        </div>
                        <button className="btn btn-primary loginWithCred" onClick={()=>{this.handleModal('IsLogeInPage', true); 
                        this.handleModal('loginModalIsOpen', false)}}>Login with Credentails</button>
                        <div className="loginWithGoogle">
                            <GoogleLogin
                                clientId="574576518150-tstghoaone922vg8m7u4sjdcinft690b.apps.googleusercontent.com"
                                buttonText="Continue with Gmail"
                                onSuccess={this.responseGoogle}
                                onFailure={this.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                            />
                        </div>
                    </div>

                </Modal>

                <Modal
                    isOpen={IsLogeInPage}
                    style={customStyles}
                >
                    <div className="log">
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginTop: '-18px' }}
                            onClick={() => this.handleModal('IsLogeInPage', false)}>
                        </div>
                        <form>
                            <label class="form-label">Email</label>
                            <input style={{ width: '370px' }} type="text" value={email} class="form-control" onChange={(event) => this.handleInputChange(event , 'email')} />
                            <label class="form-label">Password</label>
                            <input type="password" value={pwd} class="form-control" onChange={(event) => this.handleInputChange(event, 'pwd')} />
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} onClick={()=>this.handleLogin()}>Login</button>
                        </form>
                    </div>

                </Modal>

                <Modal
                    isOpen={signupModalIsOpen}
                    style={customStyles}
                >
                    <div className="log">
                        <div className="glyphicon glyphicon-remove" style={{ float: 'right', marginTop: '-18px' }}
                            onClick={() => this.handleModal('signupModalIsOpen', false)}>
                        </div>
                        <form>
                            <label class="form-label">First Name</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('lastname', event)} />
                            <label class="form-label">Last Name</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('username', event)} />
                            <label class="form-label">Username</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('firstname', event)} />
                            <label class="form-label">Email</label>
                            <input style={{ width: '370px' }} type="text" class="form-control" onChange={(event) => this.handleInputChange('Email', event)} />
                            <label class="form-label">Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('password', event)} />
                            <label class="form-label">Confirm Password</label>
                            <input type="text" class="form-control" onChange={(event) => this.handleInputChange('confirmPassword', event)} />
                            <button class="btn btn-danger" style={{ marginTop: '20px', float: 'right' }} onClick={this.handleSignUp}>Sign Up</button>
                        </form>
                    </div>

                </Modal>
            </div>
        )
    }
}

export default withRouter(Header);
