// Angular
import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DOCUMENT } from '@angular/platform-browser';

// Rxjs
import { Subject, BehaviorSubject, Observable, timer } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';

// modules (third-party)
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

// ANN Shop
// Interfaces
import { DownloadImage } from '../../interfaces/modals/download-image';
import { ProductCard } from '../../interfaces/common/product-card';
// Services
import { DownloadImageService } from '../../services/modals/download-image.service';
import { ProductService } from '../../services/pages/product.service';


@Component({
  selector: 'app-download-image',
  templateUrl: './download-image.component.html',
  styleUrls: ['./download-image.component.sass']
})
export class DownloadImageComponent implements OnInit, OnDestroy {
  private dom: Document;
  private destroy$: Subject<void>;

  @ViewChild('modal', { read: TemplateRef }) template: TemplateRef<any>;

  modalRef: BsModalRef;
  data: DownloadImage;
  downloading: Boolean;
  isIOS: Boolean;
  copying: Boolean;

  constructor(
    @Inject(DOCUMENT) dom: Document,
    private cd: ChangeDetectorRef,
    private http: HttpClient,
    private modalService: BsModalService,
    private toastr: ToastrService,
    private downloadImageService: DownloadImageService,
    private productService: ProductService
  ) {
    this.dom = dom;
    this.destroy$ = new Subject();
    this.data = { product: null, images: [] };
    this.downloading = false;
    this.isIOS = false;
    this.copying = false;
  }

  ngOnInit() {
    this.isIOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

    this.downloadImageService.show$.pipe(takeUntil(this.destroy$)).subscribe((data: DownloadImage) => {
      if (this.modalRef)
        this.modalRef.hide();

      this.data = data;
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

  downloadALL(sku: string, images: any) {
    this.downloading = true;
    let imageList = [...images];
    let imageLast = imageList.pop();

    this.http.get(imageLast.url, { responseType: 'blob' }).pipe(delay(3000)).subscribe(
      (res: Blob) => {
        let url = window.URL.createObjectURL(res);
        let a = this.dom.createElement('a');
        this.dom.body.appendChild(a);
        a.setAttribute('style', 'display: none');
        a.href = url;
        a.download = imageLast.fileName;
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove(); // remove the element

        if (imageList.length == 0) {
          this.downloading = false;
          this.modalRef.hide();
          this.toastr.success("Đang tải hình sản phẩm...")
        }
        else {
          this.downloadALL(sku, imageList);
        }
      },
      _ => {
        if (imageList.length == 0) {
          this.downloading = false;
          this.modalRef.hide();
          this.toastr.success("Đang tải hình sản phẩm...")
        }
        else {
          this.downloadALL(sku, imageList);
        }
      });
  }

  copyAdvertisementContent(product: ProductCard, btCopy: HTMLButtonElement): void {
    if (this.copying || !product) {
      return;
    }

    this.copying = true;
    timer(500).subscribe((_) => {
      this.productService.getContentProductAdvertisement(product)
        .subscribe((copying: boolean) => {
          this.copying = copying;
          this.cd.markForCheck();
          btCopy.innerHTML = "Đã Copy";
        })
    });
  }
}
