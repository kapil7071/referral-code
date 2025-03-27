package com.referral_code_api.referral.code.Controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.referral_code_api.referral.code.Service.ReferralService;
import com.referral_code_api.referral.code.Service.UserService;
import com.referral_code_api.referral.code.model.User;
@CrossOrigin("*")
@RestController
public class UserController {
    private final UserService userService;
    private final ReferralService referralService;

    public UserController(UserService userService, ReferralService referralService) {
        this.userService = userService;
        this.referralService = referralService;
    }

    
    @PostMapping("/signup")
    public User signup(@RequestBody Map<String, Object> userData) {
        String referralCode = (String) userData.get("referralCode");
        
        User user = new User();
        user.setName((String) userData.get("name"));
        user.setEmail((String) userData.get("email"));
        user.setPassword((String) userData.get("password"));

        System.out.println("✅ Referral Code: " + referralCode);
        return userService.signup(user, referralCode);
    }



      
    @PostMapping("/profile/complete/{userId}")
    public String completeProfile(@PathVariable UUID userId) {
        userService.completeProfile(userId);
        return "Profile completed!";
    }

    
    @GetMapping("/referrals/{referrerId}")
    public List<User> getReferrals(@PathVariable UUID referrerId) {
        return referralService.getReferralsByReferrer(referrerId);
    }

    
    @GetMapping("/referrals/report")
    public ResponseEntity<byte[]> downloadReferralReport() {
        return ResponseEntity.ok()
                .header("Content-Disposition", "attachment; filename=referral_report.csv")
                .body(referralService.generateReferralReport());
    }
}
