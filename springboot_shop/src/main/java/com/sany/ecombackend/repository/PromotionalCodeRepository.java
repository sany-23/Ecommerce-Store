package com.sany.ecombackend.repository;

import com.sany.ecombackend.entity.PromotionalCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PromotionalCodeRepository extends JpaRepository<PromotionalCode, Long> {
    PromotionalCode findByCode(String code);

    Optional<PromotionalCode> findByCodeAndActiveTrue(String code);}
