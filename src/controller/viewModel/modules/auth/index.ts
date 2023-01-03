import { inject, injectable } from 'inversify';
import { SERVICE } from '@service/ids';
import { action, computed, makeObservable, observable } from 'mobx';
import { IUserDTO } from '@model/user';
import { IAuthViewModel } from '@viewModel/modules/auth/interface';
import { AuthService } from '@service/modules/auth';
import { BaseCardViewModel } from '@viewModel/modules/baseCard';
import { setCookies, getCookie, removeCookies } from 'cookies-next';
import cookie from '@utils/cookie';
import { UserService } from '@service/modules/user';
import { Jwt } from '@utils/jwt';

@injectable()
export class AuthViewModel
  extends BaseCardViewModel<IUserDTO>
  implements IAuthViewModel
{
  @inject(SERVICE.Auth) protected serviceAuth!: AuthService;

  @inject(SERVICE.User) protected serviceUser!: UserService;

  constructor() {
    super();
    makeObservable(this, {
      token: observable,
      setToken: action,
      message: observable,
      setMessage: action,

      signup: action,
      login: action,
      logout: action,
      refreshToken: action,

      isAuth: computed,
      firstname: computed,
      lastname: computed,
      username: computed,
      roles: computed,

      clearMessage: action,
      clearToken: action,
    });
    this.setValidations([
      { nameSpace: 'firstname', type: 'required', message: 'Required' },
      { nameSpace: 'lastname', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'required', message: 'Required' },
      { nameSpace: 'username', type: 'email', message: 'Not correct email' },
      { nameSpace: 'password', type: 'required', message: 'Required' },
    ]);
    this.setToken((getCookie(cookie.names.token) as string) || undefined);
  }

  // --- observable

  token?: string | null = undefined;

  setToken = (data?: string | null) => {
    this.token = data;
    if (data) {
      setCookies(cookie.names.token, data, cookie.options);
    } else {
      removeCookies(cookie.names.token);
    }
  };

  message?: string = undefined;

  setMessage = (data?: string) => {
    this.message = data;
  };

  // --- action

  signup = async () => {
    this.validate();
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.signup(this.data);
        if (data && data.token) {
          this.setToken(data.token);
          await this.clearChanges();
          await this.clearData();
          return true;
        }
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  login = async () => {
    this.validate(['username', 'password']);
    if (this.data && !this.hasErrors) {
      this.setDataLoading(true);
      try {
        const data = await this.serviceAuth.login(this.data);
        if (data && data.token) {
          this.setToken(data.token);
          await this.clearChanges();
          return true;
        } else {
          this.setMessage('Incorrect username or password');
        }
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  logout = async () => {
    this.setDataLoading(true);
    if (this.token) {
      try {
        const ret = await this.serviceAuth.logout(this.token);
        if (ret && ret.success) {
          this.setToken();
          await this.clearData();
          return true;
        }
      } finally {
        this.setDataLoading(false);
      }
    }
    return false;
  };

  refreshToken = async () => {
    if (this.isAuth) {
      try {
        const data = await this.serviceAuth.refreshToken();
        if (data) this.setToken(data.token);
      } finally {
        this.setDataLoading(false);
      }
    }
  };

  // --- computed

  get isAuth() {
    return Boolean(this.token);
  }

  get firstname() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.firstname;
    }
    return undefined;
  }

  get lastname() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.lastname;
    }
    return undefined;
  }

  get username() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.username;
    }
    return undefined;
  }

  get roles() {
    if (this.token) {
      return new Jwt(this.token).decodedClaims?.roles;
    }
    return undefined;
  }

  // --- clear

  clearMessage = async () => {
    try {
      this.setMessage();
    } finally {
    }
  };

  clearToken = async () => {
    try {
      this.setToken();
    } finally {
    }
  };
}
