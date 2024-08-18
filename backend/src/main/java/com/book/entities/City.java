package com.book.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "cities")
public class City {

    @Id
    private String code; // Unique identifier for the city
    private String name; // Full name of the city
    private String stateCode; // State code where the city is located

    // Default constructor
    public City() {
    }

    // Parameterized constructor
    public City(String code, String name, String stateCode) {
        this.code = code;
        this.name = name;
        this.stateCode = stateCode;
    }

    public City(String code, String stateCode) {
        this.code = code;
        this.stateCode = stateCode;
    }

    // Getter and Setter methods
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    // Optional: Override toString() for better debugging
    @Override
    public String toString() {
        return "City{" +
                "code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", stateCode='" + stateCode + '\'' +
                '}';
    }
}
