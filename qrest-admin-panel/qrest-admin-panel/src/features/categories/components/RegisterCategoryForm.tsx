import { useRegisterCategory } from "../hooks/useRegisterCategory";
import styles from "../styles/RegisterCategoryForm.module.css";

const RegisterCategoryForm = () => {
  const {
    category,
    isSaving,
    saved,
    saveError,
    validationErrors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
  } = useRegisterCategory();

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <h1>Registrar nueva Categoría</h1>

      {/* Campo Nombre */}
      <div className={styles.fieldContainer}>
        <input
          className={`${styles.input} ${
            touched.name && validationErrors.name ? styles.inputError : ""
          }`}
          name="name"
          value={category.name}
          placeholder="Nombre de la categoría *"
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

      {/* Botón Submit */}
      <button
        type="button"
        className={styles.button}
        onClick={handleSubmit}
        disabled={isSaving}
      >
        {isSaving ? "Guardando..." : "Guardar Categoría"}
      </button>

      {/* Mensajes de estado */}
      {saveError && <p className={styles.error}>{saveError}</p>}
      {saved && <p className={styles.success}>✓ Categoría guardada con éxito</p>}
    </form>
  );
};

export default RegisterCategoryForm;
