import { Book } from '../types/index';

/**
 * PROPS: BookCard
 */
interface BookCardProps {
  book: Book;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar un elemento.
 * Adapta la visualización a tu dominio específico.
 */
const BookCard: React.FC<BookCardProps> = ({ book, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    // TODO (Opcional): Agregar confirmación antes de eliminar
    // Ejemplo:
    // if (window.confirm(`¿Eliminar "${item.name}"?`)) {
    //   onDelete(item.id);
    // }

    onDelete(book.id);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="book-card">
      {/* Información principal */}
      <div className="book-card__header">
        <h3 className="book-card__title">{book.title}</h3>

        {/* TODO: Agregar badge/etiqueta según tu dominio */}
        {
          <span className={`badge badge--${book.available ? 'success' : 'danger'}`}>
                          {book.available ? 'Disponible' : 'Prestado'}
                        </span>
          /*- Farmacia: <span className="badge badge--info">{item.category}</span>
          - Gimnasio: <span className={`badge badge--${item.active ? 'success' : 'secondary'}`}>
                        {item.active ? 'Activo' : 'Inactivo'}
                      </span>
        */}
      </div>

      {/* Información detallada */}
      <div className="book-card__body">
{/* TODO: Mostrar propiedades específicas de tu dominio */}
         <p><strong>Título:</strong> {book.title}</p>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>ISBN:</strong> {book.isbn}</p>
      
          <p className="book-card__placeholder">
          {/*TODO: Agregar propiedades de tu dominio aquí*/}
        </p>
      </div>

      {/* Acciones */}
      <div className="book-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(book.id)}
          aria-label={`Editar ${book.title}`}>
          Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${book.title}`}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default BookCard;
