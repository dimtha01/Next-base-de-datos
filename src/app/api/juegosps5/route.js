import { NextResponse } from "next/server"; // Importa el objeto NextResponse desde el módulo next/server para crear respuestas HTTP.
import pool from "@/app/libs/mysql"; // Importa el objeto pool, que maneja las conexiones a la base de datos MySQL.

export async function GET() {
    try {
        // Obtén una conexión al pool de conexiones de MySQL.
        const db = await pool.getConnection();
        // Define la consulta SQL que se ejecutará.
        const query = 'select * from juegos_ps5';
        // Ejecuta la consulta SQL. `db.execute(query)` devuelve una promesa que se resuelve con los resultados.
        // `rows` contiene las filas obtenidas de la consulta.
        const [rows] = await db.execute(query);
        // Libera la conexión de vuelta al pool para que pueda ser reutilizada por otras solicitudes.
        db.release();
        // Devuelve una respuesta JSON con los resultados de la consulta. `results` es una propiedad que contiene las filas.
        return NextResponse.json({ juegos: rows });
    } catch (error) {
        // Si ocurre un error en el bloque try, captura el error y devuelve una respuesta JSON con detalles del error.
        // El código de estado HTTP se establece en 500, indicando un error del servidor.
        return NextResponse.json({
            error: error // El objeto de error completo se incluye en la respuesta JSON.
        }, { status: 500 });
    }
}
export async function POST(request) {
    try {
        const { nombre, genero, fecha_lanzamiento, desarrollador, precio, imagen_url } = await request.json();
        const db = await pool.getConnection();
        const query = 'INSERT INTO juegos_ps5( nombre, genero, fecha_lanzamiento, desarrollador, precio, imagen_url) VALUES (?,?,?,?,?,?)';
        const [result] = await db.execute(query, [nombre, genero, fecha_lanzamiento, desarrollador, precio, imagen_url]);
        db.release();
        return NextResponse.json({
            id: result.insertId,
            nombre, 
            genero,
            fecha_lanzamiento,
            desarrollador,
            precio, 
            imagen_url
        }, { status: 201 });


    } catch (error) {
        console.error('Error en POST /api/juegos_ps5:', error);
        return NextResponse.json({ error: 'Ocurrió un error al crear el producto' }, { status: 500 });
    }
}
