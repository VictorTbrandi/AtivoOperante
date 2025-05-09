//package unoeste.fipp.ativooperante_be.filters;
//
//import org.springframework.boot.web.servlet.FilterRegistrationBean;
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//
//@Configuration
//public class FilterConfiguration {
//    @Bean
//    public FilterRegistrationBean<AccessFilter> registrationBean(){
//        // registrando o filtro
//        FilterRegistrationBean<AccessFilter> register = new FilterRegistrationBean<>();
//        register.setFilter(new AccessFilter());
//        // definindo as URLs para aplicar o filtro
//        register.addUrlPatterns("/apis/*");
//        return register;
//    }
//}