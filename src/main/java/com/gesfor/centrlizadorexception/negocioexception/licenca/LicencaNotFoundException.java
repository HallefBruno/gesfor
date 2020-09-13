
package com.gesfor.centrlizadorexception.negocioexception.licenca;

/**
 *
 * @author halle
 */
public class LicencaNotFoundException extends RuntimeException {
    public LicencaNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
