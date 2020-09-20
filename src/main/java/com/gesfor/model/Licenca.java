
package com.gesfor.model;

import com.gesfor.anotation.ValidPassword;
import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
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
    @Column(unique = true, length = 15, nullable = false)
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
    @Email
    private String email;
    
    @NotNull(message = "senha obrigatoria!")
    @NotBlank(message = "senha obrigatoria!")
    @NotEmpty(message = "senha obrigatoria!")
    @Pattern(message="Senha inválida", regexp = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}") //^.*(?=.{8,})(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$
    @Column
    private String senha;
    
    @NotNull(message = "telefone obrigatorio!")
    @NotBlank(message = "telefone obrigatorio!")
    @NotEmpty(message = "telefone obrigatorio!")
    @Column(nullable = false, length = 10)
    private String telefone;
    
    @NotNull(message = "Quantidade é obrigatória!")
    @Min(value = 1, message = "Mínimo um")
    @Column(name = "qtd_usuarios", nullable = false)
    private Integer qtdUsuarios;
    
    
}
