import SupplierDTO from "./SupplierDTO";
import DeliveryItemDTO from "./DeliveryItemDTO";
interface DeliveryDTO{
  deliveryId: number;
  supplierId: number;
  deliveryDate: Date;
  supplier: SupplierDTO;
  deliveryItems: DeliveryItemDTO[];
}

export default DeliveryDTO;