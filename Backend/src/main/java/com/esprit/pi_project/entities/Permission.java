package com.esprit.pi_project.entities;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum Permission {
    ADMIN_READ("admin:read"),
    ADMIN_UPDATE("admin:update"),
    ADMIN_CREATE("admin:create"),
    ADMIN_DELETE("admin:delete"),
    CLUBMAN_READ("responsable:read"),
    CLUBMAN_UPDATE("responsable:update"),
    CLUBMAN_CREATE("responsable:create"),
    CLUBMAN_DELETE("responsable:delete");
    @Getter
    private final String permission;
}
