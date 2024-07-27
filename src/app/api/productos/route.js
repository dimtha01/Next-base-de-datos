import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";


export async function GET() {
    try {
        const db = await pool.getConnection()
        const query = 'select * from productos'
        const [rows] = await db.execute(query)
        db.release()

        return new Response(JSON.stringify(rows), {
            // Set CORS headers here
            headers: {
                'Access-Control-Allow-Origin': '*', // Allow requests from all origins (replace with specific origins if needed)
                'Access-Control-Allow-Methods': 'GET', // Allowed methods (adjust as needed)
                'Access-Control-Allow-Headers': 'Content-Type', // Allowed headers (adjust as needed)
            },
        });

    } catch (error) {
        return NextResponse.json({
            error: error
        }, { status: 500 })
    }
}
export async function POST(request) {
    try {
        const { idestatus, idcategoria, title, price, stock, brand, thumbnail } = await request.json();
        const db = await pool.getConnection();
        const query = 'INSERT INTO productos (idestatus, idcategoria, title, price, stock, brand, thumbnail) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(query, [idestatus, idcategoria, title, price, stock, brand, thumbnail]);
        db.release();
        return NextResponse.json({
            id: result.insertId,
            idestatus,
            idcategoria,
            title,
            price,
            stock,
            brand,
            thumbnail
        }, { status: 201 });
    } catch (error) {
        console.error('Error en POST /api/productos:', error);
        return NextResponse.json({ error: 'Ocurrió un error al crear el producto' }, { status: 500 });
    }
}
