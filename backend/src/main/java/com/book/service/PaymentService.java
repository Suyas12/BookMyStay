package com.book.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.book.entities.Payments;
import com.book.repository.PaymentRepository;

@Service
@Transactional
public class PaymentService {

    @Autowired
    private PaymentRepository PaymentsRepository;

    
    public Payments save(Payments Payments) throws Exception {
       return PaymentsRepository.save(Payments);
    }

   
}
