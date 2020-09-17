
package com.gesfor.service;

import com.gesfor.model.Logs;
import com.gesfor.repository.LogsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author hallef.bruno
 */
@Service
public class LogsService {
    
    
    @Autowired
    private LogsRepository logsRepository;
    
    @Transactional
    public void salvar(Logs logs) {
        logsRepository.save(logs);
    }
}
