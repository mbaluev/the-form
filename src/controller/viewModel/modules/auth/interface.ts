import { IBaseCardViewModel } from '@viewModel/modules/baseCard/interfaces';
import { IUserDTO } from '@model/user';

export interface IAuthViewModel extends IBaseCardViewModel<IUserDTO> {
  token?: string;
  message?: string;

  signup: () => Promise<boolean>;
  login: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  refreshToken: () => Promise<void>;

  isAuth: boolean;
  username?: string;
  roles?: string[];

  clearMessage: () => Promise<void>;
}
