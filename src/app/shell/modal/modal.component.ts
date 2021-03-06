﻿import { Component, ViewEncapsulation, ElementRef, Input, OnInit, OnDestroy } from '@angular/core';

import { ModalService } from '../../services/modal.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: 'modal.component.html',
  styleUrls: ['modal.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  @Input() routable: boolean;
  private element: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', el => {
      if (el.target.className === 'modal-container') {
        this.close();
        if (this.routable) {
          this.router.navigate(['../'], { relativeTo: this.route });

        }
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  /**
   * open modal
   */
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('modal-container-open');
  }

  /**
   * close modal
   */
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('modal-container-open');
  }
}
