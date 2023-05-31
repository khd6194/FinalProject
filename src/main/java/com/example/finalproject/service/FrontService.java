package com.example.finalproject.service;

import com.example.finalproject.model.ClassMeta;

import java.util.List;

public interface FrontService {
    List<Object[]> readMain(String category, String sido);

    ClassMeta readOne(int link);

    List<String> readImg(int link);
}