import { NextResponse } from "next/server";
import pool from "@/app/libs/mysql";

export async function GET(request) {
    try {
        const pathname = request.nextUrl.pathname;
        const id = pathname.split('/').pop();
        const db = await pool.getConnection();
        const query = 'SELECT nombre FROM juegos_ps5 WHERE id = ?';
        const [rows] = await db.execute(query, [id]);
        db.release();

        if (rows.length === 0) {
            return NextResponse.json({ error: `juegos ps5 ${id} no encontrado ` }, { status: 404 });
        }

        return NextResponse.json(rows[0]);
    } catch (error) {
        console.error('Error en GET /api/productos/[id]:', error);
        return NextResponse.json({ error: 'Ocurrió un error al obtener el producto' }, { status: 500 });
    }
}
export async function DELETE(request) {
    try {
      const pathname = request.nextUrl.pathname;
      const id = pathname.split('/').pop();
  
      const db = await pool.getConnection();
      const query = 'DELETE FROM juegos_ps5 WHERE id = ?';
      const [result] = await db.execute(query, [id]);
      db.release();
  
      if (result.affectedRows === 0) {
        return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Producto eliminado correctamente' }, { status: 200 });
    } catch (error) {
      console.error('Error en DELETE /api/productos/[id]:', error);
      return NextResponse.json({ error: 'Ocurrió un error al eliminar el producto' }, { status: 500 });
    }
  }
