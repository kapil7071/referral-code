package com.referral_code_api.referral.code.Repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.referral_code_api.referral.code.model.Referral;
import com.referral_code_api.referral.code.model.User;

public interface ReferralRepository extends JpaRepository<Referral, Long> {
    List<Referral> findByReferrer(User referrer);

}
