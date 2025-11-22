package com.qrest.shared.config.datasource;

import org.hibernate.dialect.Dialect;
import org.hibernate.dialect.identity.IdentityColumnSupport;
import org.hibernate.dialect.identity.IdentityColumnSupportImpl;

import java.sql.Types;

public class SQLiteDialect extends Dialect {

    public SQLiteDialect() {
        super();
    }

    @Override
    protected String columnType(int sqlTypeCode) {
        return switch (sqlTypeCode) {
            case Types.INTEGER -> "integer";
            case Types.BIGINT -> "bigint";
            case Types.FLOAT, Types.DOUBLE, Types.REAL -> "real";
            case Types.NUMERIC, Types.DECIMAL -> "numeric";
            case Types.BOOLEAN -> "integer";
            case Types.VARCHAR -> "text";
            default -> "blob";
        };
    }

    @Override
    public IdentityColumnSupport getIdentityColumnSupport() {
        return new IdentityColumnSupportImpl() {
            @Override
            public boolean supportsIdentityColumns() { return true; }

            @Override
            public String getIdentitySelectString(String table, String column, int type) {
                return "select last_insert_rowid()";
            }

            @Override
            public String getIdentityColumnString(int type) {
                return "integer";
            }
        };
    }

    @Override
    public boolean supportsTemporaryTables() {
        return true;
    }


    @Override
    public boolean supportsIfExistsBeforeTableName() { return true; }

    @Override
    public boolean supportsIfExistsAfterTableName() { return true; }
}