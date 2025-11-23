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
    validationErrors,
    touched,
    setFiles,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegisterProduct();

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h1>Registrar nuevo Producto</h1>

      {/* Campo Nombre */}
      <div className={styles.fieldContainer}>
        <input
          className={`${styles.input} ${
            touched.name && validationErrors.name ? styles.inputError : ""
          }`}
          name="name"
          value={product.name}
          placeholder="Nombre del producto *"
          onChange={handleChange}
          onBlur={() => handleBlur("name")}
          aria-invalid={touched.name && !!validationErrors.name}
          aria-describedby="name-error"
        />
        {touched.name && validationErrors.name && (
          <span id="name-error" className={styles.errorText}>
            {validationErrors.name}
          </span>
        )}
      </div>

      {/* Campo Descripción */}
      <div className={styles.fieldContainer}>
        <textarea
          className={`${styles.input} ${styles.textarea} ${
            touched.description && validationErrors.description ? styles.inputError : ""
          }`}
          name="description"
          value={product.description}
          placeholder="Descripción (opcional)"
          onChange={handleChange}
          onBlur={() => handleBlur("description")}
          rows={3}
          aria-invalid={touched.description && !!validationErrors.description}
          aria-describedby="description-error"
        />
        {touched.description && validationErrors.description && (
          <span id="description-error" className={styles.errorText}>
            {validationErrors.description}
          </span>
        )}
      </div>

      {/* Campo Precio */}
      <div className={styles.fieldContainer}>
        <input
          className={`${styles.input} ${
            touched.price && validationErrors.price ? styles.inputError : ""
          }`}
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={product.price}
          placeholder="Precio *"
          onChange={handleChange}
          onBlur={() => handleBlur("price")}
          aria-invalid={touched.price && !!validationErrors.price}
          aria-describedby="price-error"
        />
        {touched.price && validationErrors.price && (
          <span id="price-error" className={styles.errorText}>
            {validationErrors.price}
          </span>
        )}
      </div>

      {/* Campo Categoría */}
      <div className={styles.fieldContainer}>
        <select
          className={`${styles.select} ${
            touched.categoryId && validationErrors.categoryId ? styles.inputError : ""
          }`}
          name="categoryId"
          value={product.categoryId || ""}
          onChange={handleChange}
          onBlur={() => handleBlur("categoryId")}
          aria-invalid={touched.categoryId && !!validationErrors.categoryId}
          aria-describedby="category-error"
        >
          <option value="">Seleccione una categoría *</option>
          <option value="1">Bebidas</option>
          <option value="2">Pastas</option>
          <option value="3">Carnes</option>
        </select>
        {touched.categoryId && validationErrors.categoryId && (
          <span id="category-error" className={styles.errorText}>
            {validationErrors.categoryId}
          </span>
        )}
      </div>

      {/* Campo Imagen */}
      <div className={styles.fieldContainer}>
        <FileUpload files={files} onChange={setFiles} helperText="Ingrese una imagen (opcional)" />
      </div>

      {/* Botón Submit */}
      <button
        type="button"
        className={styles.button}
        onClick={handleSubmit}
        disabled={isSaving || isUploading}
      >
        {isSaving || isUploading ? "Procesando..." : "Guardar Producto"}
      </button>

      {/* Mensajes de estado */}
      {uploadError && <p className={styles.error}>Error al subir imagen</p>}
      {saveError && <p className={styles.error}>{saveError}</p>}
      {saved && <p className={styles.success}>✓ Producto guardado con éxito</p>}
    </form>
  );
};

export default RegisterProductForm;
