
package com.gesfor.model;

import java.io.Serializable;
import java.util.Date;
import java.util.UUID;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import lombok.Data;

/**
 *
 * @author hallef
 */
@Entity
@Data
public class Licenca implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @NotNull(message = "Cnpj obrigatorio!")
    @NotBlank(message = "Cnpj obrigatorio!")
    @NotEmpty(message = "Cnpj obrigatorio!")
    @Column(unique = true, length = 16, nullable = false)
    private String cnpj;
    
    @Column(name = "data_cadastro", nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataCadastro;

    @Column(nullable = false)
    private Boolean status;
    
    @NotNull(message = "email obrigatorio!")
    @NotBlank(message = "email obrigatorio!")
    @NotEmpty(message = "email obrigatorio!")
    @Column(nullable = false)
    private String email;
    
    @NotNull(message = "telefone obrigatorio!")
    @NotBlank(message = "telefone obrigatorio!")
    @NotEmpty(message = "telefone obrigatorio!")
    @Column(nullable = false)
    private String telefone;
    
}
