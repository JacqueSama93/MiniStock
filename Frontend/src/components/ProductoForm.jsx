export const ProductoForm = ({ form, onChange, onSubmit, isEditing, onCancel }) => {
  return (
    <div style={{ marginBottom: '30px', padding: '15px', border: '1px solid #ccc' }}>
      <h3>{isEditing ? 'Editar Producto' : 'Nuevo Producto'}</h3>
      <form onSubmit={onSubmit}>
        <input name="nombre" placeholder="Nombre" value={form.nombre} onChange={onChange} required />
        <input name="categoria" placeholder="Categoría" value={form.categoria} onChange={onChange} />
        <input name="stock" type="number" placeholder="Stock" value={form.stock} onChange={onChange} />
        <input name="precio" type="number" step="0.01" placeholder="Precio" value={form.precio} onChange={onChange} />
        
        <button type="submit">{isEditing ? 'Actualizar' : 'Guardar'}</button>
        {isEditing && <button type="button" onClick={onCancel}>Cancelar</button>}
      </form>
    </div>
  );
};