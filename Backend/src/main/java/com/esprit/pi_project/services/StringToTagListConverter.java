package com.esprit.pi_project.services;

import com.esprit.pi_project.entities.Tag;
import org.springframework.core.convert.converter.Converter;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class StringToTagListConverter implements Converter<String, List<Tag>> {


    @Override
    public List<Tag> convert(String source) {
        if (source == null || source.isEmpty()) {
            return new ArrayList<>();
        }

        // Split the input string into individual tag names
        String[] tagNames = source.split(",");
        return Arrays.stream(tagNames)
                .map(String::trim) // Trim each tag name to remove leading/trailing spaces
                .map(tagName -> {
                    for (Tag tag : Tag.values()) {
                        if (tag.name().equalsIgnoreCase(tagName)) {
                            return tag;
                        }
                    }
                    // If no matching enum constant is found, return null or handle it as needed
                    return null;
                })
                .filter(tag -> tag != null) // Filter out null values (tags that didn't match any enum constant)
                .collect(Collectors.toList());
    }
}
