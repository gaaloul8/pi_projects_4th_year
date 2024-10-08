package com.esprit.pi_project.entities;

import com.fasterxml.jackson.annotation.*;
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
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSXXX")
    private Date datetime;
    private String location;
    private String description;

    @Lob
    @Column(length = 200000000)
    private String image;
    private int nbplacesMax;
    private int nbPlacesReservees;
    private int tokenvalue;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private StatusEvent status;
    @PrePersist
    public void initializeStatus() {
        this.status = StatusEvent.Available;
    }

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "evenement")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idFeedback")
    private List<FeedBack> feedBacks;

    @OneToMany(cascade = CascadeType.ALL,mappedBy = "evenementR")
    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class , property = "idR")
    private List<Reservation> reservations;

    @ManyToOne
    @JoinColumn(name = "id_user")
    private User eventOwner;


}
