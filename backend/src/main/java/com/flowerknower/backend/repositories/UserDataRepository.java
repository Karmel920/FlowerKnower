package com.flowerknower.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.flowerknower.backend.model.entities.User;
import com.flowerknower.backend.model.entities.UserData;


@Repository
public interface UserDataRepository extends JpaRepository<UserData, Long>{
    UserData findByUser(User user);
}
