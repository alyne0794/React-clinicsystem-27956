package com.example.clinicsystem.controller;

import java.util.*;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import com.example.clinicsystem.model.domain.Office;
import com.example.clinicsystem.service.OfficeService;

@RestController
@RequestMapping("/api/offices")
public class OfficeController {

    private final OfficeService officeService;

    public OfficeController(OfficeService officeService) {
        this.officeService = officeService;
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> create(@RequestBody Office office) {
        Office saved = officeService.create(office);
        return ResponseEntity.status(HttpStatus.CREATED).body(Map.<String, Object>of("message", "Office created successfully!", "data", saved));
    }

    @GetMapping
    public List<Office> getAll() {
        return officeService.getAll();
    }

    @GetMapping("/{id}")
    public Office getById(@PathVariable Long id) {
        return officeService.getById(id);
    }

    @GetMapping("/busiest")
    public Object getBusiestOffice() {
        return officeService.busiest();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Map<String, Object>> update(@PathVariable Long id, @RequestBody Office office) {
        officeService.update(id, office);
        return ResponseEntity.ok(Map.<String, Object>of("message", "Office updated successfully!"));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> delete(@PathVariable Long id) {
        officeService.delete(id);
        return ResponseEntity.ok(Map.of("message", "Office deleted successfully!"));
    }
}