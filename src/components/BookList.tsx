import { Book } from '../types/index';
import BookCard from './BookCard';

/**
 * PROPS: ItemList
 */
interface BookListProps {
  books: Book[];
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemList
 *
 * Renderiza la lista de elementos usando .map()
 */
const BookList: React.FC<BookListProps> = ({ books, onDelete, onEdit }) => {
  // Manejar estado vacío
  if (books.length === 0) {
    return (
      <div className="empty-state">
        <p> No hay libros para mostrar</p>
        <p className="empty-state__hint">
          Agrega tu primer libro usando el formulario de arriba
        </p>
      </div>
    );
  }

  // ============================================
  // RENDER: LISTA DE ELEMENTOS
  // ============================================

  return (
    <div className="Book-list">
      {/* TODO: Usar .map() para renderizar cada elemento */}
      {/* Recuerda:
        - SIEMPRE usar key única (item.id)
        - Pasar todas las props necesarias a ItemCard
        - Usar arrow functions para los callbacks
      */}
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};

export default BookList;
