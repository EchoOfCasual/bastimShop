package com.company.shopBastim.repository;

import com.company.shopBastim.model.Role;
import com.company.shopBastim.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long>, JpaSpecificationExecutor {
    @Query(value = "SELECT * FROM roles r WHERE r.role_name = ?1", nativeQuery = true)
    Optional<Role> findRoleByName(String name);

    public Page<Role> findAll(Specification specification, Pageable pageable);

}
