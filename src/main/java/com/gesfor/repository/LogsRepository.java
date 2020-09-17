
package com.gesfor.repository;

import com.gesfor.model.Logs;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author hallef.bruno
 */
@Repository
public interface LogsRepository extends JpaRepository<Logs, Long>{
    
}
