

const page = () => {
  return (
    <>
      <h1>API NEXT MYSQL</h1>
      <h3>Usuarios</h3>
        <code>
           <a href="http://localhost:3000/api/usuarios">GET  http://localhost:3000/api/usuarios</a>
           <br/>
           GET  http://localhost:3000/api/usuarios/1
        </code>
        <hr/>
        <h3>Categorias</h3>
        <code>
           GET  http://localhost:3000/api/categorias
           <br/>
           GET  http://localhost:3000/api/categorias/1
        </code>
        <hr/>
        <h3>Productos</h3>
        <code>
           GET  http://localhost:3000/api/productos
           <br/>
           GET  http://localhost:3000/api/productos/1
           <br/>
           GET  http://localhost:3000/api/productos/categorias/1
           <br/>
           GET  http://localhost:3000/api/productos/1
           <br/>
           GET  http://localhost:3000/api/productos/paginador?page=2&limit=20
           <br/>
           GET  http://localhost:3000/api/productos/buscar?q=w
           <br/>  <br/>
           Agrega un nuevo producto<br/>
           POST http://localhost:3000/api/productos
           <br/>
           Request Body (ejemplo)
          <code>
      <pre>
{`{
"idestatus": 1,
"idcategoria": 2,
"title": "Awesome New Product",
"price": 19.99,
"stock": 100,
"brand": "Brand Name",
"thumbnail": "https://example.com/product_thumbnail.jpg"
}`}
      </pre>
      </code>

      <br/>

      Actualiza un producto<br/>
      PATCH http://localhost:3000/api/productos/1
      <br/>
      <pre>
{`{

  "idestatus": 1,
  "idcategoria": 1,
  "title": "Essence Mascara Lash Princess",
  "price": 15,
  "stock": 35,
  "brand": "Essence",
  "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"

}`}

      </pre>

      Eliminar un producto<br/>
      http://localhost:3000/api/productos/201




        </code>

        
    </>
  )
}

export default page