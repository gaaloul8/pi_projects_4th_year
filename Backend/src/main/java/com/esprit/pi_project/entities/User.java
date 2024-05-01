package com.esprit.pi_project.entities;
import com.esprit.pi_project.serviceImpl.CustomAuthorityDeserializer;

import com.fasterxml.jackson.annotation.JsonBackReference;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.time.LocalDateTime;
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
    private float tokenSolde;


    @Column(name = "password_hint")
    private String passwordHint;

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
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idReward")

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

    @Column(name = "failed_login_attempts")
    private int failedLoginAttempts;
    @Column(name = "lock_time")
    private LocalDateTime lockTime;


    @OneToOne(cascade = CascadeType.ALL)
    private Club club;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idFeedback")
    private List<FeedBack> feedBacks;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idR")
    private List<Reservation> reservations;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "eventOwner")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idEvent")
    private List<Evenement> evenements;

    @Column(name = "account_non_locked")
    private boolean accountNonLocked;

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

       return  true;
    }

    @Override
    public boolean isAccountNonLocked() {
        if (lockTime == null) {
            return true;
        }
        return LocalDateTime.now().isAfter(lockTime);
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
