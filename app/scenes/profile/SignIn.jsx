import React, { PropTypes } from 'react';
import { Button } from 'react-toolbox/lib/button';
import { Input } from 'react-toolbox/lib/input';
import { ErrorMessage, Loader } from '../../components/messages';
import { Auth, User } from '../../services/auth';

export default class SignIn extends React.Component {

  state = this.initialState();

  initialState() {
    return {
      email: this.props.user.email || '',
      password: '',
      error: null,
      loading: false,
      success: false,
    };
  }

  handleChange = name => value => this.setState({ ...this.state, [name]: value });

  handleSignIn = () => {
    const onSuccess = () => {
      // nothing
    };

    const onFailure = (error) => {
      this.setState({ ...this.state, error, loading: false });
    };

    this.setState({ ...this.state, password: '', loading: true });

    this.props.auth.signIn({
      email: this.state.email,
      password: this.state.password,
      onSuccess,
      onFailure,
    });
  };

  render() {
    return (
      <div>
        <h1>Sign in</h1>
        <Input
          type="text"
          label="E-mail Address"
          name="email"
          value={this.state.email}
          onChange={this.handleChange('email')}
        />
        <Input
          type="password"
          label="Password"
          name="password"
          value={this.state.password}
          onChange={this.handleChange('password')}
        />
        {this.state.error && <ErrorMessage text={this.state.error.message} />}
        {this.state.loading ?
          <Loader text="Signing in..." /> :
          <Button label="Sign in" onClick={this.handleSignIn} raised primary />
        }
      </div>
    );
  }
}

SignIn.propTypes = {
  auth: PropTypes.instanceOf(Auth).isRequired,
  user: PropTypes.instanceOf(User).isRequired,
};