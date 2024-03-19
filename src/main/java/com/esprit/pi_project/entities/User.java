package com.esprit.pi_project.entities;
import jakarta.persistence.*;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Data
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_user;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    private String password;

    private String email;

    @Column(name = "registration_date")
    private Date registrationDate;

    @Column(name = "last_login")
    private Date lastLogin;

    private int token;

    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<Reward> rewardList;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "QuizOwner")
    private List<Quiz> quizList;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "QuizUser")
    private List<QuizUser> quizUserList;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "ForumOwner")
    private List<Forum> forumlist;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "createdBy")
    private List<Reclamation> reclamationList;

    @OneToOne(cascade = CascadeType.ALL)
    private Club club;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<FeedBack> feedBacks;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<Reservation> reservations;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "User")
    private List<Evenement> evenements;






}
