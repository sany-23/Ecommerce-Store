// src/main/java/com/example/ppback/entity/SalesReport.java

package com.sany.ecombackend.entity;

import lombok.*;
@Getter
@Setter
@NoArgsConstructor
//@AllArgsConstructor
public class SalesReport {
    private double totalSalesAmount;
    private long totalOrders;
    private long totalOrdersLastWeek;
    private long totalOrdersToday;
    private double totalSalesToday;

    public SalesReport(double totalSalesAmount, long totalOrders, long totalOrdersLastWeek, long totalOrdersToday, double totalSalesToday) {
        this.totalSalesAmount = totalSalesAmount;
        this.totalOrders = totalOrders;
        this.totalOrdersLastWeek = totalOrdersLastWeek;
        this.totalOrdersToday = totalOrdersToday;
        this.totalSalesToday = totalSalesToday;
    }

    // Getters and Setters
}