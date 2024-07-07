import SupplierDTO from "./SupplierDTO";

interface DeliveryDTO{
  deliveryId: number;
  supplierId: number;
  deliveryDate: Date;
  supplier: SupplierDTO;
  deliveryItems: DeliveryDTO[];
}

export default DeliveryDTO;