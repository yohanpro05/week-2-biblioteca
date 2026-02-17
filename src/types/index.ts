// ============================================
// TYPES: INTERFACES Y TIPOS
// ============================================
// Define aquí las interfaces para tu dominio

/**
 * NOTA PARA EL APRENDIZ:
 * Adapta esta interface a tu dominio asignado.
 *
 * Ejemplos:
 * - Biblioteca: Book { id, title, author, isbn, available, category }
 /** - Farmacia: Medicine { id, name, price, stock, requiresPrescription, category }
 * - Gimnasio: Member { id, name, email, plan, startDate, active }
 * - Restaurante: Dish { id, name, category, price, available, description }
 */

// TODO: Define la interface principal de tu dominio
// Ejemplo para referencia (ELIMINAR y reemplazar con tu dominio):
export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  available: boolean;
  category: string;
}

// TODO: Si necesitas tipos adicionales, defínelos aquí
// Ejemplos:
export type Category = 'fiction' | 'non-fiction' | 'science' | 'novels' | 'romantic'; // Biblioteca

// TODO: Interface para props de formulario (opcional)
export interface FormData {
  // Mismos campos que Item pero sin el id (se genera al agregar)
  title: string;
  author: string;
  isbn: string;
  available: boolean;

  // TODO: Agregar resto de propiedades
}
