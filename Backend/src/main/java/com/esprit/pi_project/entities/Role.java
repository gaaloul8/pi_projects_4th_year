package com.esprit.pi_project.entities;

import com.esprit.pi_project.serviceImpl.CustomAuthorityDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collections;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Getter
public enum Role {
    User(Collections.emptySet()),
    Admin(Set.of(
            Permission.ADMIN_CREATE,
            Permission.ADMIN_UPDATE,
            Permission.ADMIN_DELETE,
            Permission.ADMIN_READ,
            Permission.CLUBMAN_CREATE,
            Permission.CLUBMAN_DELETE,
            Permission.CLUBMAN_UPDATE,
            Permission.CLUBMAN_READ

             )
    ),
    ClubManager(Set.of(
            Permission.CLUBMAN_CREATE,
            Permission.CLUBMAN_DELETE,
            Permission.CLUBMAN_UPDATE,
            Permission.CLUBMAN_READ

            )
    );
    @Getter
    private final Set<Permission> permissions;



    public List<SimpleGrantedAuthority> getAuthorites(){
       var authorities= getPermissions()
                .stream()
                .map(permission -> new SimpleGrantedAuthority(permission.getPermission()))
               .collect(Collectors.toList());
       authorities.add(new SimpleGrantedAuthority("ROLE_" + this.name()));
       return  authorities;
    }

}
