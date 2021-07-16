package com.fnkaya.bs.util;


public final class APIPath {

    private static final String BASE_PATH = "/api";

    public static final class BookPath {
        public static final String CTRL = BASE_PATH + "/book";
    }

    public static final class CategoryPath {
        public static final String CTRL = BASE_PATH + "/category";
    }
    public static final class UserPath {
        public static final String CTRL = BASE_PATH + "/user";
    }

    public static final class OrderPath {
        public static final String CTRL = BASE_PATH + "/order";
    }

}
