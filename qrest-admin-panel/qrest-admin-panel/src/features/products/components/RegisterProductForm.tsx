import { FileUpload } from "../../../shared/components/UploadFile";
import { useRegisterProduct } from "../hooks/useRegisterProduct";
import styles from "../styles/RegisterProductForm.module.css";

const RegisterProductForm = () => {
  const {
    product,
    files,
    isSaving,
    saved,
    saveError,
    uploadError,
    isUploading,
    setFiles,
    handleChange,
    handleSubmit,
  } = useRegisterProduct();

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>

    <h1>Registrar nuevo Producto</h1>

      <input
        className={styles.input}
        name="name"
        value={product.name}
        placeholder="Nombre del producto"
        onChange={handleChange}
      />

      <input
        className={styles.input}
        name="description"
        value={product.description}
        placeholder="Descripción"
        onChange={handleChange}
      />

      <input
        className={styles.input}
        name="price"
        type="number"
        value={product.price}
        placeholder="Precio"
        onChange={handleChange}
      />

      <div className={styles.checkboxContainer}>
        <input
          className={styles.checkbox}
          name="available"
          type="checkbox"
          checked={product.available}
          onChange={handleChange}
        />
        <label>Disponible</label>
      </div>

      <select
        className={styles.select}
        name="categoryId"
        onChange={handleChange}
      >
        <option value="">Seleccione una categoría</option>
        <option value="1">Bebidas</option>
        <option value="2">Pastas</option>
        <option value="3">Carnes</option>
      </select>

      <FileUpload onChange={setFiles} helperText="Ingrese una imagen" />

      <button
        type="button"
        className={styles.button}
        onClick={handleSubmit}
        disabled={isSaving || isUploading}
      >
        {isSaving || isUploading ? "Procesando..." : "Guardar"}
      </button>

      {uploadError && <p className={styles.error}>Error al subir imagen</p>}
      {saveError && <p className={styles.error}>Error al guardar producto</p>}
      {saved && <p className={styles.success}>Producto guardado con éxito</p>}
    </form>
  );
};

export default RegisterProductForm;
