package com.example.finalproject.dao;


import com.example.finalproject.model.ClassMeta;

import java.util.List;

public interface FrontDAO {
    List<Object[]> selectMain();

    List<Object[]> selectFilterMain(String ctg);

    List<Object[]> selectSidoMain(String sido);

    List<Object[]> selectFilterSidoMain(String category, String sido);

    ClassMeta selectOne(int link);

    List<String> selectImgs(int link);

    int selectLink(int link);
}