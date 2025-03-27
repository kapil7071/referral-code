package com.referral_code_api.referral.code.Repo;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import com.referral_code_api.referral.code.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepo extends JpaRepository<User, UUID> {
    Optional<User> findByReferralCode(String referralCode);
    List<User> findByReferredBy(User referredBy);

}
