import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiserviceService } from '../services/apiservice.service';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import html2canvas from 'html2canvas';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-cartnow',
  templateUrl: './cartnow.component.html',
  styleUrls: ['./cartnow.component.css'],
})
export class CartnowComponent implements OnInit {
  @ViewChild('register_details', { static: true }) content: any;

  constructor(private api: ApiserviceService, private router: Router) {}
  quantity: any = 1;
  data: any;
  record: any;
  cart: any = [];
  txtNumber: any = 1;
  category: any;
  cartdatasource = new MatTableDataSource();
  length!: number;
  ngOnInit(): void {
    this.api.showorder().subscribe((data) => {
      this.data = data;
      this.record = this.data.message;
      this.cart = JSON.parse(localStorage.getItem('cartdetail') || '[]');
      console.log('SESSION', this.cart);
      this.cartdatasource = this.cart;
    });
  }

  order() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Your Bill has been download momentary',
      showConfirmButton: false,
      timer: 1000,
    });

    setTimeout(() => {
      this.generarPDF();
    }, 1000);
    setTimeout(() => {
      this.router.navigate(['/admin/dashboard']);
    }, 1500);
  }

  generarPDF() {
    const div = document.getElementById('register_details');
    const el1: HTMLElement = div!;

    const options = {
      background: 'white',
      scale: 6,
    };

    html2canvas(el1, options)
      .then((canvas) => {
        var img = canvas.toDataURL('image/PNG');
        var doc = new jsPDF('l', 'mm', 'a4');

        const bufferX = 100;
        const bufferY = 0;
        const imgProps = (<any>doc).getImageProperties(img);
        const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        doc.addImage(
          img,
          'PNG',
          bufferX,
          bufferY,
          pdfWidth,
          pdfHeight,
          undefined,
          'FAST'
        );

        return doc;
      })
      .then((doc) => {
        var today = new Date();
        var dd = today.getDate();

        var mm = today.getMonth() + 1;
        var yyyy = today.getFullYear();
        let date, month;

        if (dd < 10) {
          date = '0' + dd;
        } else {
          date = dd;
        }

        if (mm < 10) {
          month = '0' + mm;
        } else {
          month = mm;
        }
        let name = date + '-' + month + '-' + yyyy + '_cart_details.pdf';
        doc.save(name);
      });
  }
  qty(cnt: any) {
    console.log(cnt.target.value);
    this.quantity = cnt.target.value;
  }

  remove(id: any) {
    // console.log(id);
    for (var i = 0; i < this.cart.length; i++) {
      var obj = this.cart[i];
      // console.log('object',this.cart[i]);

      if (id === obj._id) {
        this.cart.splice(i, 1);
      }
    }
    this.cartdatasource = new MatTableDataSource(this.cart);
    this.length = this.cart.length;
  }

  getTotalCost() {
    return this.cart
      .map((t: any) => t.price * t.quantity)
      .reduce((acc: any, value: any) => acc + value, 0);
  }
}
