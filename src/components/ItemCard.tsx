import { Item } from '../types';

/**
 * PROPS: ItemCard
 */
interface ItemCardProps {
  item: Item;
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}

/**
 * COMPONENTE: ItemCard
 *
 * Tarjeta individual para mostrar un elemento.
 * Adapta la visualización a tu dominio específico.
 */
const ItemCard: React.FC<ItemCardProps> = ({ item, onDelete, onEdit }) => {
  // ============================================
  // HANDLER: CONFIRMAR ELIMINACIÓN
  // ============================================

  const handleDelete = () => {
    // TODO (Opcional): Agregar confirmación antes de eliminar
    // Ejemplo:
    // if (window.confirm(`¿Eliminar "${item.name}"?`)) {
    //   onDelete(item.id);
    // }

    onDelete(item.id);
  };

  // ============================================
  // RENDER
  // ============================================

  return (
    <div className="item-card">
      {/* Información principal */}
      <div className="item-card__header">
        <h3 className="item-card__title">{item.title}</h3>

        {/* TODO: Agregar badge/etiqueta según tu dominio */}
        {
          <span className={`badge badge--${item.available ? 'success' : 'danger'}`}>
                          {item.available ? 'Disponible' : 'Prestado'}
                        </span>
          /*- Farmacia: <span className="badge badge--info">{item.category}</span>
          - Gimnasio: <span className={`badge badge--${item.active ? 'success' : 'secondary'}`}>
                        {item.active ? 'Activo' : 'Inactivo'}
                      </span>
        */}
      </div>

      {/* Información detallada */}
      <div className="item-card__body">
{/* TODO: Mostrar propiedades específicas de tu dominio */}
         <p><strong>Título:</strong> {item.title}</p>
          <p><strong>Author:</strong> {item.author}</p>
          <p><strong>ISBN:</strong> {item.isbn}</p>
      
          <p className="item-card__placeholder">
          {/*TODO: Agregar propiedades de tu dominio aquí*/}
        </p>
      </div>

      {/* Acciones */}
      <div className="item-card__actions">
        <button
          className="btn btn-edit"
          onClick={() => onEdit(item.id)}
          aria-label={`Editar ${item.title}`}>
          Editar
        </button>

        <button
          className="btn btn-delete"
          onClick={handleDelete}
          aria-label={`Eliminar ${item.title}`}>
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
