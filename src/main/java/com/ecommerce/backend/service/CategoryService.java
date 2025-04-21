package com.ecommerce.backend.service;

import com.ecommerce.backend.dtos.categoryTypeDTO.CategoryTypeDTO;
import com.ecommerce.backend.repository.CategoryTypeRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryService {
    private final CategoryTypeRepository categoryTypeRepository;
    public CategoryService (CategoryTypeRepository categoryTypeRepository) {
        this.categoryTypeRepository = categoryTypeRepository;
    }
    public List<CategoryTypeDTO> GetAllCategories () {
        return categoryTypeRepository.findAll().stream()
                .map(categories -> new CategoryTypeDTO(
                        categories.getCategoryTypeId(),
                        categories.getName()
                ))
                .collect(Collectors.toList());
    }
}
