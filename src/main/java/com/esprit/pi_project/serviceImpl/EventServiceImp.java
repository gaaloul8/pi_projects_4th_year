package com.esprit.pi_project.serviceImp;

import com.esprit.pi_project.dao.EventDao;
import com.esprit.pi_project.entities.Evenement;
import com.esprit.pi_project.entities.TypeEvenement;
import com.esprit.pi_project.service.EventService;
import io.micrometer.common.util.StringUtils;
import jakarta.annotation.Resource;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class EventServiceImp implements EventService {

    @Resource
    @Autowired
    private EventDao eventDao;

    @Override
    public Evenement addEvent(Evenement evenement)  {
        // Vérifier s'il existe déjà un événement avec la même date et heure
        Evenement existingEvent = eventDao.findByDatetime(evenement.getDatetime());
        if (existingEvent != null) {
            throw new RuntimeException("Il existe déjà un événement avec la même date et heure.");
        }
        return eventDao.save(evenement);
    }
    @Override
    public List<Evenement> findAll() {
        return eventDao.findAll();
    }

    @Override
    public void deleteEvenementByidEvent(Integer idEvent) {
        Optional<Evenement> optionalEvenement = eventDao.findById(idEvent);
        if (optionalEvenement.isPresent()) {
            eventDao.deleteById(idEvent);
        } else {
            throw new EntityNotFoundException("L'événement avec l'ID " + idEvent + " n'existe pas.");
        }
    }

    @Override
    public Evenement UpdateEvenement(Evenement evenement) {
        return eventDao.save(evenement);
    }

    @Override
    public Evenement findByEvenementidEvent(Integer idEvent) {
        if (idEvent != null) {
            final Optional<Evenement> optionalEvenement = eventDao.findById(idEvent);
            if (optionalEvenement.isPresent()){
                return optionalEvenement.get();
            }
        }
        return null;
    }

    @Override
    public List<Evenement> searchEventByDate(Date date) {
        return Collections.singletonList(eventDao.findByDatetime(date));
    }

    @Override
    public List<Evenement> searchEventByTpe(TypeEvenement typeEvenement) {
        return eventDao.findEvenementByEventType(typeEvenement);
    }




}
