import { Injectable } from '@angular/core';
// import { any } from '../shell/modal/modal.component';

@Injectable({ providedIn: 'root' })
export class ModalService {
  private modals: any[] = [];

  /**
   * add modal to array of active modals
   * @params modal - instance of modal component
   */
  add(modal: any): void {
    this.modals.push(modal);
  }

  /**
   * remove modal from array of active modals
   * @params id- id atribute of modal component
   */
  remove(id: string): void {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  /**
   * open modal specified by id
   * @params id- id atribute of modal component
   */
  open(id: string): void {
    const modal = this.modals.find(x => x.id === id);
    modal.open();
  }

  /**
   * close modal specified by id
   * @params id- id atribute of modal component
   */
  close(id: string) {
    const modal = this.modals.find(x => x.id === id);
    modal.close();
  }
}
