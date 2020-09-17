
package com.gesfor.model;

import java.io.Serializable;
import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author hallef.bruno
 */
@Entity
@Data
@NoArgsConstructor
public class Logs implements Serializable {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "log_erro")
    private String logErro;
    
    @Column(name = "data_ocorrencia")
    @Temporal(TemporalType.TIMESTAMP)
    private Date dataOcorrencia;
    
    @Column
    private String origem;
    
    @Column
    private String metodo;

    public Logs(String logErro, Date dataOcorrencia, String origem, String metodo) {
        this.logErro = logErro;
        this.dataOcorrencia = dataOcorrencia;
        this.origem = origem;
        this.metodo = metodo;
    }

}
