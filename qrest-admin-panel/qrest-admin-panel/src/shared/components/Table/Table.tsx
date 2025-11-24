// Table.tsx
import React, { useMemo, useState } from "react";
import styles from "./Table.module.css";
import type { TableProps } from "./table.types";

const Table: React.FC<TableProps> = ({
  data = [],
  columns = [],
  actions,
  itemsPerPage = 10,
  title,
  children,
  searchable = true,
  sortable = true,
  variant = "default",
  mode = "full",
}) => {
  const enableSearch = mode === "full" ? searchable : mode !== "simple";
  const enableSort = mode === "full" ? sortable : mode !== "simple";

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof T | null;
    direction: "asc" | "desc";
  }>({
    key: null,
    direction: "asc",
  });

  const filtered = useMemo(() => {
    if (!enableSearch || !search) return data;
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key];
        return val?.toString().toLowerCase().includes(search.toLowerCase());
      })
    );
  }, [data, search, enableSearch, columns]);

  const sorted = useMemo(() => {
    if (!enableSort || !sortConfig.key) return filtered;
    return [...filtered].sort((a, b) => {
      const va = a[sortConfig.key!];
      const vb = b[sortConfig.key!];
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === "string") {
        return sortConfig.direction === "asc"
          ? va.localeCompare(vb)
          : vb.localeCompare(va);
      }
      return sortConfig.direction === "asc"
        ? va > vb
          ? 1
          : -1
        : va < vb
        ? 1
        : -1;
    });
  }, [filtered, enableSort, sortConfig]);

  const totalPages = Math.ceil(sorted.length / itemsPerPage);
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return sorted.slice(start, start + itemsPerPage);
  }, [sorted, currentPage, itemsPerPage]);

  const changeSort = (key: keyof T) => {
    if (!enableSort) return;
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  const getPages = () => {
    const pages: (number | "...")[] = [];
    const max = totalPages;
    if (max <= 5) {
      for (let i = 1; i <= max; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", max);
      } else if (currentPage >= max - 2) {
        pages.push(1, "...", max - 3, max - 2, max - 1, max);
      } else {
        pages.push(1, "...", currentPage - 1, currentPage, currentPage + 1, "...", max);
      }
    }
    return pages;
  };

  // normalizar data para evitar map() sobre algo que no es array
  const rows = Array.isArray(data) ? data : [];
  if (!Array.isArray(data)) {
    // ayuda a depurar en entornos donde la respuesta cambia
    // (puedes eliminar el console.warn en producción)
    console.warn("Table: expected array but received:", data);
  }

  return (
    <div className={`${styles.tableContainer} ${styles[variant]}`}>
      {(title || children) && (
        <div className={styles.header}>
          {title && <h2 className={styles.title}>{title}</h2>}
          {children && <div className={styles.headerActions}>{children}</div>}
        </div>
      )}

      {enableSearch && (
        <div className={styles.searchBox}>
          <input
            className={styles.searchInput}
            placeholder="Buscar..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      )}

      <div className={styles.wrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className={enableSort ? styles.sortable : ""}
                  onClick={() => changeSort(col.key)}
                >
                  <div className={styles.thContent}>
                    {col.label}
                    {enableSort && sortConfig.key === col.key && (
                      <span className={styles.sortIcon}>
                        {sortConfig.direction === "asc" ? "↑" : "↓"}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {paginated.length > 0 ? (
              paginated.map((row, i) => (
                <tr key={i}>
                  {columns.map((col) => (
                    <td key={String(col.key)}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className={styles.actionCol}>{actions(row)}</td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className={styles.noData}
                >
                  No se encontraron resultados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((c) => Math.max(1, c - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </button>

          {getPages().map((p, idx) =>
            p === "..." ? (
              <span key={idx} className={styles.ellipsis}>
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => setCurrentPage(p as number)}
                className={p === currentPage ? styles.active : ""}
              >
                {p}
              </button>
            )
          )}

          <button
            onClick={() => setCurrentPage((c) => Math.min(totalPages, c + 1))}
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export { Table };
