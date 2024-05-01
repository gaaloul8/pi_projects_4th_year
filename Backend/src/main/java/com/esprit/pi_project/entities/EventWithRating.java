package com.esprit.pi_project.entities;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@Getter
@Setter
public class EventWithRating {
    private Integer idEvent;
    private String eventName;
    private TypeEvenement eventType;
    private Date datetime;
    private String location;
    private String description;
    private String image;
    private int nbplacesMax;
    private int nbPlacesReservees;
    private int tokenvalue;
    private StatusEvent status;
    private Double averageRating;
    public EventWithRating(Integer idEvent, String eventName, TypeEvenement eventType, Date datetime, String location, String description, String image, Integer nbplacesMax, Integer nbPlacesReservees, Integer tokenvalue, StatusEvent status, Double averageRating) {
        this.idEvent = idEvent;
        this.eventName = eventName;
        this.eventType = eventType;
        this.datetime = datetime;
        this.location = location;
        this.description = description;
        this.image = image;
        this.nbplacesMax = nbplacesMax;
        this.nbPlacesReservees = nbPlacesReservees;
        this.tokenvalue = tokenvalue;
        this.status = status;
        this.averageRating = averageRating;
    }
}