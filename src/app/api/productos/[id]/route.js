import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";
import { log } from "console";

export async function GET(request) {
    try {
        const pathname = request.nextUrl.pathname;
        const id = pathname.split('/').pop();
        const db = await pool.getConnection();
        const query = 'SELECT * FROM productos WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ error: `Producto ${id} no encontrado ` }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error en GET /api/productos/[id]:', error);
        return NextResponse.json({ error: 'Ocurrió un error al obtener el producto' }, { status: 500 });
    }
}
export async function PATCH(request) {
    try {
        const pathname = request.nextUrl.pathname;
        const id = pathname.split('/').pop();

        const { idestatus, idcategoria, title, price, stock, brand, thumbnail } = await request.json();

        const db = await pool.getConnection();
        const query = 'UPDATE productos SET idestatus = ?, idcategoria = ?, title = ?, price = ?, stock = ?, brand = ?, thumbnail = ? WHERE id = ?';
        const [result] = await db.execute(query, [idestatus, idcategoria, title, price, stock, brand, thumbnail, id]);
        db.release(); 

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
        }

        return NextResponse.json({
            id,
            idestatus,
            idcategoria,
            title,
            price,
            stock,
            brand,
            thumbnail
        }, { status: 200 });
    } catch (error) {
        console.error('Error en PATCH /api/productos/[id]:', error);
        return NextResponse.json({ error: 'Ocurrió un error al actualizar el producto' }, { status: 500 });
    }
}