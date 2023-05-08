package com.flowerknower.backend.repositories;

import com.flowerknower.backend.model.entities.Discovery;
import com.flowerknower.backend.model.entities.User;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface DiscoveryRepository extends JpaRepository<Discovery, Long> {

    @Query("SELECT d FROM Discovery d where d.user = :user")
    List<Discovery> findAllByUser(User user);

    @Query("SELECT d FROM Discovery d WHERE d.user.id = :userId AND d.id IN (SELECT MIN(d2.id) FROM Discovery d2 WHERE d2.user.id = :userId GROUP BY d2.flower.id)")
    Set<Discovery> findFirstDiscoveryForUniqueFlowersByUserSQL(@Param("userId") Long userId);

    @Query("SELECT COUNT(DISTINCT d.flower.name) FROM Discovery d WHERE d.user = :user")
    Long countDistinctFlowersByUser(User user);
}
