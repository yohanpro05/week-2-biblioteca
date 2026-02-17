import { useState, useEffect } from 'react';
import { Book } from '../types/index';

/**
 * PROPS: ItemForm
 */
export interface BookFormProps {
  onAdd: (book: Omit<Book, 'id'>) => void;
  onUpdate: (id: number, updates: Partial<Book>) => void;
  editingBook?: Book;
  onCancelEdit: () => void;
}

/**
 * COMPONENTE: ItemForm
 *
 * Formulario para agregar o editar elementos.
 * Se adapta automáticamente según si hay un elemento siendo editado.
 */
const BookForm: React.FC<BookFormProps> = ({
  onAdd,
  onUpdate,
  editingBook,
  onCancelEdit,
}) => {
  // ============================================
  // ESTADO DEL FORMULARIO
  // ============================================

  const initialState = {
    title: '',
    author: '',
    isbn: '',
    available: true,
    category: '',
  };

  const [formData, setFormData] = useState(initialState);

  // ============================================
  // EFECTO: PRE-LLENAR FORMULARIO AL EDITAR
  // ============================================
  // Qué: copia valores de editingItem a formData (con fallback a defaults)
// Para qué: evitar que el usuario reescriba datos ya existentes
// Impacto: UX mucho más fluida, menos errores, flujo edición/creación consistente

  useEffect(() => {
    if (editingBook) {
     const {title, author, isbn, available, category } = editingBook;
    
    setFormData({
      title: title ?? initialState.title,
      author: author ?? initialState.author,
      isbn: isbn ?? initialState.isbn,
      available: available ?? initialState.available,
      category: category ?? initialState.category,
    });
    } else {
      setFormData(initialState);
    }
  }, [editingBook]);

  // ============================================
  // HANDLERS
  // ============================================
/**
 * handleChange: Maneja cambios en inputs de texto
 * 
 * ¿QUÉ hace?
 * - Captura el name y value del input y actualiza solo ese campo en formData
 * 
 * ¿PARA QUÉ sirve?
 * - Permite que el formulario sea reactivo: el usuario ve reflejados sus cambios inmediatamente
 * 
 * ¿QUÉ impacto tiene?
 * - Mejora la UX al mostrar feedback instantáneo
 * - Evita tener que manejar cada input por separado (código más limpio y escalable)
 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
/**
 * handleSelectChange: Maneja cambios en el <select> de categoría
 * 
 * ¿QUÉ hace?
 * - Actualiza el campo 'category' en formData con el valor seleccionado
 * 
 * ¿PARA QUÉ sirve?
 * - Permite clasificar el libro en una categoría predefinida
 * 
 * ¿QUÉ impacto tiene?
 * - Facilita la organización y filtrado futuro de libros por categoría
 * - Mantiene consistencia en los datos ingresados
 */
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
/**
 * handleCheckboxChange: Maneja el checkbox de "Disponible"
 * 
 * ¿QUÉ hace?
 * - Actualiza el campo 'available' con true/false según esté marcado
 * 
 * ¿PARA QUÉ sirve?
 * - Indica si el libro está disponible para préstamo o consulta
 * 
 * ¿QUÉ impacto tiene?
 * - Permite control de inventario/estado en tiempo real
 * - Evita errores al usar e.target.checked en lugar de value
 */
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };
/**
 * validate: Valida los campos obligatorios antes de enviar
 * 
 * ¿QUÉ hace?
 * - Comprueba que título, autor e ISBN no estén vacíos (trim para eliminar espacios)
 * - Muestra alert si falta algo y retorna false
 * 
 * ¿PARA QUÉ sirve?
 * - Evita guardar datos incompletos o inválidos
 * 
 * ¿QUÉ impacto tiene?
 * - Mejora la calidad de los datos en la aplicación
 * - Da feedback inmediato al usuario cuando falta información esencial
 */
  const validate = (): boolean => {
    if (!formData.title.trim()) {
      alert('El título es requerido');
      return false;
    }
    if (!formData.author.trim()) {
      alert('El autor es requerido');
  return false;
    }
    if (!formData.isbn.trim()) {
      alert('El ISBN es requerido');
  return false;
    }
    return true;
  };
/**
 * handleSubmit: Procesa el envío del formulario
 * 
 * ¿QUÉ hace?
 * - Previene el comportamiento por defecto del form
 * - Valida los datos
 * - Llama a onAdd (nuevo) o onUpdate (edición)
 * - Limpia el formulario después de guardar
 * 
 * ¿PARA QUÉ sirve?
 * - Coordina toda la lógica de creación/edición de libros
 * 
 * ¿QUÉ impacto tiene?
 * - Centraliza el flujo de guardado → fácil de mantener y depurar
 * - Evita envíos inválidos gracias a validate()
 * - Resetea el formulario automáticamente → UX limpia y predecible
 */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    if (editingBook) {
      onUpdate(editingBook.id, formData);
      onCancelEdit();
    } else {
      onAdd(formData);
    }

    setFormData(initialState);
  };

  // ============================================
  // RENDER
  // ============================================
/**
 * ¿QUÉ hace?
 * - Renderiza el contenedor del formulario con título dinámico (Agregar o Editar)
 * - Crea un <form> con inputs controlados (title, author, isbn, category, available)
 * - Muestra botones "Agregar/Actualizar" y "Cancelar" solo en modo edición
 * 
 * ¿PARA QUÉ sirve?
 * - Proporciona la interfaz visual donde el usuario ingresa o modifica datos de libros
 * - Conecta el estado (formData) con los inputs mediante value/onChange
 * - Cambia el comportamiento y texto según estemos creando o editando un libro
 * 
 * ¿QUÉ impacto tiene?
 * - Es la cara visible del formulario → UX directa del usuario
 * - Inputs controlados garantizan sincronía entre estado y UI (no hay datos desfasados)
 * - Botón "Cancelar" solo visible al editar → evita confusiones en modo creación
 * - Validación visual (required + alerts en validate) reduce envíos erróneos
 * - Diseño modular (classNames) facilita estilos y mantenimiento futuro
 */
  return (
    <div className="form-container">
     {/* Título dinámico según modo (agregar o editar) */} 
      <h2>{editingBook ? ' Editar Libro' : ' Agregar Libro'}</h2>

      <form onSubmit={handleSubmit} className="item-form">
        {/* Campo: Título - Obligatorio */}
        <div className="form-group">
          <label htmlFor="title">Título *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Ingresa el título"
            required
          />
        </div>
        {/* Campo: Autor - Obligatorio */}
        <div className="form-group">
          <label htmlFor="author">Autor *</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Ingresa el autor"
            required
          />
        </div>
          {/* Campo: ISBN - Obligatorio */}
        <div className="form-group">
          <label htmlFor="isbn">ISBN *</label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            placeholder="Ingresa el ISBN"
            required
          />
        </div>
          {/* Campo: Categoría - Opcional */}
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
          >
            <option value="">Selecciona una categoría</option>
            <option value="fiction">Ficción</option>
            <option value="non-fiction">No Ficción</option>
            <option value="science">Ciencia</option>
            <option value="novels">Novelas</option>
            <option value="romantic">Romántica</option>

          </select>
        </div>
          {/* Checkbox: Disponible */}
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleCheckboxChange}
            />
            Disponible
          </label>
        </div>

        {/* Botones */}
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingBook ? 'Actualizar Libro' : 'Agregar Libro'}
          </button>
        {/* Botón Cancelar - Solo visible en modo edición */}
          {editingBook && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                onCancelEdit();
                setFormData(initialState);
              }}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm;