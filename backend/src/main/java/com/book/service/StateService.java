package com.book.service;

import java.util.List;

import com.book.entities.State;

public interface StateService {
	public List<State> getAllStates();

	public State getStateByCode(String code);

	public State createOrUpdateState(State state);

	State findStateNameByCode(String code);
}
