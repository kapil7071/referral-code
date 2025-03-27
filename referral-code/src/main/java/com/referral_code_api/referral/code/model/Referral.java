package com.referral_code_api.referral.code.model;
import jakarta.persistence.*;
@Entity
public class Referral {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "referred_by", referencedColumnName = "id", nullable = true)

    private User referrer;

    @ManyToOne
    private User referred;

    @Enumerated(EnumType.STRING)
    private ReferralStatus status;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getReferrer() {
		return referrer;
	}

	public void setReferrer(User referrer) {
		this.referrer = referrer;
	}

	public User getReferred() {
		return referred;
	}

	public void setReferred(User referred) {
		this.referred = referred;
	}

	public ReferralStatus getStatus() {
		return status;
	}

	public void setStatus(ReferralStatus status) {
		this.status = status;
	}

	public Referral(Long id, User referrer, User referred, ReferralStatus status) {
		super();
		this.id = id;
		this.referrer = referrer;
		this.referred = referred;
		this.status = status;
	}

	public Referral() {
		super();
		// TODO Auto-generated constructor stub
	}
    
}
