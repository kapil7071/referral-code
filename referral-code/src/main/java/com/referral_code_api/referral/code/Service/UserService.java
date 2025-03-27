package com.referral_code_api.referral.code.Service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.referral_code_api.referral.code.Repo.ReferralRepository;
import com.referral_code_api.referral.code.Repo.UserRepo;
import com.referral_code_api.referral.code.model.Referral;
import com.referral_code_api.referral.code.model.ReferralStatus;
import com.referral_code_api.referral.code.model.User;

import jakarta.transaction.Transactional;

@Service	
public class UserService {
    private final UserRepo userRepo;
    private final ReferralRepository refrralRepo;

    public UserService(UserRepo userRepo, ReferralRepository refrralRepo) {
        this.userRepo = userRepo;
        this.refrralRepo = refrralRepo;
    }

    @Transactional
    public User signup(User user, @RequestParam(required = false) String referralCode) {
        user.setReferralCode(UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        if (referralCode != null && !referralCode.trim().isEmpty()) {
            Optional<User> referrer = userRepo.findByReferralCode(referralCode.trim());
            	System.out.println(referrer);
            if (referrer.isPresent()) {
                User referrerUser = referrer.get();

                user.setReferredBy(referrerUser);
            } 
        }

      
        user = userRepo.save(user);
        
        return user;
    }




    @Transactional
    public void completeProfile(UUID userId) {
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));
        
        user.setProfileCompleted(true);
        userRepo.save(user);

        if (user.getReferredBy() != null) {
            refrralRepo.findByReferrer(user.getReferredBy()).stream()
                .filter(ref -> ref.getReferred().equals(user))
                .forEach(ref -> {
                    ref.setStatus(ReferralStatus.COMPLETED);
                    refrralRepo.save(ref);
                });
        }
    }
}
