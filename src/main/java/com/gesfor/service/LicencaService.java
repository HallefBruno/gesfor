
package com.gesfor.service;

import com.gesfor.model.Licenca;
import com.gesfor.repository.LicencaRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 *
 * @author halle
 */
@Service
public class LicencaService {
    
    @Autowired
    private LicencaRepository licencaRepository;
    
    @Transactional
    public Licenca salvar(Licenca licenca) {
        return licencaRepository.save(licenca);
    }
    
    public List<Licenca> todas() {
        return licencaRepository.findAll();
    }
    
    public Optional<Licenca> getLicencaById(Long id) {
        return licencaRepository.findById(id);
    }
    
    @Transactional
    public void deleteById(Long id) {
        licencaRepository.deleteById(id);
    }
    
}
