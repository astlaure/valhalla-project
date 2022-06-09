package org.astlaure.valhalla.app;

import org.springframework.boot.autoconfigure.web.servlet.error.ErrorViewResolver;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.util.Map;

@Configuration
public class AppConfig implements ErrorViewResolver {

    @Override
    public ModelAndView resolveErrorView(HttpServletRequest request, HttpStatus status, Map<String, Object> model) {
        if (HttpStatus.NOT_FOUND.equals(status)
                && model.get("path") instanceof String
                && !((String) model.get("path")).startsWith("/api")) {
            return new ModelAndView("index.html", HttpStatus.OK);
        }
        return null;
    }
}
