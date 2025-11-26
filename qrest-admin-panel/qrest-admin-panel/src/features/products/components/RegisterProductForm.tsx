import { useEffect } from "react";
import { FileUpload } from "../../../shared/components/UploadFile";
import { useListCategory } from "../../categories/hooks/useListCategory";
import { useRegisterProduct } from "../hooks/useRegisterProduct";
import styles from "../styles/RegisterProductForm.module.css";

interface RegisterProductFormProps {
  onProductRegistered?: () => void;
}

const RegisterProductForm = ({ onProductRegistered }: RegisterProductFormProps) => {
  const {
    product,
    files,
    withImage,
    isSaving,
    saved,
    saveError,
    uploadError,
    isUploading,
    validationErrors,
    touched,
    setFiles,
    setWithImage,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegisterProduct(onProductRegistered);
  const { categories, listCategory } = useListCategory();
  

  useEffect(() => {
    listCategory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {touched.categoryId && validationErrors.categoryId && (
          <span id="category-error" className={styles.errorText}>
            {validationErrors.categoryId}
          </span>
        )}
      </div>

      {/* Campo Imagen */}
      <div className={styles.fieldContainer}>
        <div className={styles.checkboxContainer}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              className={styles.checkboxInput}
              checked={withImage}
              onChange={() => setWithImage(!withImage)}
            />
            <span className={styles.toggleSwitch}></span>
            <span className={styles.toggleText}>Incluir imagen</span>
          </label>
        </div>
        {withImage && (
          <>
            <FileUpload files={files} onChange={setFiles} helperText="Seleccione una imagen *" />
            {touched.image && validationErrors.image && (
              <span id="image-error" className={styles.errorText}>
                {validationErrors.image}
              </span>
            )}
          </>
        )}
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
