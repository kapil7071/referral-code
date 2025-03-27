package com.referral_code_api.referral.code.dto;

import com.referral_code_api.referral.code.model.User;

public class UserSignupRequest {
    private String name;
    private String email;
    private String password;
    private String referralCode;

    public User toUser() {
        User user = new User();
        user.setName(name);
        user.setEmail(email);
        user.setPassword(password);
        return user;
    }

    public String getReferralCode() {
        return referralCode;
    }
}
