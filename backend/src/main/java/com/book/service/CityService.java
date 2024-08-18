package com.book.service;

import java.util.List;

import com.book.entities.City;

public interface CityService {

	public List<City> getCitiesByStateCode(String stateCode);

	public City createOrUpdateCity(City city);

	public City findCityNameByCode(String cityCode);

}
