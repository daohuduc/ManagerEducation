import React, { Component } from 'react';
import styles from './styles.css';
import Recaptcha from 'react-recaptcha';
import { connect } from 'react-redux';
import { sessionOperations } from '../../../../../../state/ducks/session';

class FormPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            role: '',
            rememberMe: false,
            isVerifyCaptcha: false,
            submitted: false
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ submitted: true });
        const { username, password, role, rememberMe } = this.state;
        // const { dispatch } = this.props;
        // if (username && password && role) {
        //     dispatch(userActions.login(username, password));
        // }
        this.props.login(username, password, rememberMe);
    }

    callback = () => {
    }
    verifyCallback = (res) => {
        if (res) {
            this.setState({ isVerifyCaptcha: true })
        }
    }
    render() {
        // const { loggingIn } = this.props;
        console.log(this.props.isAuth);
        const { username, password, role, submitted } = this.state;
        return (
            <form action="###" onSubmit={this.handleSubmit}>
                <h3 className="titleLogin">Đăng nhập</h3>
                <input className={`form-control ${styles.uName} ${styles.control}`} id="UserName" name="username" placeholder="Mã đăng nhập cá nhân" type="text" onChange={this.handleChange} />
                <input autoComplete="off" className={`form-control ${styles.uPass} ${styles.control}`} id="Password" name="password" placeholder="Mật khẩu" type="password" onChange={this.handleChange} />
                <select name="role" style={{ marginTop: 15, fontSize: 13, color: '#6c757d' }} className={`custom-select mr-sm-2 ${styles.control}`} onChange={this.handleChange}>
                    <option value="null" selected>-- Đăng nhập với tư cách --</option>
                    <option value="adminstrator">Tài khoản quản trị viên</option>
                    <option value="teacher">Tài khoản giáo viên</option>
                    <option value="parents">Tài khoản phụ huynh</option>
                    <option value="students">Tài khoản học sinh</option>
                </select>
                <div className={`${styles.captcha}`}>
                    <Recaptcha
                        sitekey="6Le4A58UAAAAAJ3NVFsfXkEo67Ny2AvZwhFeB3kx"
                        render="explicit"
                        onloadCallback={this.callback}
                        verifyCallback={this.verifyCallback}
                    />
                </div>
                <div className="form-group form-check" style={{marginTop: 10, fontSize: 13}}>
                    <label className="form-check-label">
                    <input className="form-check-input" style={{marginTop: 0}} type="checkbox" name="rememberMe"/> Lưu tài khoản?
                    </label>
                </div>
                <a href="#" style={{ color: '#666666' }}><small>Quên mã đăng nhập?</small></a>
                <div className="mgt" style={{ color: 'red' }}>
                </div>
                <input type="submit" id="btn-dangnhap" className={`btn btn-success btn-block ${styles.btnLogin}`} value="ĐĂNG NHẬP" style={{ marginTop: 15 }} /><br />
            </form>
        );
    }
}

const mapStateToProps = state => ( {
    isAuth: state.session.isAuthenticated
});

const mapDispatchToProps = {
    login: sessionOperations.login
};

export default connect(mapStateToProps, mapDispatchToProps)(FormPanel);
