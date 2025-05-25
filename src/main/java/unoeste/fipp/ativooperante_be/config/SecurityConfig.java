package unoeste.fipp.ativooperante_be.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import unoeste.fipp.ativooperante_be.filters.JwtRequestFilter;
import unoeste.fipp.ativooperante_be.services.OurUserDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private OurUserDetailsService ourUserDetailsService;
    @Autowired
    private JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/authenticate").permitAll()

                        // Endpoints de administrador
                        .requestMatchers("/apis/orgao/**").hasRole("ADMIN")
                        .requestMatchers("/apis/tipo/**").hasRole("ADMIN")
                        .requestMatchers("/apis/denuncia").hasRole("ADMIN")
                        .requestMatchers("/apis/denuncia/{id}").hasRole("ADMIN")
                        .requestMatchers("/apis/denuncia/add-feedback/**").hasRole("ADMIN")
                        .requestMatchers(org.springframework.http.HttpMethod.GET, "/apis/usuario/{id}").hasRole("ADMIN")
                        .requestMatchers("/apis/usuario/").hasRole("ADMIN")

                        // Endpoints públicos para cidadão (exemplo, ajuste conforme necessário)
                        // .requestMatchers("/apis/denuncia/usuario/**").permitAll()
                        // .requestMatchers(HttpMethod.POST, "/apis/denuncia").permitAll()

                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http.addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        // Use um PasswordEncoder adequado em produção (Ex: BCryptPasswordEncoder)
        return NoOpPasswordEncoder.getInstance();
    }
}