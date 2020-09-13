
package com.gesfor.repository;

import com.gesfor.model.Licenca;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef
 */
@Repository
public interface LicencaRepository extends JpaRepository<Licenca, Long> {
    
}
