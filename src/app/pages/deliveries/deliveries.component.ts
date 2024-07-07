import { Component, OnInit } from '@angular/core';
import DeliveryDTO from 'src/app/models/DeliveryDTO';
import { DeliveryService } from 'src/app/services/delivery/delivery.service';

@Component({
  selector: 'app-deliveries',
  templateUrl: './deliveries.component.html',
  styleUrls: ['./deliveries.component.css']
})
export class DeliveriesComponent implements OnInit {

  deliveries : DeliveryDTO[] = [];

  constructor(private deliveryService:DeliveryService) { }

  ngOnInit(): void {
    this.loadDeliveries();
  }
  loadDeliveries() {
    this.deliveryService.getAllDeliveries().subscribe(
      (data: DeliveryDTO[])=>{
        this.deliveries = data;
      }
    )
  }

}
