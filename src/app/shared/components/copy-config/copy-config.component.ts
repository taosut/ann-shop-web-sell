import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CopyConfigService } from '../../services/copy-config.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { User } from '../../interfaces/user';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'
import { CurrencyService } from '../../services/currency.service';
import { formatNumber } from '@angular/common';


@Component({
    selector: 'app-copy-config',
    templateUrl: './copy-config.component.html',
    styleUrls: ['./copy-config.component.scss']
})
export class CopyConfigComponent implements OnDestroy, OnInit {
    private destroy$: Subject<void> = new Subject();

    @ViewChild('modal', { read: TemplateRef }) template: TemplateRef<any>;

    modalRef: BsModalRef;
    user: User = {
        name: 'dummy',
        shop: {
            phone: null,
            address: null
        },
        setting: {
            showSKU: true,
            showProductName: true,
            increntPrice: 0
        }
    };
    // formattedAmount: string;
    currencySymbol: string;
    increntPrice: string = "";

    constructor(
        private copyConfig: CopyConfigService,
        private modalService: BsModalService,
        private currency: CurrencyService,
    ) {

    }

    ngOnInit() {
        // this.formattedAmount = "";
        this.currencySymbol = this.currency.options.code || "";

        this.copyConfig.show$.pipe(takeUntil(this.destroy$)).subscribe(user => {
            if (this.modalRef) {
                this.modalRef.hide();
            }

            this.user = user ? user : this.user;
            this.increntPrice = formatNumber(this.user.setting.increntPrice, this.currency.options.locale, this.currency.options.digitsInfo);
            this.modalRef = this.modalService.show(
                this.template,
                {
                    class: 'modal-dialog-centered',
                    backdrop: "static"
                }
            );
        })
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }


    onSubmit(): void {
        this.user.setting.increntPrice = +this.increntPrice.replace(/\,/g, '') || 0;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.modalRef.hide();
    }
}
