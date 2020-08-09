import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CouponAddComponent } from '../coupon-add/coupon-add.component';
import { CouponService } from '../services/coupon.service';
import { Coupon } from '../../../core/models/coupons';
import { Location } from '@angular/common';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-coupons',
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.scss']
})
export class CouponsComponent implements OnInit, OnDestroy {
  public coupons = [{
    id: '12121',
    code: 'wqqwe',
    name: 'fsdfs',
    type: 'REUSABLE'
  }, {
    id: '12123',
    code: 'wqqwe',
    name: 'fsdfs',
    type: 'sdfsf'
  }];
  private enableCouponModal = false;
  private couponsSub: SubscriptionLike;

  constructor(
    private location: Location,
    private modalService: NgbModal,
    private couponService: CouponService
  ) {
    this.enableCouponModal = this.location.path().includes('enableCouponModal');
  }

  ngOnInit(): void {
    this.getCouponsList();
  }

  public getCouponsList() {
    this.coupons = [];
    this.couponsSub = this.couponService.getCouponsList().subscribe((response: Coupon[]) => {
      this.coupons = response;

      if (this.enableCouponModal) {
        this.enableCouponModal = false;
        setTimeout(() => {
          this.openCouponModal();
        }, 500);
      }
    });
  }

  public openCouponModal() {
    this.couponService.openCouponModal();
  }

  public trackById(index, item) {
    return item.id;
  }

  ngOnDestroy(): void {
    if (this.couponsSub) {
      this.couponsSub.unsubscribe();
    }
  }

}
