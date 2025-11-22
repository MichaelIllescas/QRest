package com.qrest.shared.config.datasource;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

import java.io.File;

@Component
public class DatabaseInitializer {

    @PostConstruct
    public void init() {
        File folder = new File("database");
        if (!folder.exists()) {
            folder.mkdirs();
        }
    }
}
