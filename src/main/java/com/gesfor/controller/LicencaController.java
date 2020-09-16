
package com.gesfor.controller;

import com.gesfor.centrlizadorexception.negocioexception.licenca.LicencaNotFoundException;
import com.gesfor.model.Licenca;
import com.gesfor.service.LicencaService;
import java.util.List;
import javax.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author halle
 */
@RestController
@RequestMapping(path = "licencas")
//@CrossOrigin(origins = "http://localhost:8383")
public class LicencaController {
    
    @Autowired
    private LicencaService licencaService;
    
    @GetMapping("todas")
    public List<Licenca> todas() {
        System.out.println("OK");
        return licencaService.todas();
    }
    
    @PostMapping("salvar")
    public ResponseEntity<?> salvar(@Valid @RequestBody Licenca licenca) {
        Licenca licSalva = licencaService.salvar(licenca);
        return ResponseEntity.ok(licSalva);
    }
    
    @DeleteMapping("{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if(!licencaService.getLicencaById(id).isPresent()) {
            throw new LicencaNotFoundException("Id não encontrado", null);
        }
        licencaService.deleteById(id);
        return ResponseEntity.ok().build();
    }
    
}
