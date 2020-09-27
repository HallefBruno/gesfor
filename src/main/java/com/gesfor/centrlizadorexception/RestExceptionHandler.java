package com.gesfor.centrlizadorexception;

import com.gesfor.service.LogsService;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.HttpMessageNotReadableException;
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
    
    @Autowired
    private LogsService logsService;
    
    @ExceptionHandler({Exception.class})
    public ResponseEntity<Object> handle(Exception ex, HttpServletRequest request, HttpServletResponse response, WebRequest webRequest) {
        String msgDev;
        String msgUser;
        if (ex instanceof NullPointerException) {
            return new ResponseEntity<>(new MessageErroDevUser(ex.getLocalizedMessage(), "Ocorreu um erro no sistema!\nEntre em contato com o adminstrador."),HttpStatus.BAD_REQUEST);
        } else if(ex instanceof ConstraintViolationException) {
            msgDev = ex.getMessage();
            msgUser = "Já exite esse registro";
            return handleExceptionInternal(ex, new MessageErroDevUser(msgDev,msgUser), new HttpHeaders(), HttpStatus.BAD_REQUEST, webRequest);
        } else if(ex instanceof DataIntegrityViolationException) {
            msgDev = ((DataIntegrityViolationException) ex).getMostSpecificCause().getMessage();
            msgUser = "Esse registro já existe";
            if(msgDev.contains("duplicate key")) {
                return handleExceptionInternal(ex, new MessageErroDevUser(msgDev, msgUser), new HttpHeaders(), HttpStatus.BAD_REQUEST, webRequest);
            }
            return handleExceptionInternal(ex, new MessageErroDevUser(ex.getLocalizedMessage(), ex.getLocalizedMessage()), new HttpHeaders(), HttpStatus.BAD_REQUEST, webRequest);
        }
        return new ResponseEntity<>(new MessageErroDevUser(ex.getLocalizedMessage(), "Ocorreu um erro no sistema!\nEntre em contato com o adminstrador."),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @Override
    protected ResponseEntity<Object> handleHttpMessageNotReadable(HttpMessageNotReadableException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {
        return handleExceptionInternal(ex, new MessageErroDevUser(ex.getLocalizedMessage(), "JSON parse error"), new HttpHeaders(), HttpStatus.BAD_REQUEST, request);
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
}
