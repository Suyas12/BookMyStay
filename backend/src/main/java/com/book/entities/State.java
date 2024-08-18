package com.book.entities;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "states")
public class State {
    
    @Id
    private String code;   // Unique identifier for the state (e.g., state abbreviation or code)
    private String name;   // Full name of the state

    // Default constructor
    public State() {}

    // Parameterized constructor
    public State(String code, String name) {
        this.code = code;
        this.name = name;
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

    // Optional: Override toString() for better debugging
    @Override
    public String toString() {
        return "State{" +
               "code='" + code + '\'' +
               ", name='" + name + '\'' +
               '}';
    }
}
