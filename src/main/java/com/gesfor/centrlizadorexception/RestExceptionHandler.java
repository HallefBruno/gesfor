package com.gesfor.centrlizadorexception;

import com.gesfor.centrlizadorexception.negocioexception.licenca.LicencaIdMismatchException;
import com.gesfor.centrlizadorexception.negocioexception.licenca.LicencaNotFoundException;
import java.sql.SQLException;
import java.util.LinkedHashMap;
import java.util.Map;
import org.hibernate.NonUniqueObjectException;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 *
 * @author halle
 */
@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({LicencaNotFoundException.class})
    protected ResponseEntity<Object> handleNotFound(Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, "Licenca não encontrada", new HttpHeaders(), HttpStatus.NOT_FOUND, request);
    }

    @ExceptionHandler({ConstraintViolationException.class})
    public ResponseEntity<Object> handleConstraintBadRequest(Exception ex, WebRequest request) {
        String msgDev = ex.getMessage();
        String msgUser = "Já exite esse registro";
        MessageErroDevUser devUser = new MessageErroDevUser(msgDev,msgUser);
        return handleExceptionInternal(ex, devUser, new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }
    
    @ExceptionHandler({DataIntegrityViolationException.class})
    public ResponseEntity<Object> handleDataIntegrityBadRequest(Exception ex, WebRequest request) {
        String messageUser="";
        String messageDev="";
        if(ex instanceof DataIntegrityViolationException) {
            messageDev = ((DataIntegrityViolationException) ex).getMostSpecificCause().getMessage();
            if(messageDev.contains(MESSAGE_ERROR_USER.CHAVE.value)) {
                messageUser = RETORNO_MESSAGE_USER.CHAVE.value;
            }
        }
        return handleExceptionInternal(ex, new MessageErroDevUser(messageDev, messageUser), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex,HttpHeaders headers, HttpStatus status, WebRequest request) {        
        Map<String, String> errors = new LinkedHashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        return handleExceptionInternal(ex, errors, new HttpHeaders(), status, request);
    }

    private class MessageErroDevUser {
        
        private String messageDev;
        private String messageUser;

        public MessageErroDevUser(String messageDev, String messageUser) {
            this.messageDev = messageDev;
            this.messageUser = messageUser;
        }
   
        public String getMessageDev() {
            return messageDev;
        }

        public void setMessageDev(String messageDev) {
            this.messageDev = messageDev;
        }

        public String getMessageUser() {
            return messageUser;
        }

        public void setMessageUser(String messageUser) {
            this.messageUser = messageUser;
        }
    }
    
    public enum MESSAGE_ERROR_USER {
        
        CHAVE("duplicar valor da chave viola a restrição de unicidade");
        private String value;
        
        private MESSAGE_ERROR_USER(String value) {
            this.value = value;
        }
    }
    
    public enum RETORNO_MESSAGE_USER {
        CHAVE("Esse registro já exite!");
        private String value;
        private RETORNO_MESSAGE_USER(String value) {
            this.value = value;
        }
    }
}
