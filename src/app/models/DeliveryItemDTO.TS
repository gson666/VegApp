import ProductDTO from "./ProductDTO";
interface DeliveryItemDTO {
    deliveryItemId: number;
    deliveryId: number;
    productId: number;
    quantity: number;
    price: number;
    product: ProductDTO
  }

  export default DeliveryItemDTO;