package com.referral_code_api.referral.code.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.referral_code_api.referral.code.Repo.UserRepo;
import com.referral_code_api.referral.code.model.User;
@Service
public class ReferralService {
	
	@Autowired
	private UserRepo userRepo;



public List<User> getReferralsByReferrer(UUID referrerId) {
    User referrer = userRepo.findById(referrerId).orElseThrow(() -> new RuntimeException("Referrer not found"));

    return userRepo.findByReferredBy(referrer)
            .stream()
            .filter(User::isProfileCompleted)
            .collect(Collectors.toList());
}


public byte[] generateReferralReport() {
    List<User> users = userRepo.findAll();
    StringBuilder csvBuilder = new StringBuilder();
    csvBuilder.append("User ID, Name, Email, Referral Code, Referred By, Profile Completed\n");

    for (User user : users) {
        csvBuilder.append(user.getId()).append(", ")
                .append(user.getName()).append(", ")
                .append(user.getEmail()).append(", ")
                .append(user.getReferralCode()).append(", ")
                .append(user.getReferredBy() != null ? user.getReferredBy().getId() : "N/A").append(", ")
                .append(user.isProfileCompleted() ? "Yes" : "No").append("\n");
    }

    return csvBuilder.toString().getBytes();
}
}
