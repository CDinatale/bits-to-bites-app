package com.capstone.project.services;

import com.capstone.project.model.Pantry;
import com.capstone.project.model.User;
import com.capstone.project.repositories.PantryRepository;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class PantryService implements PantryServiceAbs{

    private final PantryRepository pantryRepository;

    public PantryService(PantryRepository pantryRepository) {
        this.pantryRepository = pantryRepository;
    }


    @Override
    public Set<Pantry> findAll() {
        Set<Pantry> pantrySet = new HashSet<>(pantryRepository.findAll());
        return pantrySet;
    }

    @Override
    public Pantry findById(Long aLong) {
        return pantryRepository.findById(aLong).orElse(null);
    }

    @Override
    public void delete(Pantry object) {
        pantryRepository.delete(object);
    }

    @Override
    public void deleteById(Long aLong) {
        pantryRepository.deleteById(aLong);
    }
}
