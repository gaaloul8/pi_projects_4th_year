package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.antlr.v4.runtime.misc.NotNull;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Entity
@Table(name="event")
@Getter
@Setter
public class Evenement implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer idEvent;
    private String eventName;
    @Enumerated(EnumType.STRING)
    @Column(name = "eventType")
    private TypeEvenement  eventType;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date datetime;
    private String location;
    private String description;
    private String image;
    private int nbplacesMax;
    private int nbPlacesReservees;
    private int tokenvalue;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusEvent status;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "evenement")
    private List<FeedBack> feedBacks;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "evenementR")
    private List<Reservation> reservations;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User User;


}
