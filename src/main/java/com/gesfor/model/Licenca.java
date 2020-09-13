
package com.gesfor.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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

}
