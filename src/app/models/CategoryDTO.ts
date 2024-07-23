import ProductDTO from "./ProductDTO";

interface CategoryDTO{
    categoryId:number,
    name:string,
    type:string,
    products:ProductDTO[]
}

export default CategoryDTO;