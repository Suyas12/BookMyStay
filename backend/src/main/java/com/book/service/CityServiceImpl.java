package com.book.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.book.entities.City;
import com.book.repository.CityRepository;

@Service
@Transactional
public class CityServiceImpl implements CityService{

    @Autowired
    private CityRepository cityRepository;

    public List<City> getCitiesByStateCode(String stateCode) {
        return cityRepository.findByStateCode(stateCode);
    }

    public City createOrUpdateCity(City city) {
        return cityRepository.save(city);
    }

	@Override
	public City findCityNameByCode(String cityCode) {
		
		return cityRepository.findById(cityCode).orElseThrow(() -> new RuntimeException("City not found"));
	}
}
