package com.referral_code_api.referral.code.model;


import jakarta.persistence.*;

import java.util.UUID;

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    private String name;
    private String email;
    private String password;
    private String referralCode;
    private boolean profileCompleted;

    public User() {
		super();
		// TODO Auto-generated constructor stub
	}

	public User(UUID id, String name, String email, String password, String referralCode, boolean profileCompleted,
			User referredBy) {
		super();
		this.id = id;
		this.name = name;
		this.email = email;
		this.password = password;
		this.referralCode = referralCode;
		this.profileCompleted = profileCompleted;
		this.referredBy = referredBy;
	}

	public UUID getId() {
		return id;
	}

	public void setId(UUID id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getReferralCode() {
		return referralCode;
	}

	public void setReferralCode(String referralCode) {
		this.referralCode = referralCode;
	}

	public boolean isProfileCompleted() {
		return profileCompleted;
	}

	public void setProfileCompleted(boolean profileCompleted) {
		this.profileCompleted = profileCompleted;
	}

	public User getReferredBy() {
		return referredBy;
	}

	public void setReferredBy(User referredBy) {
		this.referredBy = referredBy;
	}

	@ManyToOne
    @JoinColumn(name = "referred_by")
    private User referredBy;
}
