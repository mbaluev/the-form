import { action, makeObservable, observable } from 'mobx';
import { injectable } from 'inversify';
import { guid } from '@utils/guid/guid';
import { INotifyViewModel } from '@viewModel/modules/notify/interface';
import { INotifyItem } from '@model/notify';
import { VariantType } from 'notistack';
import { BaseViewModel } from '@viewModel/modules/base';

@injectable()
export class NotifyViewModel extends BaseViewModel implements INotifyViewModel {
  constructor() {
    super();
    makeObservable(this, {
      items: observable,
      setItems: action,
      setItem: action,
      add: action,
      remove: action,
      parseError: action,
    });
  }

  items: INotifyItem[] | undefined = undefined;

  setItems = (data?: INotifyItem[]) => {
    this.items = data;
  };

  setItem = (item: INotifyItem) => {
    const items = this.items ? [...this.items] : [];
    items.push(item);
    this.setItems(items);
  };

  add = (variant: VariantType, message: string, title?: string) => {
    const data: INotifyItem = {
      guid: guid(),
      message,
      variant,
      title,
    };
    this.setItem(data);
  };

  remove = (id: string) => {
    const items = this.items?.filter((d) => d.guid !== id);
    this.setItems(items);
  };

  parseError = (error: any) => {
    let message;
    if (error.response) {
      message = error.response.statusText;
      if (error.response.data && error.response.data.message) {
        message = error.response.data.message;
      }
    } else {
      message = error.message;
    }
    if (!message) message = error;
    return message;
  };
}
