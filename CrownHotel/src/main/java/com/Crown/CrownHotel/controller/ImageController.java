package com.Crown.CrownHotel.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.Crown.CrownHotel.service.CloudinaryService;

import java.io.IOException;
import java.util.Map;

@RestController
@RequestMapping("/api/images")
public class ImageController {

    @Autowired
    private CloudinaryService cloudinaryService;

    @PostMapping("/upload")
    public ResponseEntity<Map<String, Object>> upload(@RequestParam("file") MultipartFile file) throws IOException {
        Map<String, Object> result = cloudinaryService.uploadFile(file);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Map<String, Object>> delete(@RequestParam("public_id") String publicId) throws IOException {
        Map<String, Object> result = cloudinaryService.deleteFile(publicId);
        return ResponseEntity.ok(result);
    }
}

