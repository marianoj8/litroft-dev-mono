import { Component, OnInit } from '@angular/core';
import { AdminService } from './modules/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private adminService: AdminService) {
    this.adminService.getUserInfo().subscribe(resp => {
      if (!resp) {
        this.adminService.router.navigate(['/denaid']);
      }
    });
  }

  ngOnInit() {
  }

}
