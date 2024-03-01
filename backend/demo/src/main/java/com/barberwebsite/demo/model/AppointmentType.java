package com.barberwebsite.demo.model;




public enum AppointmentType {
    HAIR_CUT("Hair Cut"),
    BEARD("Beard"),
    HAIR_AND_BEARD("Hair and Beard"),
    HAIR_AND_EYEBROW("Hair and Eyebrow"),
    LITTLE_HAIRCUT("Little hair cut"),
    HAIR_AND_RELAXATION("Hair and relaxation");


    private final String description;

    AppointmentType(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }
}
