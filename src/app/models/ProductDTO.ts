interface ProductDTO {
    productId: number;
    name: string;
    description?: string;
    image?: string;
    price: number;
    categoryId: number;
  }

  export default ProductDTO;