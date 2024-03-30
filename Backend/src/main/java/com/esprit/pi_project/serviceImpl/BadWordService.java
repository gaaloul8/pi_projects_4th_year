package com.esprit.pi_project.serviceImpl;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class BadWordService implements Filter {

    private final List<String> badWords = Arrays.asList("bad", "inappropriate", "offensive");

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException, IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String text = request.getParameter("text");

        if (text != null && containsBadWords(text)) {
            response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
            response.getWriter().write("Error: Text contains bad words.");
            response.getWriter().flush();
        } else {
            filterChain.doFilter(servletRequest, servletResponse);
        }
    }

    public boolean containsBadWords(String text) {
        return badWords.stream().anyMatch(text::contains);
    }

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void destroy() {

    }

}
