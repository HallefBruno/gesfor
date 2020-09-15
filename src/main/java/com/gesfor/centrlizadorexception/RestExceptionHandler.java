package com.gesfor.centrlizadorexception;

import com.gesfor.centrlizadorexception.negocioexception.licenca.LicencaIdMismatchException;
import com.gesfor.centrlizadorexception.negocioexception.licenca.LicencaNotFoundException;
import java.util.LinkedHashMap;
import java.util.Map;
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

    @ExceptionHandler({LicencaIdMismatchException.class, ConstraintViolationException.class, DataIntegrityViolationException.class})
    public ResponseEntity<Object> handleBadRequest(Exception ex, WebRequest request) {
        return handleExceptionInternal(ex, ex.getLocalizedMessage(), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
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
    
//        List<MessageErro> listaErros = new ArrayList<>();
//        ex.getBindingResult().getAllErrors().forEach((error) -> {
//            String fieldName = ((FieldError) error).getField();
//            String errorMessage = error.getDefaultMessage();
//            listaErros.add(new MessageErro(fieldName, errorMessage));
//        });
    
//    private class MessageErro {
//        
//        private String nomeAtributo;
//        private String message;
//
//        public MessageErro(String nomeAtributo, String message) {
//            this.nomeAtributo = nomeAtributo;
//            this.message = message;
//        }
//
//        public String getNomeAtributo() {
//            return nomeAtributo;
//        }
//
//        public void setNomeAtributo(String nomeAtributo) {
//            this.nomeAtributo = nomeAtributo;
//        }
//
//        public String getMessage() {
//            return message;
//        }
//
//        public void setMessage(String message) {
//            this.message = message;
//        }
//    }
}
