package com.esprit.pi_project.entities;
import com.esprit.pi_project.serviceImpl.CustomAuthorityDeserializer;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="user")

public class User implements UserDetails, Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String password;
    private String resetToken;

    private String email;
    private String niveau;
    private String Identifiant;
    private boolean FirstLogin;

    @Column(name = "registration_date")
    private Date registrationDate;

    @Column(name = "last_login")
    private Date lastLogin;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonManagedReference
    private List<Token> tokens;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    //@JsonBackReference
    private List<Reward> rewardList;
    @JsonIgnore
    @OneToMany(cascade = CascadeType.ALL,mappedBy = "QuizOwner")
    private List<Quiz> quizList;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "QuizUser")
    private List<QuizUser> quizUserList;

//    @OneToMany(cascade = CascadeType.ALL,mappedBy = "ForumOwner")
//    @JsonBackReference
//    private List<Forum> forumlist;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "createdBy")
    private List<Reclamation> reclamationList;

    @OneToOne(cascade = CascadeType.ALL)
    private Club club;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<FeedBack> feedBacks;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<Reservation> reservations;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "eventOwner")
    private List<Evenement> evenements;


    @Column(length = 2000000000)
    private String profilePicture;
    @ElementCollection(targetClass = Tag.class)
    @CollectionTable(name = "user_tags", joinColumns = @JoinColumn(name = "id_user"))
    @Column(name = "tag", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<Tag> tags;



    @JsonDeserialize(using = CustomAuthorityDeserializer.class)

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
