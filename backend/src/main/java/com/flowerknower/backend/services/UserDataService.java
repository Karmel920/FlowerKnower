package com.flowerknower.backend.services;

import java.io.IOException;
import java.util.List;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.flowerknower.backend.model.dtos.UniqueDiscoveriesAmountDTO;
import com.flowerknower.backend.model.dtos.UserDataDTO;
import com.flowerknower.backend.model.dtos.UserProfileImageDTO;
import com.flowerknower.backend.model.entities.Image;
import com.flowerknower.backend.model.entities.Token;
import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.model.entities.UserData;
import com.flowerknower.backend.model.requests.EmailChangeRequest;
import com.flowerknower.backend.model.requests.PasswordChangeRequest;
import com.flowerknower.backend.repositories.TokenRepository;
import com.flowerknower.backend.repositories.UserDataRepository;
import com.flowerknower.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserDataService {
    private final UserDataRepository userDataRepository;
    private final UserRepository userRepository;
    private final TokenRepository tokenRepository;
    private final ImageService imageService;
    private final DiscoveryService discoveryService;
    private final PasswordEncoder passwordEncoder;

    public UserProfileImageDTO getUserProfileImage(User user) throws IOException {
        UserData userData = userDataRepository.findByUser(user);
        Image currentProfileImage = userData.getProfileImage();
        if (currentProfileImage != null) {
            byte[] profilePicture = imageService.downloadImage(currentProfileImage.getName(),
                    currentProfileImage.getId());
            return UserProfileImageDTO.builder().image(profilePicture).build();
        }
        return UserProfileImageDTO.builder().build();
    }

    public void changeUserProfileImage(User user, MultipartFile file) throws IOException {
        UserData userData = userDataRepository.findByUser(user);
        Image newProfileImage = imageService.uploadImage(file);
        userData.setProfileImage(newProfileImage);
        userDataRepository.save(userData);
    }

    public void changeUserEmail(User user, EmailChangeRequest emailChangeRequest) {
        if (user.getEmail().equals(emailChangeRequest.getOldEmail())) {
            user.setEmail(emailChangeRequest.getNewEmail());
            userRepository.save(user);
        } else {
            throw new RuntimeException("Wrong email provided");
        }
    }

    public void changeUserPassword(User user, PasswordChangeRequest passwordChangeRequest) {
        if (passwordEncoder.matches(passwordChangeRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(passwordChangeRequest.getNewPassword()));

            userRepository.save(user);
        } else {
            throw new RuntimeException("Wrong password provided");
        }
    }

    public void deleteUser(User user) {
        List<Token> tokens = tokenRepository.findAllTokenByUser(user.getId());
        tokenRepository.deleteAll(tokens);
        userRepository.delete(user);
    }

    public UserDataDTO getUser(User user) throws IOException {
        UserProfileImageDTO profilePicture = this.getUserProfileImage(user);
        String email = user.getEmail();
        UniqueDiscoveriesAmountDTO uniqueDiscoveriesAmountDTO = discoveryService.getUniqueDiscoveriesByUser(user);
        return UserDataDTO.builder()
                .email(email)
                .uniqueDiscoveriesAmountDTO(uniqueDiscoveriesAmountDTO)
                .userProfileImageDTO(profilePicture)
                .build();
    }
}
