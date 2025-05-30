//package unoeste.fipp.ativooperante_be.filters;
//
//import java.io.IOException;
//import jakarta.servlet.Filter;
//import jakarta.servlet.FilterChain;
//import jakarta.servlet.ServletException;
//import jakarta.servlet.ServletRequest;
//import jakarta.servlet.ServletResponse;
//import jakarta.servlet.http.HttpServletRequest;
//import jakarta.servlet.http.HttpServletResponse;
//import unoeste.fipp.ativooperante_be.util.JWTTokenProvider;
//
//public class AccessFilter implements Filter {
//    @Override
//    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
//            throws IOException, ServletException {
//        HttpServletRequest req = (HttpServletRequest) request;
//        String token = req.getHeader("Authorization");
//        if(token!=null && JWTTokenProvider.verifyToken(token))
//            chain.doFilter(request, response);
//        else {
//            ((HttpServletResponse) response).setStatus(500);
//            response.getOutputStream().write("Não autorizado ".getBytes());
//        }
//    }
//}
