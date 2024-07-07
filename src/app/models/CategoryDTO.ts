import ProductDTO from "./ProductDTO";

interface CategoryDTO{
    categoryId:number,
    name:string,
    products:ProductDTO[]
}

export default CategoryDTO;